import { MAX_UPLOAD_MB } from "@/shared/config";

/** Revisión rápida en el navegador. El servidor valida de nuevo (nunca confía en esto). */
export function validateApk(file: File): string | null {
  if (!file.name.toLowerCase().endsWith(".apk")) return "El archivo debe ser un .apk";
  if (file.size === 0) return "El archivo está vacío";
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) return `El archivo supera el máximo de ${MAX_UPLOAD_MB} MB`;
  return null;
}
