import { Suspense } from "react";
import { AppHeader } from "@/shared/components/AppHeader";
import { ScanProgress } from "@/features/analysis-progress";
import { AnalysisScreen } from "./analysis-screen";

// Con cacheComponents, leer `params` exige un <Suspense> alrededor.
export default function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <>
          <AppHeader />
          <main className="flex flex-1 items-center justify-center px-5 py-12">
            <ScanProgress phase="loading" />
          </main>
        </>
      }
    >
      <AnalysisScreen params={params} />
    </Suspense>
  );
}
