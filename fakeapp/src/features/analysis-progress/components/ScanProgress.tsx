"use client";

import { motion } from "framer-motion";
import { Check, LoaderCircle, Radar } from "lucide-react";
import { cn } from "@/shared/lib/cn";

type Phase = "loading" | "pending" | "running";

const STEPS = ["Archivo recibido", "Leyendo los permisos", "Calculando el riesgo"];

/** Cuántos pasos van completos según el estado real que reporta la API. */
function doneSteps(phase: Phase): number {
  if (phase === "running") return 1;
  if (phase === "pending") return 1;
  return 0;
}

export function ScanProgress({ phase }: { phase: Phase }) {
  const done = doneSteps(phase);
  const activeIndex = phase === "running" ? 1 : phase === "pending" ? 1 : 0;

  return (
    <section
      aria-live="polite"
      className="w-full max-w-md rounded-3xl bg-surface p-8 text-center shadow-card"
    >
      <div className="relative mx-auto grid size-28 place-items-center">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-brand/40"
            animate={{ scale: [0.6, 1.25], opacity: [0.7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: i * 1.1, ease: "easeOut" }}
          />
        ))}
        <span className="relative grid size-16 place-items-center rounded-full bg-brand text-white">
          <Radar className="size-8" aria-hidden />
        </span>
      </div>

      <h1 className="mt-6 text-2xl font-extrabold tracking-tight">Analizando tu APK</h1>
      <p className="mt-2 text-sm text-muted">
        {phase === "pending"
          ? "Tu archivo está en la fila. Empieza en unos segundos."
          : "Lo revisamos sin abrirlo ni ejecutarlo. No cierres esta página."}
      </p>

      <ol className="mt-6 space-y-3 text-left">
        {STEPS.map((label, i) => {
          const finished = i < done;
          const active = i === activeIndex && !finished;
          return (
            <li key={label} className="flex items-center gap-3 text-sm font-medium">
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full",
                  finished && "bg-ok-soft text-ok",
                  active && "bg-brand-soft text-brand",
                  !finished && !active && "bg-canvas text-muted",
                )}
              >
                {finished ? (
                  <Check className="size-3.5" aria-hidden />
                ) : active ? (
                  <LoaderCircle className="size-3.5 animate-spin" aria-hidden />
                ) : (
                  <span className="size-1.5 rounded-full bg-current" />
                )}
              </span>
              <span className={cn(!finished && !active && "text-muted")}>{label}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
