import prisma from "../src/prisma.js";

// Create a new task with thinkingEnabled properly passed
export async function createTask({ template, inputText, thinkingEnabled = false }) {
  return prisma.task.create({
    data: {
      template,
      inputText,
      thinkingEnabled, 
    },
  });
}

export async function getTask(id) {
  return prisma.task.findUnique({ where: { id } });
}

export async function getTaskWithSteps(id) {
  return prisma.task.findUnique({
    where: { id },
    include: { steps: { orderBy: { stepIndex: "asc" } } },
  });
}

export async function updateTaskStatus(id, status) {
  return prisma.task.update({
    where: { id },
    data: { status },
  });
}

export async function createStep(step) {
  return prisma.step.create({ data: step });
}

export async function updateStep(id, data) {
  return prisma.step.update({
    where: { id },
    data,
  });
}
