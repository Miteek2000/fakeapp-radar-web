import type { AnalysisCreated, AnalysisResult } from "./types";

// Las llamadas van a /api/... y next.config.ts las reenvía a la API (evita CORS).
const BASE = "/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

const NETWORK_MESSAGE =
  "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.";

async function readError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    // FastAPI manda {"detail": "texto"} o, en validaciones, una lista de objetos.
    if (typeof body?.detail === "string") return body.detail;
  } catch {
    /* sin cuerpo JSON */
  }
  return "Algo salió mal. Inténtalo de nuevo.";
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, init);
  } catch {
    throw new ApiError(0, NETWORK_MESSAGE);
  }
  if (!res.ok) throw new ApiError(res.status, await readError(res));
  return (await res.json()) as T;
}

export function createAnalysis(file: File): Promise<AnalysisCreated> {
  const form = new FormData();
  form.append("file", file);
  return request<AnalysisCreated>("/analyses", { method: "POST", body: form });
}

export function getAnalysis(id: string): Promise<AnalysisResult> {
  return request<AnalysisResult>(`/analyses/${encodeURIComponent(id)}`, { cache: "no-store" });
}
