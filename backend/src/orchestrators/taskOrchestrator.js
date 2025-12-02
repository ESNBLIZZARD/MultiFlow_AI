import { createStep, updateStep, updateTaskStatus } from "../db.js";
import { generateText } from "../geminiClient.js";
import { assistantTemplates } from "../templates/assistantTemplate.js";

export async function runTask(task) {
  try {
    // 1. Mark task as running
    await updateTaskStatus(task.id, "running");

    // 2. Get steps for the template
    const steps = assistantTemplates[task.template] || [
      {
        name: "draft",
        type: "llm",
        model: "gemini-2.5-flash",
        preparePrompt: (input) => `Draft response: ${input}`,
      },
    ];

    const context = {};
    let finalOutput = "";
    let finalReasoning = "";

    // 3. Run each step sequentially
    for (let index = 0; index < steps.length; index++) {
      const step = steps[index];

      // Create step record (running)
      const stepRecord = await createStep({
        taskId: task.id,
        name: step.name,
        status: "running",
        stepIndex: index,
      });

      // Build prompt
      const prompt = step.preparePrompt(task.inputText, context);

      // LLM call (Gemini)
      const { text, reasoning } = await generateText({
        model: step.model,
        prompt,
      });

      const output = text || "";
      const think = reasoning || "";

      // Save to context for later steps
      context[step.name] = output;

      // Update step as completed
      await updateStep(stepRecord.id, {
        status: "completed",
        prompt,
        output,
        reasoning: think,
        finishedAt: new Date(),
      });

      // Append to final output
      finalOutput += `\n\n### ${step.name}\n${output}`;
      if (think) {
        finalReasoning += `\n\n---\n## Thinking for ${step.name}\n${think}`;
      }
    }

    // 4. Mark task completed
    await updateTaskStatus(task.id, "completed", {
      result: finalOutput.trim(),
      reasoning: finalReasoning.trim(),
    });

  } catch (error) {
    console.error("Task Orchestration Failed:", error);

    // 5. Mark failure
    await updateTaskStatus(task.id, "failed");
  }
}
