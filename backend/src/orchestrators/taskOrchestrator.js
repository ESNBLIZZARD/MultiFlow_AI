import { createStep, updateStep, updateTaskStatus } from "../db.js";
import { generateText } from "../geminiClient.js";
import { assistantTemplates } from "../templates/assistantTemplate.js";

export async function runTask(task) {
  try {
    // mark task running
    await updateTaskStatus(task.id, "running");

    const steps = assistantTemplates[task.template] || assistantTemplates.default || [
      {
        name: "draft",
        type: "llm",
        model: "gemini-2.5-flash",
        preparePrompt: (input) => `Draft response: ${input}`,
      },
    ];

    const context = {};
    let concatenatedOutputs = "";
    let concatenatedReasoning = "";

    for (let index = 0; index < steps.length; index++) {
      const step = steps[index];

      // create a step record (running)
      const stepRecord = await createStep({
        taskId: task.id,
        name: step.name,
        status: "running",
        stepIndex: index,
        startedAt: new Date(),
      });

      // prepare prompt
      const prompt = step.preparePrompt(task.inputText, context);

      // call LLM
      const { text, reasoning } = await generateText({
        model: step.model,
        prompt,
        maxOutputTokens: step.maxOutputTokens ?? 800,
      });

      const outputText = (text ?? "").trim();

      // save output to context (string)
      context[step.name] = outputText;

      // update step (Step.output is a Json column)
      await updateStep(stepRecord.id, {
        status: "completed",
        prompt,
        output: { text: outputText, reasoning: reasoning ?? undefined },
        finishedAt: new Date(),
      });

      // accumulate for final synthesis
      concatenatedOutputs += `\n\n### ${step.name}\n${outputText}`;
      if (reasoning) concatenatedReasoning += `\n\n### Thinking for ${step.name}\n${reasoning}`;
    }

    // FINAL SYNTHESIS: ask LLM to produce a clean final answer & a conclusion
    const synthesisPrompt = `
You are an expert assistant. Using the user's input and the previous step outputs below,
produce a concise, readable final answer. Ensure you include a clear "**Conclusion:**"
section (at least 40 words) that directly answers the user's question.

User input:
${JSON.stringify(task.inputText)}

Previous step outputs:
${concatenatedOutputs}

If there is internal "reasoning" content, you may ignore it for the public answer.
Respond with a human-readable final answer. Start the answer with "Final Answer:" and include a "**Conclusion:**" block at the end.
`;

    // create a running final_result step
    let finalStepRecord;
    try {
      finalStepRecord = await createStep({
        taskId: task.id,
        name: "final_result",
        status: "running",
        stepIndex: steps.length,
        startedAt: new Date(),
      });
    } catch (err) {
      console.error("Failed to create final_result step:", err);
      // continue but keep finalStepRecord undefined; we'll try an update fallback
    }

    // call LLM for synthesis
    const { text: synthesisText, reasoning: synthesisReasoning } = await generateText({
      model: "gemini-2.5-flash",
      prompt: synthesisPrompt,
      maxOutputTokens: 900,
    });

    const finalText = (synthesisText ?? "").trim() || (concatenatedOutputs.trim() || "No output generated.");

    // update or create final_result step with the real output
    if (finalStepRecord?.id) {
      await updateStep(finalStepRecord.id, {
        status: "completed",
        prompt: synthesisPrompt,
        output: { text: finalText, reasoning: synthesisReasoning ?? undefined },
        finishedAt: new Date(),
      });
    } else {
      // fallback: create final_result if earlier createStep failed
      try {
        await createStep({
          taskId: task.id,
          name: "final_result",
          status: "completed",
          stepIndex: steps.length,
          prompt: synthesisPrompt,
          output: { text: finalText, reasoning: synthesisReasoning ?? undefined },
          startedAt: null,
          finishedAt: new Date(),
        });
      } catch (err) {
        console.error("Fallback create final_result failed:", err);
      }
    }

    // Finally mark the task completed (Task has no result/reasoning fields)
    await updateTaskStatus(task.id, "completed");
  } catch (err) {
    console.error("Task orchestration failed:", err);
    try {
      await updateTaskStatus(task.id, "failed");
    } catch (uErr) {
      console.error("Failed to mark task failed:", uErr);
    }
  }
}
