import prisma from "../src/prisma.js"; // adjust path if your prisma client is elsewhere

export async function createTask({ template, inputText }) {
  return prisma.task.create({ data: { template, inputText } });
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
  return prisma.task.update({ where: { id }, data: { status } });
}

export async function createStep(step) {
  // step object should match Prisma Step model JSON column names
  return prisma.step.create({ data: step });
}

export async function updateStep(id, data) {
  return prisma.step.update({ where: { id }, data });
}
