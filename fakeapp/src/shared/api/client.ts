import { clearSession, getAccessToken, hasSessionHint, setAccessToken } from "@/shared/auth/session";
import type { AnalysisCreated, AnalysisList, AnalysisResult, TokenResponse, User } from "./types";

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
  if (res.status === 429) return "Demasiados intentos. Espera un minuto e inténtalo de nuevo.";
  return "Algo salió mal. Inténtalo de nuevo.";
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Renovación de sesión: una sola a la vez (si 3 llamadas la piden, solo sale 1 petición) ---

let refreshing: Promise<boolean> | null = null;

async function doRefresh(): Promise<boolean> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(`${BASE}/auth/refresh`, { method: "POST" });
      if (res.status === 409 && attempt === 0) {
        // Otra pestaña la está renovando justo ahora: esperamos y reintentamos una vez.
        await sleep(1200);
        continue;
      }
      if (!res.ok) {
        clearSession();
        return false;
      }
      const body = (await res.json()) as TokenResponse;
      setAccessToken(body.access_token, body.expires_in);
      return true;
    } catch {
      return false; // sin red: no borramos la sesión, puede volver
    }
  }
  return false;
}

export function refreshSession(): Promise<boolean> {
  refreshing ??= doRefresh().finally(() => {
    refreshing = null;
  });
  return refreshing;
}

// --- Peticiones ---

interface Options {
  /** false en login/registro: ahí no se manda ni se renueva el token. */
  auth?: boolean;
}

async function send(path: string, init: RequestInit | undefined, withAuth: boolean): Promise<Response> {
  const headers = new Headers(init?.headers);
  if (withAuth) {
    const token = getAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }
  try {
    return await fetch(`${BASE}${path}`, { ...init, headers });
  } catch {
    throw new ApiError(0, NETWORK_MESSAGE);
  }
}

async function request<T>(path: string, init?: RequestInit, { auth = true }: Options = {}): Promise<T> {
  // Página recién cargada: el token en memoria se perdió pero la cookie sigue. Lo recuperamos antes.
  if (auth && !getAccessToken() && hasSessionHint()) await refreshSession();

  let res = await send(path, init, auth);
  if (auth && res.status === 401 && hasSessionHint() && (await refreshSession())) {
    res = await send(path, init, auth);
  }
  if (!res.ok) throw new ApiError(res.status, await readError(res));
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// --- Análisis ---

export function createAnalysis(file: File): Promise<AnalysisCreated> {
  const form = new FormData();
  form.append("file", file);
  return request<AnalysisCreated>("/analyses", { method: "POST", body: form });
}

export function getAnalysis(id: string): Promise<AnalysisResult> {
  return request<AnalysisResult>(`/analyses/${encodeURIComponent(id)}`, { cache: "no-store" });
}

export function listAnalyses(limit = 50, offset = 0): Promise<AnalysisList> {
  return request<AnalysisList>(`/analyses?limit=${limit}&offset=${offset}`, { cache: "no-store" });
}

// --- Cuenta ---

const JSON_HEADERS = { "Content-Type": "application/json" };

export async function login(email: string, password: string): Promise<User> {
  const body = await request<TokenResponse>(
    "/auth/login",
    { method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ email, password }) },
    { auth: false },
  );
  setAccessToken(body.access_token, body.expires_in);
  return body.user;
}

export async function register(email: string, password: string): Promise<void> {
  await request<User>(
    "/auth/register",
    { method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ email, password }) },
    { auth: false },
  );
}

export async function logout(): Promise<void> {
  try {
    await request<void>("/auth/logout", { method: "POST" }, { auth: false });
  } finally {
    clearSession();
  }
}

export function getMe(): Promise<User> {
  return request<User>("/auth/me", { cache: "no-store" });
}
