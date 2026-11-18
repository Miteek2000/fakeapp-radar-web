"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { buttonStyles } from "./buttons";

export function HeaderNav() {
  const router = useRouter();
  const { status, user, logout } = useAuth();

  async function onLogout() {
    await logout();
    router.push("/");
  }

  return (
    <nav className="flex items-center gap-2 text-sm font-medium text-muted sm:gap-6">
      <Link href="/#como-funciona" className="hidden hover:text-ink sm:inline">
        Paso a paso
      </Link>
      {status === "authenticated" && user ? (
        <>
          <Link href="/historial" className="hover:text-ink">
            Historial
          </Link>
          <span className="hidden max-w-[180px] truncate sm:inline" title={user.email}>
            {user.email}
          </span>
          <button type="button" onClick={onLogout} className={buttonStyles("secondary", "px-4 py-2")}>
            Salir
          </button>
        </>
      ) : (
        // Mientras carga (status "loading") mostramos lo mismo que a un visitante: sin saltos feos.
        <Link href="/login" className={buttonStyles("secondary", "px-4 py-2")}>
          Iniciar sesión
        </Link>
      )}
    </nav>
  );
}
