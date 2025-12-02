export default function ThinkingToggle({ enabled, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(!enabled)}
        className={`
          relative h-7 w-14 rounded-full transition-colors duration-300
          ${enabled ? "bg-indigo-600" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            absolute h-5 w-5 bg-white rounded-full top-1 transition-all duration-300 shadow
            ${enabled ? "left-8" : "left-1"}
          `}
        />
      </button>

      <span className="text-sm font-medium text-gray-300">
        DeepThink (Reasoning)
      </span>
    </div>
  );
}
