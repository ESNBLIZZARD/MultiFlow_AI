import { createTask } from "../db.js";
import { runTask } from "../orchestrators/taskOrchestrator.js";
import { getTaskWithSteps } from "../db.js";

export async function createTaskController(req, res) {
  try {
    const { template, inputText, thinkingEnabled = false } = req.body;

    if (!template || typeof inputText !== "string") {
      return res.status(400).json({ error: "template and inputText are required" });
    }

    // Save task INCLUDING thinkingEnabled
    const task = await createTask({
      template,
      inputText,
      thinkingEnabled,
    });

    // Run orchestration in the background
    runTask(task);

    return res.json({ taskId: task.id, id: task.id });
  } catch (err) {
    console.error("Create Task Error:", err);
    return res.status(500).json({ error: "Failed to create task" });
  }
}



export async function getTaskController(req, res) {
  try {
    const task = await getTaskWithSteps(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    return res.json(task);
  } catch (err) {
    console.error("Get Task Error:", err);
    return res.status(500).json({ error: "Failed to fetch task" });
  }
}
