// El access token vive SOLO en memoria (nunca en localStorage): así un XSS no se lo puede llevar.
// El refresh token va en una cookie HttpOnly que el navegador manda solo.
// En localStorage guardamos únicamente una pista "hubo sesión" (sin secretos) para saber si
// vale la pena pedir un token nuevo al cargar la página.

const HINT_KEY = "fakeapp.session";

let accessToken: string | null = null;
let expiresAt = 0;

export function getAccessToken(): string | null {
  // 10 s de margen para no mandar un token que vence en el camino.
  return accessToken && Date.now() < expiresAt - 10_000 ? accessToken : null;
}

export function setAccessToken(token: string, expiresInSeconds: number): void {
  accessToken = token;
  expiresAt = Date.now() + expiresInSeconds * 1000;
  setHint(true);
}

export function clearSession(): void {
  accessToken = null;
  expiresAt = 0;
  setHint(false);
}

export function hasSessionHint(): boolean {
  try {
    return window.localStorage.getItem(HINT_KEY) === "1";
  } catch {
    return false;
  }
}

function setHint(on: boolean): void {
  try {
    if (on) window.localStorage.setItem(HINT_KEY, "1");
    else window.localStorage.removeItem(HINT_KEY);
  } catch {
    /* modo privado o storage bloqueado: la pista es opcional */
  }
}
