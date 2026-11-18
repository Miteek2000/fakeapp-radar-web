import { Ban, Check, Eye } from "lucide-react";
import type { AnalysisReport, VirusTotalInfo } from "@/shared/api/types";
import { formatSize } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import { RISK } from "../lib/risk";
import { SEVERITY } from "../lib/severity";
import { RiskGauge } from "./RiskGauge";

type PillTone = "warn" | "danger" | "ok" | "muted";

const PILL_TONE: Record<PillTone, { box: string; text: string }> = {
  warn: { box: "bg-warn-soft", text: "text-warn" },
  danger: { box: "bg-danger-soft", text: "text-danger" },
  ok: { box: "bg-ok-soft", text: "text-ok" },
  muted: { box: "bg-canvas", text: "text-muted" },
};

function Pill({ label, value, tone = "warn", hint, href }: { label: string; value: string; tone?: PillTone; hint?: string; href?: string }) {
  const style = PILL_TONE[tone];
  return (
    <div className={cn("rounded-xl px-4 py-3", style.box)}>
      <p className="text-xs text-muted">{label}</p>
      <p className={cn("mt-0.5 text-lg font-bold", style.text)}>{value}</p>
      {hint && <p className="mt-1 text-xs leading-snug text-muted">{hint}</p>}
      {href && (
        <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs font-semibold text-muted underline underline-offset-2">
          Ver en VirusTotal
        </a>
      )}
    </div>
  );
}

/** Tarjeta de VirusTotal según el estado de la consulta (solo se consulta el SHA-256 del archivo). */
function VirusTotalPill({ vt }: { vt: VirusTotalInfo | null }) {
  if (vt === null) {
    return <Pill label="VirusTotal" value="No consultado" tone="muted" />;
  }
  switch (vt.status) {
    case "pending":
      return <Pill label="VirusTotal" value="Consultando…" tone="muted" />;
    case "found": {
      const bad = vt.malicious ?? 0;
      return (
        <Pill
          label="VirusTotal"
          value={`${bad} de ${vt.total ?? 0} antivirus`}
          tone={bad > 0 ? "danger" : "ok"}
          hint={bad > 0 ? "lo marcan como peligroso" : "no lo marcan como peligroso"}
          href={vt.url}
        />
      );
    }
    case "not_found":
      return (
        <Pill
          label="VirusTotal"
          value="Sin registro"
          tone="muted"
          hint="Nunca lo habían visto. Eso no significa que sea seguro."
        />
      );
    default:
      return <Pill label="VirusTotal" value="No disponible" tone="muted" hint="No pudimos consultarlo ahora." />;
  }
}

function StatCard({
  count,
  label,
  tone,
  Icon,
}: {
  count: number;
  label: string;
  tone: { iconBox: string };
  Icon: typeof Ban;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
      <span className={cn("grid size-[52px] shrink-0 place-items-center rounded-full", tone.iconBox)}>
        <Icon className="size-6" aria-hidden />
      </span>
      <div>
        <p className="text-3xl font-extrabold leading-none">{count}</p>
        <p className="mt-1 text-sm font-medium text-muted">{label}</p>
      </div>
    </div>
  );
}

export function SummaryView({ report, virustotal }: { report: AnalysisReport; virustotal: VirusTotalInfo | null }) {
  const tone = RISK[report.risk_level];
  const { counts } = report;

  return (
    <div className="space-y-6">
      <section className="grid items-center gap-8 rounded-[32px] bg-surface p-6 shadow-card sm:p-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
        <RiskGauge score={report.risk_score} level={report.risk_level} />

        <div>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            <span className={cn("rounded-full px-3 py-1 text-xs font-bold uppercase", tone.soft, tone.text)}>
              {tone.badge}
            </span>
            {formatSize(report.size_bytes)}
            {report.version_name && <> · versión {report.version_name}</>}
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.1]">{tone.headline}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{tone.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <VirusTotalPill vt={virustotal} />
            {/* La firma digital llega en una fase posterior. */}
            <Pill label="Firma digital" value="Próximamente" tone="muted" />
            <Pill
              label="Permisos peligrosos"
              value={`${counts.peligroso} de ${report.permissions.length}`}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Conteo de permisos">
        <StatCard
          count={counts.peligroso}
          label={counts.peligroso === 1 ? "permiso peligroso" : "permisos peligrosos"}
          tone={SEVERITY.peligroso}
          Icon={Ban}
        />
        <StatCard
          count={counts.atencion}
          label={counts.atencion === 1 ? "permiso que pide atención" : "permisos que piden atención"}
          tone={SEVERITY.atencion}
          Icon={Eye}
        />
        <StatCard
          count={counts.normal}
          label={counts.normal === 1 ? "permiso normal" : "permisos normales"}
          tone={SEVERITY.normal}
          Icon={Check}
        />
      </section>
    </div>
  );
}
