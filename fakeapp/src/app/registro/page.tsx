import type { Metadata } from "next";
import { AppHeader } from "@/shared/components/AppHeader";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = { title: "Crear cuenta · FakeApp Radar" };

export default function RegisterPage() {
  return (
    <>
      <AppHeader />
      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <RegisterForm />
      </main>
    </>
  );
}
