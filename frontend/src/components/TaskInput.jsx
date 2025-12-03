export default function TaskInput({ value, onChange, onSubmit, loading }) {
  return (
    <div className="space-y-3">
      <label className="text-sm sm:text-base font-semibold text-white">
        Your Query
      </label>

      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your task…"
        className="
          w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl 
          bg-slate-950/70 border border-indigo-400/30 shadow-lg
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400
          transition-all duration-200 resize-none
          text-sm sm:text-base leading-relaxed
          text-white placeholder:text-slate-500
          hover:border-indigo-400/50 hover:bg-slate-950/90
        "
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className="
          w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white
          bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600
          text-center text-sm sm:text-base font-bold
          shadow-lg hover:shadow-xl hover:shadow-indigo-500/30
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300 inline-flex items-center justify-center
          gap-2 sm:gap-3 hover:scale-[1.02] active:scale-[0.98]
        "
      >
        {loading ? (
          <>
            <span className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full"></span>
            Processing…
          </>
        ) : (
          <>
            <span>▶</span>
            Start Task
          </>
        )}
      </button>
    </div>
  );
}
