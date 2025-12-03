function StepRow({ step, isLast }) {
  const statusDot = {
    completed: "bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50",
    running: "bg-gradient-to-br from-amber-400 to-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50",
    failed: "bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/50",
    pending: "bg-slate-600",
  }[step.status];

  const statusBadge = {
    completed: "bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-400/30",
    running: "bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-yellow-400/30",
    failed: "bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-400/30",
    pending: "bg-slate-700 text-slate-300 border-slate-500/30",
  }[step.status];

  return (
    <div className="relative pl-8 sm:pl-12">
      {!isLast && (
        <div className="absolute left-3 sm:left-5 top-6 sm:top-8 w-0.5 h-full bg-linear-to-b from-indigo-500/50 to-purple-500/20"></div>
      )}

      <div
        className={`absolute left-1.5 sm:left-3 top-4 sm:top-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full ${statusDot}`}
      />

      <div className="
        p-4 sm:p-6 rounded-xl sm:rounded-2xl 
        bg-linear-to-br from-slate-900/70 to-indigo-950/40
        border border-indigo-400/20 shadow-xl
        transition-all hover:shadow-2xl hover:border-indigo-400/40 space-y-3 sm:space-y-4
      ">
        <div className="flex items-start sm:items-center justify-between gap-2 flex-col sm:flex-row">
          <div className="font-bold text-white text-sm sm:text-base tracking-wide">
            {step.name.replace(/_/g, " ").toUpperCase()}
          </div>

          <span
            className={`px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-bold rounded-full border shadow-lg ${statusBadge} whitespace-nowrap`}
          >
            {step.status}
          </span>
        </div>

        {step.prompt && (
          <div className="
            bg-slate-950/60 border border-indigo-400/20 rounded-lg sm:rounded-xl
            p-3 sm:p-4 text-xs sm:text-sm leading-relaxed text-slate-300 whitespace-pre-wrap
            wrap-break-words
          ">
            <span className="text-indigo-400 font-bold">Prompt:</span>
            <br />
            {step.prompt}
          </div>
        )}

        {step.output && (
          <div className="
            bg-slate-950/80 border border-emerald-400/20 rounded-lg sm:rounded-xl 
            p-3 sm:p-5 text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-wrap
            shadow-inner wrap-break-words
          ">
            <span className="text-emerald-400 font-bold">Output:</span>
            <br />
            {step.output}
          </div>
        )}

        {step.error && (
          <div className="
            bg-red-950/40 border border-red-500/30
            text-red-300 p-3 sm:p-4 rounded-lg sm:rounded-xl text-xs sm:text-sm whitespace-pre-wrap
            wrap-break-words
          ">
            ⚠️ Error: {step.error}
          </div>
        )}

        {step.finishedAt && (
          <div className="text-xs text-slate-500 pt-1">
            Completed at: {new Date(step.finishedAt).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StepsTimeline({ steps }) {
  if (!steps || steps.length === 0) {
    return (
      <div className="
        p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-950/50 border border-indigo-400/20 
        text-slate-400 text-sm sm:text-base shadow-xl
      ">
        No steps yet.
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {steps.map((step, i) => (
        <StepRow
          key={step.id || i}
          step={step}
          isLast={i === steps.length - 1}
        />
      ))}
    </div>
  );
}