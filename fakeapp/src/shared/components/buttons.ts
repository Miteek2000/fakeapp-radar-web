import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "secondary";

/** Clases compartidas para botones y enlaces con forma de botón. */
export function buttonStyles(variant: Variant = "primary", extra?: string): string {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" && "bg-brand text-white shadow-card hover:bg-brand-dark",
    variant === "secondary" && "border border-line bg-surface text-ink hover:bg-brand-soft",
    extra,
  );
}
