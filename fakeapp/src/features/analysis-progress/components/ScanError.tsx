import Link from "next/link";
import { SearchX, TriangleAlert, WifiOff } from "lucide-react";
import { buttonStyles } from "@/shared/components/buttons";

type Phase = "failed" | "not_found" | "unreachable";

const COPY = {
  failed: { title: "No pudimos analizar este archivo", Icon: TriangleAlert },
  not_found: { title: "No encontramos ese análisis", Icon: SearchX },
  unreachable: { title: "No hay conexión con el servidor", Icon: WifiOff },
} as const;

export function ScanError({ phase, message }: { phase: Phase; message: string }) {
  const { title, Icon } = COPY[phase];

  return (
    <section role="alert" className="w-full max-w-md rounded-3xl bg-surface p-8 text-center shadow-card">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-danger-soft text-danger">
        <Icon className="size-8" aria-hidden />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>
      <Link href="/" className={buttonStyles("primary", "mt-6")}>
        Probar con otro archivo
      </Link>
    </section>
  );
}
