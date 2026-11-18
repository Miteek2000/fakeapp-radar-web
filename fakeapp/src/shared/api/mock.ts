import type { AnalysisReport, VirusTotalInfo } from "./types";

/** Reputación de ejemplo para la ruta /analisis/demo. */
export const DEMO_VIRUSTOTAL: VirusTotalInfo = {
  status: "found",
  malicious: 0,
  total: 72,
  url: "https://www.virustotal.com/",
};

/** Resultado de ejemplo (ruta /analisis/demo) para mostrar el diseño sin la API encendida. */
export const DEMO_REPORT: AnalysisReport = {
  package_name: "com.banca.movil.segura",
  app_name: "banca-movil-segura",
  version_name: "2.4.1",
  min_sdk: 24,
  target_sdk: 34,
  size_bytes: 4_404_019,
  hashes: { md5: "0".repeat(32), sha1: "0".repeat(40), sha256: "0".repeat(64) },
  permissions: [
    { android_name: "android.permission.READ_SMS", title: "Leer tus mensajes SMS", explanation: "Puede copiar los códigos de verificación que te manda tu banco.", severity: "peligroso", weight: 20, icon: "message-square", known: true },
    { android_name: "android.permission.BIND_ACCESSIBILITY_SERVICE", title: "Controlar lo que ves en pantalla", explanation: "Puede leer lo que escribes y tocar botones por ti sin que lo notes.", severity: "peligroso", weight: 25, icon: "eye", known: true },
    { android_name: "android.permission.SYSTEM_ALERT_WINDOW", title: "Dibujar encima de otras apps", explanation: "Puede mostrar una pantalla falsa sobre tu app del banco para robar tu contraseña.", severity: "peligroso", weight: 20, icon: "layers", known: true },
    { android_name: "android.permission.READ_CONTACTS", title: "Ver tus contactos", explanation: "Podría mandar mensajes a tus conocidos para seguir propagándose.", severity: "atencion", weight: 8, icon: "users", known: true },
    { android_name: "android.permission.ACCESS_FINE_LOCATION", title: "Saber dónde estás con exactitud", explanation: "Una app bancaria no necesita tu ubicación exacta todo el tiempo.", severity: "atencion", weight: 8, icon: "map-pin", known: true },
    { android_name: "android.permission.CAMERA", title: "Usar la cámara", explanation: "Es normal si la app escanea documentos o códigos QR.", severity: "normal", weight: 2, icon: "camera", known: true },
  ],
  counts: { peligroso: 3, atencion: 2, normal: 1 },
  risk_score: 83,
  risk_level: "alto",
};
