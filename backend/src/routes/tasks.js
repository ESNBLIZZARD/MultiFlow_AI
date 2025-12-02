import express from "express";
import {
  createTaskController,
  getTaskController,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTaskController);
router.get("/:id", getTaskController);

export default router;
