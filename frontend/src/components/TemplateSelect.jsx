import { useState } from "react";

const OPTIONS = [
  { value: "research_assistant", label: "Research Assistant" },
  { value: "travel_planner", label: "Travel Planner" },
  { value: "resume_enhancer", label: "Resume Enhancer" },
  { value: "coding_consultant", label: "Coding Consultant" },
  { value: "recipe_grocery", label: "Recipe + Grocery List" },
  { value: "fitness_planner", label: "Fitness Planner" },
  { value: "book_summary", label: "Book Summary + Action Plan" },
];

export default function TemplateSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const currentLabel = OPTIONS.find((o) => o.value === value)?.label;

  return (
    <div className="space-y-2 relative">
      <label className="text-sm sm:text-base font-semibold text-white">Assistant Mode</label>

      <div
        className="
          w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-400/30 
          bg-slate-950/70 
          shadow-lg text-white text-sm sm:text-base cursor-pointer select-none
          flex items-center justify-between
          hover:border-indigo-400/50 hover:bg-slate-950/90 transition-all
        "
        onClick={() => setOpen((o) => !o)}
      >
        <span className="truncate pr-2">{currentLabel}</span>
        <span className="text-slate-400 text-xs sm:text-sm shrink-0">▼</span>
      </div>

      {open && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setOpen(false)}
          />
          <div
            className="
              absolute z-20 mt-1 w-full rounded-xl sm:rounded-2xl overflow-hidden 
              bg-slate-900 border border-indigo-400/30 shadow-2xl
              max-h-64 overflow-y-auto
            "
          >
            {OPTIONS.map((o) => (
              <div
                key={o.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="
                  px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-slate-200 cursor-pointer
                  hover:bg-indigo-600 hover:text-white transition-all
                  border-b border-slate-800/50 last:border-b-0
                "
              >
                {o.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
