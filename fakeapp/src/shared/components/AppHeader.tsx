import Link from "next/link";
import { Radar } from "lucide-react";
import { APP_NAME } from "@/shared/config";
import { HeaderNav } from "./HeaderNav";

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
          {APP_NAME}
        </Link>

        {fileName ? (
          <span className="flex max-w-[45%] sm:max-w-[55%] items-center gap-2 rounded-full">
          </span>
        ) : (
          <HeaderNav />
        )}
      </div>
    </header>
  );
}
