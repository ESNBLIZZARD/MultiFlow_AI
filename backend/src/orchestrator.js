export function getTemplateSteps(template, inputText) {
  switch (template) {

    case "research":
      return [
        {
          name: "intent_classification",
          type: "llm",
          model: "gemini-2.5-flash",
          preparePrompt: (taskInput) =>
            `You are a research assistant. Classify the user's request and produce a short research plan as JSON.\nRequest: ${taskInput}\nReturn JSON with keys: {"category","topics","plan"}`
        },
        {
          name: "summarize_findings",
          type: "llm",
          model: "gemini-2.5-flash",
          preparePrompt: (taskInput, context) =>
            `You are summarizing research findings.\nUse the plan and user input to create a concise executive summary.\nInput: ${taskInput}\nPlanContext: ${JSON.stringify(context)}`
        }
      ];

    case "travel":
      return [
        {
          name: "classify_travel_needs",
          type: "llm",
          model: "gemini-2.5-flash",
          preparePrompt: (inp) => `Classify travel preferences and budget for: ${inp}`
        },
        {
          name: "generate_itinerary",
          type: "llm",
          model: "gemini-2.5-flash",
          preparePrompt: (inp) => `Create a 3-day itinerary for: ${inp}`
        },
        {
          name: "packing_list",
          type: "llm",
          model: "gemini-2.5-flash",
          preparePrompt: (inp) => `Generate a packing checklist for: ${inp}`
        }
      ];

    case "resume":
      return [
        {
          name: "extract_experience",
          type: "llm",
          model: "gemini-2.5-flash",
          preparePrompt: (inp) => `Extract key experiences and achievements from: ${inp}`
        },
        {
          name: "enhance_resume",
          type: "llm",
          model: "gemini-2.5-flash",
          preparePrompt: (inp) => `Rewrite the content as polished resume bullet points:\n${inp}`
        }
      ];

    default:
      return [
        {
          name: "draft",
          type: "llm",
          model: "gemini-2.5-flash",
          preparePrompt: (inp) => `Draft response: ${inp}`
        }
      ];
  }
}
