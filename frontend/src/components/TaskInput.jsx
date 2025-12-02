export default function TaskInput({ value, onChange, onSubmit, loading }) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-300">Your Query</label>

      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your task…"
        className="w-full p-5 rounded-2xl bg-[#111113] border border-gray-200
    shadow-[0_4px_12px_rgba(0,0,0,0.05)] 
    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
    transition-all duration-200 resize-none
    text-[15px] leading-relaxed
   text-white placeholder:text-gray-600
    hover:border-gray-300 hover:bg-[#0f0f10]"
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className="
          w-full py-3 rounded-xl text-white bg-indigo-600 text-center text-sm font-medium
          shadow-md hover:bg-indigo-700 disabled:opacity-50 transition-all
          inline-flex items-center justify-center gap-2
        "
      >
        {loading ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Processing…
          </>
        ) : (
          "Start Task"
        )}
      </button>
    </div>
  );
}
