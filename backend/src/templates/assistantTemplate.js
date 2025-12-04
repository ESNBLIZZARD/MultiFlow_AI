export const assistantTemplates = {
  research_assistant: [
    {
      name: "intent_classification",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `You are a research assistant. Classify the user's request and produce a short research plan in clean JSON.

Request: ${input}

Return JSON with keys:
{
  "category": "...",
  "topics": ["..."],
  "plan": ["..."]
}`,
    },

    {
      name: "summarize_findings",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input, context) =>
        `You are summarizing research findings.

User Input:
${input}

Plan Context:
${context.intent_classification}

Write a concise executive summary in clean paragraphs.`,
    },
  ],

  travel_planner: [
    {
      name: "classify_travel_needs",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Extract structured travel details from this request:

"${input}"

Return the following clearly in bullet points:
- origin
- destination
- number of days
- priority places
- travel style
- any budget preferences
- special notes`,
    },

    {
      name: "generate_itinerary",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input, context) =>
        `Using the classified travel details below, generate a detailed itinerary.

Classified Data:
${context.classify_travel_needs}

User Request:
${input}

Rules:
- Match EXACT number of days mentioned by user.
- Include timings (morning / afternoon / evening).
- Include travel time between places.
- Include food suggestions.
- Prioritize the user's priority locations.
- Keep the itinerary actionable and realistic.`,
    },

    {
      name: "packing_list",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input, context) =>
        `Create a packing checklist based on the itinerary:

Itinerary:
${context.generate_itinerary}

User Request:
${input}

Provide lists:
- Clothing
- Footwear
- Essentials
- Weather-related items
- Miscellaneous items
Keep it compact and practical.`,
    },
  ],

  resume_enhancer: [
    {
      name: "extract_experience",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Extract key achievements, responsibilities, and technical skills from:

${input}

Return a clean structured breakdown.`,
    },

    {
      name: "enhance_resume",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input, context) =>
        `Rewrite the following extracted experience into polished resume bullet points:

Extracted:
${context.extract_experience}

User Text:
${input}

Make them sharp, impactful, and action-driven.`,
    },
  ],

  coding_consultant: [
    {
      name: "code_review",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Perform a full code review on:

${input}

Return:
- Issues
- Improvements
- Best practices
- Optimized alternative solution`,
    },
  ],

  recipe_grocery: [
    {
      name: "generate_recipe",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Create a full recipe using these ingredients/preferences:

${input}

Include:
- Ingredients list
- Steps
- Cooking tips`,
    },

    {
      name: "generate_grocery_list",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input, context) =>
        `Create a grocery list based on this recipe:

${context.generate_recipe}

User Input:
${input}

Categorize items:
- Vegetables
- Spices
- Staples
- Optional`,
    },
  ],

  fitness_planner: [
    {
      name: "generate_plan",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Create a structured weekly fitness plan based on:

${input}

Return:
- Warmup
- Workout routine
- Progression rules
- Diet suggestions`,
    },
  ],

  book_summary: [
    {
      name: "summarize_book",
      type: "llm",
      model: "gemini-2.5-flash",
      preparePrompt: (input) =>
        `Summarize this book in simple language and provide actionable insights:

${input}

Include:
- Summary
- Key lessons
- Actionable steps`,
    },
  ],
};
