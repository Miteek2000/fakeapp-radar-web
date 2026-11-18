"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/shared/api/client";
import { buttonStyles } from "@/shared/components/buttons";
import { useAuth } from "../AuthProvider";
import { AuthCard } from "./AuthCard";
import { Field } from "./Field";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email.trim(), password);
      router.push("/historial");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Algo salió mal. Inténtalo de nuevo.");
      setBusy(false);
    }
  }

  return (
    <AuthCard
      title="Inicia sesión"
      subtitle="Entra para guardar tus análisis y verlos cuando quieras."
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="font-semibold text-brand hover:underline">
            Crear una
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="Correo"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm font-medium text-danger">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy || !email || !password} className={buttonStyles("primary", "w-full")}>
          {busy ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </AuthCard>
  );
}
