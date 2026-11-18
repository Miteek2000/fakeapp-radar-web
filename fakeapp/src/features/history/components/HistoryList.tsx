"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileSearch, LogIn } from "lucide-react";
import { ApiError, listAnalyses } from "@/shared/api/client";
import type { AnalysisSummary, RiskLevel } from "@/shared/api/types";
import { buttonStyles } from "@/shared/components/buttons";
import { formatSize } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import { useAuth } from "@/features/auth";

const RISK: Record<RiskLevel, { label: string; className: string }> = {
  alto: { label: "Riesgo alto", className: "bg-danger-soft text-danger" },
  medio: { label: "Riesgo medio", className: "bg-warn-soft text-warn" },
  bajo: { label: "Riesgo bajo", className: "bg-ok-soft text-ok" },
};

const STATUS_LABEL: Record<string, string> = {
  pending: "En cola",
  running: "Analizando",
  failed: "No se pudo analizar",
};

type State =
  | { phase: "loading" }
  | { phase: "ready"; items: AnalysisSummary[] }
  | { phase: "error"; message: string };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" });
}

export function HistoryList() {
  const { status } = useAuth();
  const [state, setState] = useState<State>({ phase: "loading" });

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    listAnalyses()
      .then((res) => !cancelled && setState({ phase: "ready", items: res.items }))
      .catch(
        (e) =>
          !cancelled &&
          setState({ phase: "error", message: e instanceof ApiError ? e.message : "No pudimos cargar tu historial." }),
      );
    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "loading") {
    return <p className="mt-8 text-muted">Cargando…</p>;
  }

  if (status === "anonymous") {
    return (
      <div className="mt-8 rounded-3xl bg-surface p-8 text-center shadow-card">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
          <LogIn className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-extrabold">Inicia sesión para ver tu historial</h2>
        <p className="mt-2 text-sm text-muted">Solo se guardan los análisis que hagas con tu cuenta.</p>
        <Link href="/login" className={buttonStyles("primary", "mt-5")}>
          Iniciar sesión
        </Link>
      </div>
    );
  }

  if (state.phase === "loading") return <p className="mt-8 text-muted">Cargando tus análisis…</p>;

  if (state.phase === "error") {
    return (
      <p role="alert" className="mt-8 rounded-2xl bg-danger-soft p-6 text-sm font-medium text-danger">
        {state.message}
      </p>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-surface p-8 text-center shadow-card">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
          <FileSearch className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-extrabold">Todavía no analizaste ningún APK</h2>
        <p className="mt-2 text-sm text-muted">Sube uno y aparecerá aquí.</p>
        <Link href="/" className={buttonStyles("primary", "mt-5")}>
          Analizar un APK
        </Link>
      </div>
    );
  }

  return (
    <ul className="mt-6 grid gap-3">
      {state.items.map((item) => {
        const risk = item.risk_level ? RISK[item.risk_level] : null;
        return (
          <li key={item.id}>
            <Link
              href={`/analisis/${item.id}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface p-5 shadow-card transition-colors hover:bg-brand-soft"
            >
              <div className="min-w-0">
                <p className="font-mono text-sm font-semibold" title={item.sha256}>
                  {item.sha256.slice(0, 16)}…
                </p>
                <p className="mt-1 text-xs text-muted">
                  {formatDate(item.created_at)} · {formatSize(item.size_bytes)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {item.risk_score !== null && (
                  <span className="text-2xl font-extrabold tabular-nums">
                    {item.risk_score}
                    <span className="text-sm font-semibold text-muted">/100</span>
                  </span>
                )}
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-bold",
                    risk ? risk.className : "bg-brand-soft text-brand",
                  )}
                >
                  {risk ? risk.label : (STATUS_LABEL[item.status] ?? "Listo")}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
