import type { AnalysisReport, PermissionFinding } from "@/shared/api/types";
import { SEVERITY_ORDER } from "./severity";

/** Nombre para mostrar en la cabecera (el reporte no guarda el nombre del archivo). */
export function reportLabel(report: AnalysisReport): string {
  return report.app_name ?? report.package_name ?? "APK analizado";
}

/** "android.permission.READ_SMS" -> "READ_SMS" */
export function shortPermissionName(name: string): string {
  return name.split(".").pop() ?? name;
}

/** Peligrosos primero y, dentro de cada grupo, los que más pesan. */
export function sortPermissions(list: PermissionFinding[]): PermissionFinding[] {
  return [...list].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity) || b.weight - a.weight,
  );
}

/** Descarga el reporte como archivo JSON (se arma en el navegador, no sube nada). */
export function downloadReport(report: AnalysisReport): void {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `reporte-${reportLabel(report).replace(/[^\w.-]+/g, "_")}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
