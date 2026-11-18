"use client";

import { use } from "react";
import { AppHeader } from "@/shared/components/AppHeader";
import { ScanError, ScanProgress, useAnalysis } from "@/features/analysis-progress";
import { ResultFlow } from "@/features/analysis-result";

/** Pantalla de un análisis: progreso -> resultado en 3 vistas (o error). */
export function AnalysisScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const analysis = useAnalysis(id);

  if (analysis.phase === "done") {
    return <ResultFlow report={analysis.report} virustotal={analysis.virustotal} />;
  }

  return (
    <>
      <AppHeader />
      <main className="flex flex-1 items-center justify-center px-5 py-12">
        {analysis.phase === "failed" || analysis.phase === "not_found" || analysis.phase === "unreachable" ? (
          <ScanError phase={analysis.phase} message={analysis.message} />
        ) : (
          <ScanProgress phase={analysis.phase} />
        )}
      </main>
    </>
  );
}
