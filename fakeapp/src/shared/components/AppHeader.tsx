import Link from "next/link";
import { Radar, Smartphone } from "lucide-react";

interface AppHeaderProps {
  fileName?: string;
}

export function AppHeader({ fileName }: AppHeaderProps) {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex h-[75px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-20">
        <Link href="/" className="flex items-center gap-3 whitespace-nowrap text-lg font-bold">
          <span className="grid size-[38px] place-items-center rounded-[10px] bg-brand text-white">
            <Radar className="size-5" aria-hidden />
          </span>
          FakeApp Radar
        </Link>

        {fileName ? (
          <span className="flex max-w-[45%] sm:max-w-[55%] items-center gap-2 rounded-full">
          </span>
        ) : (
          <nav className="flex items-center gap-2 text-sm font-medium text-muted sm:gap-6">
            <Link href="/#como-funciona" className="hidden hover:text-ink sm:inline">
              Cómo funciona
            </Link>
            <span aria-disabled="true" title="Próximamente" className="hidden cursor-not-allowed opacity-50 sm:inline">
              Historial
            </span>
            <span
              aria-disabled="true"
              title="Próximamente"
              className="cursor-not-allowed rounded-full border border-line px-4 py-2 text-ink opacity-50"
            >
              Iniciar sesión
            </span>
          </nav>
        )}
      </div>
    </header>
  );
}
