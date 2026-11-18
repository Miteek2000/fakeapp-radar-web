// Espejo de los esquemas de la API (fakeapp-radar-api: app/schemas.py y app/analysis/models.py).

export type Severity = "peligroso" | "atencion" | "normal";
export type RiskLevel = "bajo" | "medio" | "alto";
export type AnalysisStatus = "pending" | "running" | "done" | "failed";
/** pending = consultando; found = VirusTotal conoce el archivo; not_found = nunca lo vio; unavailable = no se pudo consultar. */
export type VtStatus = "pending" | "found" | "not_found" | "unavailable";

export interface Hashes {
  md5: string;
  sha1: string;
  sha256: string;
}

export interface PermissionFinding {
  android_name: string;
  title: string;
  explanation: string;
  severity: Severity;
  weight: number;
  icon: string;
  known: boolean;
}

export interface PermissionCounts {
  peligroso: number;
  atencion: number;
  normal: number;
}

export interface AnalysisReport {
  package_name: string | null;
  app_name: string | null;
  version_name: string | null;
  min_sdk: number | null;
  target_sdk: number | null;
  size_bytes: number;
  hashes: Hashes;
  permissions: PermissionFinding[];
  counts: PermissionCounts;
  risk_score: number;
  risk_level: RiskLevel;
}

/** Reputación según VirusTotal. Solo se consulta el SHA-256: el archivo no se sube. */
export interface VirusTotalInfo {
  status: VtStatus;
  malicious: number | null; // motores que lo marcan como malicioso o sospechoso
  total: number | null; // motores que dieron un veredicto
  url: string;
}

export interface AnalysisCreated {
  id: string;
  sha256: string;
  size_bytes: number;
  status: AnalysisStatus;
}

export interface AnalysisResult {
  id: string;
  status: AnalysisStatus;
  report: AnalysisReport | null;
  error: string | null;
  virustotal: VirusTotalInfo | null;
}

// --- Cuentas e historial (fakeapp-radar-api: app/routers/auth.py y app/schemas.py) ---

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number; // segundos
  user: User;
}

export interface AnalysisSummary {
  id: string;
  status: AnalysisStatus;
  sha256: string;
  size_bytes: number;
  risk_score: number | null;
  risk_level: RiskLevel | null;
  created_at: string;
  finished_at: string | null;
}

export interface AnalysisList {
  items: AnalysisSummary[];
  limit: number;
  offset: number;
}
