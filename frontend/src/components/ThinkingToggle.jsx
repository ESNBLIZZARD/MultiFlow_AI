export default function ThinkingToggle({ enabled, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(!enabled)}
        className={`h-7 w-14 rounded-full p-1 transition ${
          enabled ? "bg-purple-600" : "bg-slate-700"
        }`}
      >
        <div
          className={`h-5 w-5 bg-white rounded-full transition ${
            enabled ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>

      <span className="text-sm font-semibold text-white">DeepThink</span>
    </div>
  );
}
