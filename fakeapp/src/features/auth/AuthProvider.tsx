"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getMe, login as apiLogin, logout as apiLogout, refreshSession } from "@/shared/api/client";
import type { User } from "@/shared/api/types";
import { hasSessionHint } from "@/shared/auth/session";

type Status = "loading" | "anonymous" | "authenticated";

interface AuthContextValue {
  status: Status;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<User | null>(null);

  // Al cargar: si hubo sesión, intentamos recuperarla con la cookie de renovación.
  useEffect(() => {
    let cancelled = false;
    async function restore() {
      if (!hasSessionHint()) return setStatus("anonymous");
      try {
        if (await refreshSession()) {
          const me = await getMe();
          if (cancelled) return;
          setUser(me);
          return setStatus("authenticated");
        }
      } catch {
        /* sin sesión válida */
      }
      if (!cancelled) setStatus("anonymous");
    }
    void restore();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setUser(await apiLogin(email, password));
    setStatus("authenticated");
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      /* aunque falle la red, cerramos la sesión de este navegador */
    }
    setUser(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo(() => ({ status, user, login, logout }), [status, user, login, logout]);
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
