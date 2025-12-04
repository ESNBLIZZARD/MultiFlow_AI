import { createStep, updateStep, updateTaskStatus } from "../db.js";
import { generateText } from "../geminiClient.js";
import { assistantTemplates } from "../templates/assistantTemplate.js";

export async function runTask(task) {
  try {
    // Mark task as running
    await updateTaskStatus(task.id, "running");

    // DeepThink toggle
    const thinkingEnabled = task.thinkingEnabled === true;

    const steps =
      assistantTemplates[task.template] || assistantTemplates.default || [];

    const context = {};
    let concatenatedOutputs = "";

    for (let index = 0; index < steps.length; index++) {
      const step = steps[index];

      const stepRecord = await createStep({
        taskId: task.id,
        name: step.name,
        status: "running",
        stepIndex: index,
        startedAt: new Date(),
      });

      const prompt = step.preparePrompt(task.inputText, context);

      const { text } = await generateText({
        model: step.model,
        prompt,
        maxOutputTokens: step.maxOutputTokens ?? 800,
        thinkingEnabled,
      });

      const cleanText = (text ?? "No output received").trim();
      context[step.name] = cleanText;

      // Save step result
      await updateStep(stepRecord.id, {
        status: "completed",
        prompt,
        output: { text: cleanText },
        finishedAt: new Date(),
      });

      concatenatedOutputs += `\n\n### ${step.name}\n${cleanText}`;
    }

    const synthesisPrompt = `
You are an expert assistant. Using the user's input and previous step outputs below,
produce a concise, readable final answer. Always include a clear "**Conclusion:**"
section.

User input:
${task.inputText}

Previous step outputs:
${concatenatedOutputs}

Return a polished, human-readable answer starting with:
"Final Answer:"
`;

    const finalStepRecord = await createStep({
      taskId: task.id,
      name: "final_result",
      status: "running",
      stepIndex: steps.length,
      startedAt: new Date(),
    });

    const { text: finalText } = await generateText({
      model: "gemini-2.5-flash",
      prompt: synthesisPrompt,
      maxOutputTokens: 1000,
      thinkingEnabled,
    });

    await updateStep(finalStepRecord.id, {
      status: "completed",
      prompt: synthesisPrompt,
      output: {
        text: finalText?.trim() || "No output generated.",
      },
      finishedAt: new Date(),
    });

    await updateTaskStatus(task.id, "completed");
  } catch (err) {
    console.error("Task orchestration failed:", err);
    await updateTaskStatus(task.id, "failed");
  }
}
