"use client";

import { motion } from "framer-motion";
import type { RiskLevel } from "@/shared/api/types";
import { RISK } from "../lib/risk";
import { cn } from "@/shared/lib/cn";

/** Medidor semicircular de 0 a 100. */
export function RiskGauge({ score, level }: { score: number; level: RiskLevel }) {
  const tone = RISK[level];

  return (
    <div role="img" aria-label={`Nivel de riesgo: ${score} de 100`} className="relative mx-auto w-full max-w-[380px]">
      <svg viewBox="0 0 380 200" className="w-full" fill="none">
        <path d="M 40 190 A 150 150 0 0 1 340 190" strokeWidth={42} className="stroke-line" />
        <motion.path
          d="M 40 190 A 150 150 0 0 1 340 190"
          strokeWidth={42}
          className={tone.stroke}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: score / 100 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <p className={cn("text-7xl font-extrabold leading-none tracking-tight text-ink")}>{score}</p>
        <p className="mt-2 text-sm font-medium text-muted">de 100 puntos de riesgo</p>
      </div>
    </div>
  );
}
