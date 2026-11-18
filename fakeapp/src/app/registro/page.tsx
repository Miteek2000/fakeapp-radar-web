import type { Metadata } from "next";
import { APP_NAME } from "@/shared/config";
import { AppHeader } from "@/shared/components/AppHeader";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = { title: `Crear cuenta · ${APP_NAME}` };

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
