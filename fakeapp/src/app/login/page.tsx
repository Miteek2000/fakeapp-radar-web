import type { Metadata } from "next";
import { AppHeader } from "@/shared/components/AppHeader";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = { title: "Iniciar sesión · FakeApp Radar" };

export default function LoginPage() {
  return (
    <>
      <AppHeader />
      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <LoginForm />
      </main>
    </>
  );
}
