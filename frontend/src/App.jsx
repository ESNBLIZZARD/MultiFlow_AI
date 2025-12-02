import { useState, useEffect, useRef } from "react";
import TemplateSelect from "./components/TemplateSelect";
import ThinkingToggle from "./components/ThinkingToggle";
import TaskInput from "./components/TaskInput";
import StepsTimeline from "./components/StepsTimeline";
import ResponseBox from "./components/ResponseBox";

const API_BASE = "http://localhost:4000/api/tasks";

export default function App() {
  const [template, setTemplate] = useState(() => localStorage.getItem("template") || "research_assistant");
  const [inputText, setInputText] = useState("");
  const [thinking, setThinking] = useState(() => JSON.parse(localStorage.getItem("deepThink")) ?? false);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const pollRef = useRef(null);

  useEffect(() => localStorage.setItem("deepThink", JSON.stringify(thinking)), [thinking]);
  useEffect(() => localStorage.setItem("template", template), [template]);

  function startPolling(id) {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        const data = await res.json();
        console.log(data, "Dataaaaaaaa");
        setTask(data);

        if (data.status === "completed" || data.status === "failed") {
          clearInterval(pollRef.current);
          pollRef.current = null;
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  }

  async function handleStartTask() {
    if (!inputText.trim()) return alert("Please enter a query.");
    setLoading(true);
    setTask(null);

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template, inputText }),
      });

      const created = await res.json();
      setTask(created);
      startPolling(created.id);
    } catch (err) {
      console.error(err);
      alert("Error creating task: " + err.message);
      setLoading(false);
    }
  }

  useEffect(() => () => pollRef.current && clearInterval(pollRef.current), []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0f10] via-[#1b1b1e] to-[#111113] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Multiflow AI</h1>
            <p className="text-neutral-400 mt-1 text-sm">
              Multi-step Intelligent Task Processing Engine
            </p>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="
          bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl 
          p-10 space-y-10 transition-all 
        ">

          {/* SELECT + TOGGLE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TemplateSelect value={template} onChange={setTemplate} />
            </div>

            <div className="flex items-center justify-end md:justify-center">
              <ThinkingToggle enabled={thinking} onChange={setThinking} />
            </div>
          </div>

          {/* QUERY INPUT */}
          <div className="
            bg-white/5 border border-white/10 
            p-7 rounded-2xl shadow-inner
          ">
            <TaskInput
              value={inputText}
              onChange={setInputText}
              onSubmit={handleStartTask}
              loading={loading}
            />
          </div>

          {/* TIMELINE */}
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-neutral-300">
              <span className="h-3 w-3 bg-indigo-500 shadow-md rounded-full"></span>
              Progress Timeline
            </h2>

            <div className="
              bg-white/5 border border-white/10 rounded-2xl p-7 shadow-xl
            ">
              <StepsTimeline steps={task?.steps} />
            </div>
          </div>

          {/* FINAL OUTPUT */}
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-neutral-300">
              <span className="h-3 w-3 bg-green-500 shadow-md rounded-full"></span>
              Final Output
            </h2>

            <div className="
              bg-white/5 border border-white/10 rounded-2xl p-7 shadow-xl
            ">
              <ResponseBox task={task} thinkingEnabled={thinking} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
