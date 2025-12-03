export const assistantTemplates = {
  research_assistant: [
    {
      name: "intent_classification",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `You are a research assistant. Classify the user's request and produce a short research plan in JSON.\nRequest: ${input}\nReturn JSON with keys: {"category","topics","plan"}`,
    },
    {
      name: "summarize_findings",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input, context) =>
        `You are summarizing research findings.\nUse the plan and user input to produce a concise executive summary.\nUser Input: ${input}\nPlan Context: ${JSON.stringify(
          context
        )}`,
    },
  ],

  travel_planner: [
    {
      name: "classify_travel_needs",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Classify the user's travel preferences, budget, and trip style for: ${input}`,
    },
    {
      name: "generate_itinerary",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Create a detailed 3-day itinerary for the following travel request: ${input}`,
    },
    {
      name: "packing_list",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Generate a packing checklist based on the travel plan: ${input}`,
    },
  ],

  resume_enhancer: [
    {
      name: "extract_experience",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Extract key experiences, achievements, and strengths from the following text:\n${input}`,
    },
    {
      name: "enhance_resume",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Rewrite the following experience into polished, impact-driven resume bullet points:\n${input}`,
    },
  ],

  coding_consultant: [
    {
      name: "code_review",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Perform a detailed code review. Identify issues, optimization opportunities, and best-practice improvements.\nCode:\n${input}`,
    },
  ],

  recipe_grocery: [
    {
      name: "generate_recipe",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Generate a recipe using the following ingredients or preferences:\n${input}`,
    },
    {
      name: "generate_grocery_list",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Based on the generated recipe, produce a grocery list for:\n${input}`,
    },
  ],

  fitness_planner: [
    {
      name: "generate_plan",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Create a personalized and structured fitness plan based on:\n${input}`,
    },
  ],

  book_summary: [
    {
      name: "summarize_book",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Provide a concise summary of this book and outline actionable steps:\n${input}`,
    },
  ],
};
