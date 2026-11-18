import { Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const STEPS = ["Resumen", "Rayos X", "Qué hacer"];

interface StepIndicatorProps {
  current: number;
  onSelect: (index: number) => void;
}

export function StepIndicator({ current, onSelect }: StepIndicatorProps) {
  return (
    <nav aria-label="Pasos del resultado" className="flex items-center gap-3 sm:gap-4">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={active ? "step" : undefined}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-full border text-sm font-bold",
                  done && "border-transparent bg-ok-soft text-ok",
                  active && "border-transparent bg-brand text-white",
                  !done && !active && "border-line bg-surface text-muted",
                )}
              >
                {done ? <Check className="size-4" aria-hidden /> : i + 1}
              </span>
              <span className={cn("hidden text-sm sm:inline", active ? "font-bold" : "font-medium text-muted")}>
                {label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span className={cn("h-px w-8 sm:w-14", done ? "bg-ok/50" : "bg-line")} aria-hidden />
            )}
          </div>
        );
      })}
    </nav>
  );
}
