import { useState } from "react";

const OPTIONS = [
  { value: "research_assistant", label: "Research Assistant" },
  { value: "travel_planner", label: "Travel Planner" },
  { value: "resume_enhancer", label: "Resume Enhancer" },
  { value: "coding_consultant", label: "Coding Consultant" },
  { value: "recipe_grocery", label: "Recipe + Grocery List" },
  { value: "fitness_planner", label: "Fitness Planner" },
  { value: "book_summary", label: "Book Summary" },
];

export default function TemplateSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const currentLabel = OPTIONS.find((o) => o.value === value)?.label;

  return (
    <div className="relative space-y-1">
      <label className="text-sm font-semibold text-white">Assistant Mode</label>

      <div
        onClick={() => setOpen(!open)}
        className="bg-slate-900/70 p-4 rounded-xl border border-indigo-400/30 cursor-pointer"
      >
        {currentLabel}
      </div>

      {open && (
        <div className="absolute bg-slate-900 border border-indigo-400/20 mt-1 w-full rounded-xl overflow-hidden shadow-xl z-30">
          {OPTIONS.map((o) => (
            <div
              key={o.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-indigo-600 cursor-pointer"
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
