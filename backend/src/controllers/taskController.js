import { createTask } from "../db.js";
import { runTask } from "../orchestrators/taskOrchestrator.js";

export async function createTaskController(req, res) {
  try {
    const { template, inputText } = req.body;

    if (!template || typeof inputText !== "string") {
      return res.status(400).json({ error: "template and inputText are required" });
    }

    const task = await createTask({ template, inputText });

    // run in background
    runTask(task);

    // return a compact shape the frontend expects
    return res.json({ taskId: task.id, id: task.id });
  } catch (err) {
    console.error("Create Task Error:", err);
    return res.status(500).json({ error: "Failed to create task" });
  }
}

import { getTaskWithSteps } from "../db.js";
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
