export default function ResponseBox({ task, thinkingEnabled }) {
  if (!task)
    return (
      <p className="text-slate-400 text-sm sm:text-base italic">
        No output yet...
      </p>
    );

  const finalStep = task.steps?.[task.steps.length - 1];
  const finalOutput = finalStep?.output;

  return (
    <div className="space-y-6 sm:space-y-8">
      <span
        className={`
          px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-bold rounded-full tracking-wider uppercase
          shadow-lg border inline-block
          ${
            task.status === "completed"
              ? "bg-linear-to-r from-emerald-600 to-green-600 text-white border-emerald-400/50 shadow-emerald-500/30"
              : task.status === "failed"
              ? "bg-linear-to-r from-red-600 to-rose-600 text-white border-red-400/50 shadow-red-500/30"
              : "bg-linear-to-r from-amber-600 to-yellow-600 text-white border-yellow-400/50 shadow-yellow-500/30"
          }
        `}
      >
        {task.status.toUpperCase()}
      </span>

      <div className="
        bg-linear-to-br from-slate-900/90 to-indigo-950/60
        border border-indigo-400/30 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-2xl
        space-y-4 sm:space-y-5 transition-all
      ">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="text-xl sm:text-2xl">📄</span>
          Final Output
        </h3>

        <div
          className="
            bg-slate-950/70 border border-indigo-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6 
            shadow-inner text-sm sm:text-base text-slate-200 leading-relaxed
            whitespace-pre-wrap wrap-break-words
          "
        >
          {finalOutput || "Processing..."}
        </div>
      </div>

      {thinkingEnabled && task.reasoning && (
        <div className="
          bg-linear-to-br from-purple-900/30 to-indigo-900/20
          border border-purple-400/30 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-lg
          space-y-3 sm:space-y-4
        ">
          <h4 className="text-sm sm:text-base font-bold text-purple-300 flex items-center gap-2">
            <span className="text-lg sm:text-xl">🧠</span>
            DeepThink Reasoning
          </h4>

          <pre
            className="
              whitespace-pre-wrap text-purple-100 text-xs sm:text-sm 
              leading-relaxed bg-slate-950/50 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-purple-500/20
              wrap-break-words overflow-x-auto
            "
          >
            {task.reasoning}
          </pre>
        </div>
      )}
    </div>
  );
}
