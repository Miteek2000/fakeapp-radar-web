import { ShieldCheck } from "lucide-react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <section className="w-full max-w-md rounded-3xl bg-surface p-8 shadow-card">
      <span className="grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
        <ShieldCheck className="size-7" aria-hidden />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
      <div className="mt-6">{children}</div>
      <p className="mt-6 text-center text-sm text-muted">{footer}</p>
    </section>
  );
}
