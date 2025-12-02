export const assistantTemplates = {

    "research_assistant": [
    {
      name: "intent_classification",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `You are a research assistant. Classify the user's request and produce a short research plan in JSON. Request: ${input}\nReturn JSON with keys: {"category","topics","plan"}`,
    },
    {
      name: "summarize_findings",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input, context) =>
        `You are summarizing research findings. Use the plan and user input to produce a concise executive summary and bullets. Input: ${input} PlanContext:${JSON.stringify(
          context
        )}`,
    },
  ],

  "travel_planner": [
    {
      name: "classify_travel_needs",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Classify travel preferences and budget for: ${input}`,
    },
    {
      name: "generate_itinerary",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Create a 3-day itinerary for: ${input}`,
    },
    {
      name: "packing_list",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Generate a packing checklist for: ${input}`,
    },
  ],

  "resume_enhancer": [
    {
      name: "extract_experience",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Extract key experiences and achievements from: ${input}`,
    },
    {
      name: "enhance_resume",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Rewrite the following content as a polished resume bullet list: ${input}`,
    },
  ],

  "coding_consultant": [
    {
      name: "code_review",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Review the following code, explain issues, and suggest improvements: ${input}`,
    },
  ],

  "recipe_grocery": [
    {
      name: "generate_recipe",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Generate a recipe based on ingredients/preferences: ${input}`,
    },
    {
      name: "generate_grocery_list",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Generate a grocery list based on the recipe: ${input}`,
    },
  ],

  "fitness_planner": [
    {
      name: "generate_plan",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Create a personalized fitness plan based on: ${input}`,
    },
  ],

  "book_summary": [
    {
      name: "summarize_book",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Summarize the book and produce actionable steps: ${input}`,
    },
  ],
};
