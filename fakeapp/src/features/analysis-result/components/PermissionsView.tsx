"use client";

import { useMemo, useState } from "react";
import type { AnalysisReport, Severity } from "@/shared/api/types";
import { cn } from "@/shared/lib/cn";
import { sortPermissions } from "../lib/report";
import { SEVERITY, SEVERITY_ORDER } from "../lib/severity";
import { PermissionCard } from "./PermissionCard";

type Filter = "todos" | Severity;

export function PermissionsView({ report }: { report: AnalysisReport }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const sorted = useMemo(() => sortPermissions(report.permissions), [report.permissions]);
  const visible = filter === "todos" ? sorted : sorted.filter((p) => p.severity === filter);

  const chips: Array<{ id: Filter; label: string; count: number; className: string }> = [
    { id: "todos", label: "Todos", count: sorted.length, className: "bg-ink text-white border-ink" },
    ...SEVERITY_ORDER.map((s) => ({
      id: s as Filter,
      label: SEVERITY[s].plural,
      count: report.permissions.filter((p) => p.severity === s).length,
      className: cn(
        s === "peligroso" && "border-danger/30 text-danger",
        s === "atencion" && "border-warn/30 text-warn",
        s === "normal" && "border-ok/30 text-ok",
      ),
    })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Rayos X de permisos</h1>
          <p className="mt-2 text-base text-muted">
            Esto es lo que la app podría hacer en tu teléfono, explicado sin tecnicismos.
          </p>
        </div>

        <div role="group" aria-label="Filtrar permisos" className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            const active = filter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(chip.id)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                  active ? "bg-ink text-white border-ink" : cn("bg-surface hover:bg-brand-soft", chip.className),
                )}
              >
                {chip.label} {chip.count}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-surface p-8 text-center text-muted shadow-card">
          {report.permissions.length === 0
            ? "Esta app no pide permisos especiales."
            : "No hay permisos en esta categoría."}
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((permission) => (
            <PermissionCard key={permission.android_name} permission={permission} />
          ))}
        </ul>
      )}
    </div>
  );
}
