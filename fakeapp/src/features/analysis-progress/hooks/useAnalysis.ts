"use client";

import { useEffect, useState } from "react";
import { ApiError, getAnalysis } from "@/shared/api/client";
import { DEMO_REPORT, DEMO_VIRUSTOTAL } from "@/shared/api/mock";
import type { AnalysisReport, VirusTotalInfo } from "@/shared/api/types";

export type AnalysisState =
  | { phase: "loading" }
  | { phase: "pending" }
  | { phase: "running" }
  | { phase: "done"; report: AnalysisReport; virustotal: VirusTotalInfo | null }
  | { phase: "failed"; message: string }
  | { phase: "not_found"; message: string }
  | { phase: "unreachable"; message: string };

const POLL_MS = 1500;
const MAX_WAIT_MS = 3 * 60 * 1000;
const MAX_NETWORK_FAILURES = 3;
// Terminado el análisis, VirusTotal puede tardar unos segundos más: se sigue preguntando un rato.
const VT_WAIT_MS = 45 * 1000;

/** Consulta GET /analyses/{id} cada 1.5 s hasta que termina (done) o falla. */
export function useAnalysis(id: string): AnalysisState {
  const [state, setState] = useState<AnalysisState>({ phase: "loading" });

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const startedAt = Date.now();
    let networkFailures = 0;
    let doneAt: number | null = null;

    const update = (next: AnalysisState) => {
      if (!cancelled) setState(next);
    };

    // Ruta /analisis/demo: simula el proceso para enseñar el diseño sin la API.
    if (id === "demo") {
      timer = setTimeout(() => update({ phase: "pending" }), 300);
      const t2 = setTimeout(() => update({ phase: "running" }), 1500);
      const t3 = setTimeout(() => update({ phase: "done", report: DEMO_REPORT, virustotal: DEMO_VIRUSTOTAL }), 3200);
      return () => {
        cancelled = true;
        clearTimeout(timer);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }

    async function poll() {
      try {
        const result = await getAnalysis(id);
        networkFailures = 0;
        if (result.status === "done" && result.report) {
          doneAt ??= Date.now();
          update({ phase: "done", report: result.report, virustotal: result.virustotal });
          const waitingVt = result.virustotal?.status === "pending" && Date.now() - doneAt < VT_WAIT_MS;
          if (!waitingVt) return;
          timer = setTimeout(poll, POLL_MS);
          return;
        }
        if (result.status === "failed") {
          return update({
            phase: "failed",
            message: result.error ?? "No pudimos analizar este archivo.",
          });
        }
        update({ phase: result.status === "running" ? "running" : "pending" });
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) {
          return update({ phase: "not_found", message: e.message });
        }
        if (e instanceof ApiError && e.status === 422) {
          return update({ phase: "not_found", message: "Ese enlace de análisis no es válido." });
        }
        networkFailures += 1;
        if (networkFailures >= MAX_NETWORK_FAILURES) {
          return update({
            phase: "unreachable",
            message: e instanceof ApiError ? e.message : "No pudimos conectar con el servidor.",
          });
        }
      }

      if (Date.now() - startedAt > MAX_WAIT_MS) {
        return update({ phase: "failed", message: "El análisis tardó demasiado. Inténtalo de nuevo." });
      }
      timer = setTimeout(poll, POLL_MS);
    }

    void poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [id]);

  return state;
}
