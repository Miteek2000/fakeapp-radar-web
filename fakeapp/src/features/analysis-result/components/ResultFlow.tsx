"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { AnalysisReport, VirusTotalInfo } from "@/shared/api/types";
import { AppHeader } from "@/shared/components/AppHeader";
import { buttonStyles } from "@/shared/components/buttons";
import { Container } from "@/shared/components/Container";
import { downloadReport, reportLabel } from "../lib/report";
import { ActionsView } from "./ActionsView";
import { PermissionsView } from "./PermissionsView";
import { StepIndicator } from "./StepIndicator";
import { SummaryView } from "./SummaryView";

/** Resultado en 3 vistas: Resumen -> Rayos X -> Qué hacer. */
export function ResultFlow({ report, virustotal }: { report: AnalysisReport; virustotal: VirusTotalInfo | null }) {
  const [step, setStep] = useState(0);
  const go = (next: number) => {
    setStep(next);
    window.scrollTo({ top: 0 });
  };

  return (
    <MotionConfig reducedMotion="user">
      <AppHeader fileName={reportLabel(report)} />
      <main className="flex flex-1 flex-col py-6 sm:py-8">
        <Container className="flex flex-1 flex-col gap-6">
          <StepIndicator current={step} onSelect={go} />

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {step === 0 && <SummaryView report={report} virustotal={virustotal} />}
                {step === 1 && <PermissionsView report={report} />}
                {step === 2 && <ActionsView level={report.risk_level} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
            {step === 0 ? (
              <Link href="/" className={buttonStyles("secondary", "w-full sm:w-auto")}>
                Analizar otro APK
              </Link>
            ) : (
              <button type="button" onClick={() => go(step - 1)} className={buttonStyles("secondary", "w-full sm:w-auto")}>
                <ArrowLeft className="size-4" aria-hidden />
                {step === 1 ? "Volver al resumen" : "Volver a rayos X"}
              </button>
            )}

            {step < 2 ? (
              <button type="button" onClick={() => go(step + 1)} className={buttonStyles("primary", "w-full sm:w-auto")}>
                {step === 0 ? "Ver rayos X de permisos" : "Qué hacer ahora"}
                <ArrowRight className="size-4" aria-hidden />
              </button>
            ) : (
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button type="button" onClick={() => downloadReport(report)} className={buttonStyles("secondary", "w-full sm:w-auto")}>
                  Exportar reporte
                </button>
                <Link href="/" className={buttonStyles("primary", "w-full sm:w-auto")}>
                  Analizar otro APK
                </Link>
              </div>
            )}
          </div>
        </Container>
      </main>
    </MotionConfig>
  );
}
