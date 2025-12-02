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
    <div className="space-y-1 relative">
      <label className="text-sm font-medium text-gray-300">Assistant Mode</label>

      {/* Select Box */}
      <div
        className="
          w-full p-3 rounded-xl border border-gray-700 bg-[#111113] 
          shadow-sm text-gray-100 text-sm cursor-pointer select-none
          flex items-center justify-between
          hover:border-gray-600 transition-all
        "
        onClick={() => setOpen((o) => !o)}
      >
        {currentLabel}
        <span className="text-gray-400 text-xs">▼</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-20 mt-1 w-full rounded-xl overflow-hidden 
            bg-[#1a1a1d] border border-gray-700 shadow-xl
            animate-fadeIn
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
                px-4 py-2 text-sm text-gray-200 cursor-pointer
                hover:bg-gray-700/40 hover:text-white transition-all
              "
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
