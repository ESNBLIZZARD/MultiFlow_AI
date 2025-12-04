import { useState, useEffect, useRef } from "react";
import TemplateSelect from "./components/TemplateSelect";
import ThinkingToggle from "./components/ThinkingToggle";
import TaskInput from "./components/TaskInput";
import StepsTimeline from "./components/StepsTimeline";
import ResponseBox from "./components/ResponseBox";

const API_BASE = "http://localhost:4000/api/tasks";

export default function App() {
  const [template, setTemplate] = useState("research_assistant");
  const [inputText, setInputText] = useState("");
  const [thinking, setThinking] = useState(false);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const pollRef = useRef(null);

  function startPolling(id) {
  if (!id) {
    console.warn("startPolling called with falsy id:", id);
    return;
  }

  if (pollRef.current) clearInterval(pollRef.current);
  pollRef.current = setInterval(async () => {
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      // log status so you don't get {} in console
      const data = await res.json();
      console.log("POLL RESPONSE:", data);
      setTask(data);

      if (data?.status === "completed" || data?.status === "failed") {
        clearInterval(pollRef.current);
        pollRef.current = null;
        setLoading(false);
      }
    } catch (err) {
      console.error("Polling error:", err);
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
      body: JSON.stringify({ template, inputText, thinkingEnabled: thinking, }),
    });

    const created = await res.json();
    console.log("CREATE RESPONSE:", created);

    // accept several payload shapes
    const id =
      created?.id ||
      created?.taskId ||
      created?.task?.id ||
      created?.data?.id ||
      null;

    if (!id) {
      console.error("Task creation response missing id:", created);
      alert("Server did not return a task id. See console for details.");
      setLoading(false);
      return;
    }

    // set a minimal skeleton so UI shows something immediately
    setTask({ id, status: "pending", steps: [] });

    startPolling(id);
  } catch (err) {
    console.error(err);
    alert("Error creating task: " + err.message);
    setLoading(false);
  }
}


  useEffect(() => () => pollRef.current && clearInterval(pollRef.current), []);

 return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 text-white px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Multiflow AI
            </h1>
            <p className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base">
              Multi-step Intelligent Task Processing Engine
            </p>
          </div>
        </div>

        <div className="
          bg-linear-to-br from-slate-900/80 to-indigo-950/50 
          border border-indigo-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl 
          p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10 transition-all 
        ">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TemplateSelect value={template} onChange={setTemplate} />
            </div>

            <div className="flex items-center justify-start lg:justify-center">
              <ThinkingToggle enabled={thinking} onChange={setThinking} />
            </div>
          </div>

          <div className="
            bg-linear-to-br from-slate-900/60 to-indigo-900/30 
            border border-indigo-400/20 
            p-5 sm:p-7 rounded-xl sm:rounded-2xl shadow-lg
          ">
            <TaskInput
              value={inputText}
              onChange={setInputText}
              onSubmit={handleStartTask}
              loading={loading}
            />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 text-white">
              <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-linear-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50 rounded-full animate-pulse shrink-0"></span>
              Progress Timeline
            </h2>

            <div className="
              bg-linear-to-br from-slate-900/60 to-indigo-900/30 
              border border-indigo-400/20 rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl
            ">
              <StepsTimeline steps={task?.steps} />
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 text-white">
              <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-linear-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/50 rounded-full shrink-0"></span>
              Final Output
            </h2>

            <div className="
              bg-linear-to-br from-slate-900/60 to-indigo-900/30 
              border border-indigo-400/20 rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl
            ">
              <ResponseBox task={task} thinkingEnabled={thinking} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
