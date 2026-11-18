import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { APP_NAME } from "@/shared/config";
import { AuthProvider } from "@/features/auth";

export const metadata: Metadata = {
  title: APP_NAME,
  description:
    "Revisa un APK antes de instalarlo. Te explicamos sus permisos en español, sin tecnicismos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="flex min-h-full flex-col"><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
