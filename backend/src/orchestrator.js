import { createStep, updateStep, updateTaskStatus, getTaskWithSteps } from './db.js';
import { generateText } from './geminiClient.js';
/**
* Map templates to a simple array of step definitions. Each step can be:
* - type: 'llm' (call Gemini)
* - type: 'local' (run JS function)
*
* preparePrompt(taskInput, context) => string
*/
function getTemplateSteps(template, inputText) {
switch (template) {
case 'research':
return [
{
name: 'intent_classification',
type: 'llm',
model: 'gemini-2.5-flash',
preparePrompt: (taskInput) => `You are a research assistant. Classify the following user's request and produce a short research plan as JSON. Request: ${taskInput}\n\nReturn JSON with keys: {"category","topics","plan"}`
},
{
name: 'summarize_findings',
type: 'llm',
model: 'gemini-2.5-flash',
preparePrompt: (taskInput, context) => `You are summarizing research findings. Use the plan and user input to produce a concise executive summary and bullets. Input: ${taskInput} PlanContext:${JSON.stringify(context)}`
}
];


case 'travel':
return [
{ name: 'classify_travel_needs', type: 'llm', model: 'gemini-2.5-flash', preparePrompt: (inp) => `Classify travel preferences and budget for: ${inp}` },
{ name: 'generate_itinerary', type: 'llm', model: 'gemini-2.5-flash', preparePrompt: (inp) => `Create a 3-day itinerary for: ${inp}` },
{ name: 'packing_list', type: 'llm', model: 'gemini-2.5-flash', preparePrompt: (inp) => `Generate a packing checklist for: ${inp}` }
];


case 'resume':
return [
{ name: 'extract_experience', type: 'llm', model: 'gemini-2.5-flash', preparePrompt: (inp) => `Extract key experiences and achievements from: ${inp}` },
{ name: 'enhance_resume', type: 'llm', model: 'gemini-2.5-flash', preparePrompt: (inp) => `Rewrite the following content as a polished resume bullet list: ${inp}` }
];


default:
return [
{ name: 'draft', type: 'llm', model: 'gemini-2.5-flash', preparePrompt: (inp) => `Draft response: ${inp}` }
];
}
}


// export async function runTask(task) {
//   try {
//     await updateTaskStatus(task.id, "running");

//     const steps = getTemplateSteps(task.template, task.inputText);

//     const context = {};
//     let combinedOutput = "";
//     let reasoningOutput = "";

//     for (const step of steps) {
//       const stepRecord = await createStep(task.id, step.name, "running");

//       // Prepare prompt
//       const prompt = step.preparePrompt(task.inputText, context);

//       // Run LLM
//       const llmResponse = await generateText({
//         model: step.model,
//         prompt,
//       });

//       const output = llmResponse.text || llmResponse.output || "";

//       // Save step
//       await updateStep(stepRecord.id, "completed", output);

//       // Add to context
//       context[step.name] = output;

//       // Build combined final response
//       combinedOutput += `\n\n### ${step.name}\n${output}`;

//       // Include deep reasoning if available
//       if (llmResponse.reasoning) {
//         reasoningOutput += `\n\n---\n## Thinking for ${step.name}\n${llmResponse.reasoning}`;
//       }
//     }

//     // Update final task state
//     await updateTaskStatus(task.id, "completed", {
//       result: combinedOutput.trim(),
//       reasoning: reasoningOutput.trim(),
//     });

//     return true;
//   } catch (error) {
//     console.error("Task failed:", error);

//     await updateTaskStatus(task.id, "failed", {
//       result: null,
//       reasoning: null,
//     });

//     return false;
//   }
// }
