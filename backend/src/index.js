import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tasksRouter from "./routes/tasks.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.get("/", (_, res) => res.send({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
