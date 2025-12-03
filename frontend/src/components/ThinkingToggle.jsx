export default function ThinkingToggle({ enabled, onChange }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        onClick={() => onChange(!enabled)}
        className={`
          relative h-7 w-14 sm:h-8 sm:w-16 rounded-full transition-all duration-300 shadow-lg shrink-0
          ${enabled 
            ? "bg-linear-to-r from-purple-600 to-indigo-600 shadow-purple-500/50" 
            : "bg-slate-700"
          }
        `}
      >
        <span
          className={`
            absolute h-5 w-5 sm:h-6 sm:w-6 bg-white rounded-full top-1 transition-all duration-300 shadow-lg
            ${enabled ? "left-8 sm:left-9" : "left-1"}
          `}
        />
      </button>

      <span className="text-sm sm:text-base font-semibold text-white">
        DeepThink
      </span>
    </div>
  );
}
