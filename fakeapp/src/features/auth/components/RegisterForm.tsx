"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError, register } from "@/shared/api/client";
import { buttonStyles } from "@/shared/components/buttons";
import { useAuth } from "../AuthProvider";
import { AuthCard } from "./AuthCard";
import { Field } from "./Field";

const MIN_PASSWORD = 10;

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < MIN_PASSWORD) {
      return setError(`La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.`);
    }
    if (password !== confirm) return setError("Las contraseñas no coinciden.");

    setBusy(true);
    setError(null);
    try {
      await register(email.trim(), password);
      await login(email.trim(), password); // entra directo tras crear la cuenta
      router.push("/historial");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Algo salió mal. Inténtalo de nuevo.");
      setBusy(false);
    }
  }

  return (
    <AuthCard
      title="Crea tu cuenta"
      subtitle="Guarda el historial de los APK que revisaste. Es gratis y no necesitas dar más datos."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-brand hover:underline">
            Inicia sesión
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
          autoComplete="new-password"
          required
          hint={`Mínimo ${MIN_PASSWORD} caracteres. Una frase larga es mejor que una palabra rara.`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Field
          label="Repite la contraseña"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && (
          <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm font-medium text-danger">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !email || !password || !confirm}
          className={buttonStyles("primary", "w-full")}
        >
          {busy ? "Creando cuenta…" : "Crear cuenta"}
        </button>
      </form>
    </AuthCard>
  );
}
