import type { Metadata } from "next";
import { APP_NAME } from "@/shared/config";
import { AppHeader } from "@/shared/components/AppHeader";
import { Container } from "@/shared/components/Container";
import { HistoryList } from "@/features/history";

export const metadata: Metadata = { title: `Historial · ${APP_NAME}` };

export default function HistoryPage() {
  return (
    <>
      <AppHeader />
      <main className="flex-1 py-10">
        <Container>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Tu historial</h1>
          <p className="mt-2 text-base text-muted">Los APK que analizaste con tu cuenta, del más reciente al más antiguo.</p>
          <HistoryList />
        </Container>
      </main>
    </>
  );
}
