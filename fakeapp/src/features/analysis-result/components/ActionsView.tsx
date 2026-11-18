import { Archive, Ban, Lock, RotateCcw, Search, ShieldCheck, Trash2 } from "lucide-react";
import type { RiskLevel } from "@/shared/api/types";
import { ALREADY_INSTALLED, getAdvice, type AdviceStep } from "../lib/risk";

const STEP_ICONS: Record<AdviceStep["icon"], typeof Ban> = {
  ban: Ban,
  trash: Trash2,
  store: Archive,
  search: Search,
  refresh: RotateCcw,
};

const INSTALLED_ICONS = { trash: Trash2, lock: Lock, shield: ShieldCheck } as const;

export function ActionsView({ level }: { level: RiskLevel }) {
  const steps = getAdvice(level);

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Qué hacer ahora</h1>
      <p className="mt-2 text-base text-muted">Tres pasos sencillos para quedarte tranquilo.</p>

      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[step.icon];
          return (
            <li key={step.title} className="relative rounded-3xl bg-surface p-6 shadow-card">
              <span className="absolute right-6 top-5 text-5xl font-extrabold text-brand/15" aria-hidden>
                {i + 1}
              </span>
              <span className="grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
                <Icon className="size-6" aria-hidden />
              </span>
              <h2 className="mt-5 text-xl font-bold">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          );
        })}
      </ol>

      {level !== "bajo" && (
        <section className="mt-5 grid items-center gap-5 rounded-3xl bg-warn-soft p-6 lg:grid-cols-[minmax(0,260px)_repeat(3,1fr)]">
          <div>
            <h2 className="text-xl font-bold">¿Ya la instalaste?</h2>
            <p className="mt-1 text-sm text-muted">Actúa rápido, todavía estás a tiempo.</p>
          </div>
          {ALREADY_INSTALLED.map((item) => {
            const Icon = INSTALLED_ICONS[item.icon];
            return (
              <p key={item.text} className="flex items-center gap-3 text-sm font-bold">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-warn">
                  <Icon className="size-5" aria-hidden />
                </span>
                {item.text}
              </p>
            );
          })}
        </section>
      )}
    </div>
  );
}
