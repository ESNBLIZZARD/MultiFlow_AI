function StepRow({ step, isLast }) {
  const statusDot = {
    completed: "bg-emerald-400 shadow-emerald-500/50",
    running: "bg-yellow-400 animate-pulse shadow-yellow-500/50",
    failed: "bg-red-500 shadow-red-500/50",
    pending: "bg-gray-400",
  }[step.status];

  const statusBadge = {
    completed: "bg-emerald-900/30 text-emerald-300 border-emerald-500/20",
    running: "bg-yellow-900/30 text-yellow-300 border-yellow-500/20",
    failed: "bg-red-900/30 text-red-300 border-red-500/20",
    pending: "bg-gray-700 text-gray-300 border-gray-500/20",
  }[step.status];

  return (
    <div className="relative pl-10">
      {/* Connecting Line */}
      {!isLast && (
        <div className="absolute left-4 top-6 w-px h-full bg-white/10"></div>
      )}

      {/* Status Dot */}
      <div
        className={`absolute left-2 top-5 w-4 h-4 rounded-full shadow-lg ${statusDot}`}
      />

      {/* Step Card */}
      <div className="
        p-5 rounded-xl 
        bg-linear-to-br from-[#111214] to-[#18191c]
        border border-white/10 shadow-xl
        transition-all hover:shadow-2xl space-y-3
      ">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="font-semibold text-white/90 text-sm tracking-wide">
            {step.name.replace(/_/g, " ").toUpperCase()}
          </div>

          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusBadge}`}
          >
            {step.status}
          </span>
        </div>

        {/* Prompt */}
        {step.prompt && (
          <div className="
            bg-black/20 border border-white/10 rounded-lg
            p-3 text-xs leading-relaxed text-gray-300 whitespace-pre-wrap
          ">
            <span className="text-indigo-300 font-medium">Prompt:</span>
            <br />
            {step.prompt}
          </div>
        )}

        {/* Output */}
        {step.output && (
          <div className="
            bg-[#0b0c0e] border border-white/10 rounded-lg 
            p-4 text-sm leading-relaxed text-gray-200 whitespace-pre-wrap
            font-medium shadow-inner
          ">
            <span className="text-emerald-300 font-semibold">Output:</span>
            <br />
            {step.output}
          </div>
        )}

        {/* Error */}
        {step.error && (
          <div className="
            bg-red-950/30 border border-red-700/20
            text-red-300 p-3 rounded-lg text-sm whitespace-pre-wrap
          ">
            ⚠️ Error: {step.error}
          </div>
        )}

        {/* Timestamp */}
        {step.finishedAt && (
          <div className="text-[11px] text-gray-400 pt-1">
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
        p-5 rounded-xl bg-black/20 border border-white/10 
        text-gray-400 text-sm shadow-xl
      ">
        No steps yet.
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
