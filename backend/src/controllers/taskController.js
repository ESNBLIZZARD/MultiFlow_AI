import { createTask, getTaskWithSteps } from "../db.js";
import { runTask } from "../orchestrators/taskOrchestrator.js";
import { assistantTemplates } from "../templates/assistantTemplate.js";

export async function createTaskController(req, res) {
  try {
    const { template, inputText } = req.body;

    // Validate template against enum
    if (!assistantTemplates[template]) {
      return res
        .status(400)
        .json({ error: `Invalid template. Choose one of: ${Object.keys(assistantTemplates).join(", ")}` });
    }

    const task = await createTask({ template, inputText });

    // Run task asynchronously
    runTask(task);

    res.json(task);
  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
}

export async function getTaskController(req, res) {
  try {
    const task = await getTaskWithSteps(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
}
