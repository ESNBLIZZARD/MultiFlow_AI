export default function ResponseBox({ task, thinkingEnabled }) {
  if (!task)
    return (
      <p className="text-gray-400 text-sm italic">
        No output yet...
      </p>
    );

  const finalStep = task.steps?.[task.steps.length - 1];
  const finalOutput = finalStep?.output;

  return (
    <div className="space-y-8">

      {/* STATUS BADGE */}
      <span
        className={`
          px-4 py-1.5 text-xs font-semibold rounded-full tracking-wide
          shadow-md border
          ${
            task.status === "completed"
              ? "bg-emerald-900/20 text-emerald-400 border-emerald-500/30"
              : task.status === "failed"
              ? "bg-red-900/20 text-red-400 border-red-500/30"
              : "bg-yellow-900/20 text-yellow-300 border-yellow-500/30"
          }
        `}
      >
        {task.status.toUpperCase()}
      </span>

      {/* OUTPUT CARD */}
      <div className="
        bg-linear-to-br from-[#111214] to-[#18191c]
        border border-white/10 rounded-2xl p-6 shadow-xl
        space-y-4 transition-all mt-1
      ">
        <h3 className="text-lg font-semibold text-white/90">
          📄 Final Output
        </h3>

        <div
          className="
            bg-[#0b0c0e] border border-white/10 rounded-xl p-5 
            shadow-inner text-sm text-gray-200 leading-relaxed
            whitespace-pre-wrap font-medium
          "
        >
          {finalOutput || "Processing..."}
        </div>
      </div>

      {/* REASONING BOX */}
      {thinkingEnabled && task.reasoning && (
        <div className="
          bg-linear-to-br from-indigo-900/20 to-indigo-700/10
          border border-indigo-500/20 rounded-2xl p-6 shadow-lg
          space-y-3
        ">
          <h4 className="text-sm font-semibold text-indigo-300">
            🧠 DeepThink Reasoning
          </h4>

          <pre
            className="
              whitespace-pre-wrap text-indigo-100 text-sm 
              leading-relaxed bg-black/20 p-4 rounded-lg border border-indigo-500/20
            "
          >
            {task.reasoning}
          </pre>
        </div>
      )}
    </div>
  );
}
