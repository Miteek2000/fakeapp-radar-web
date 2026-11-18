import type { PermissionFinding } from "@/shared/api/types";
import { cn } from "@/shared/lib/cn";
import { PermissionIcon } from "./PermissionIcon";
import { shortPermissionName } from "../lib/report";
import { SEVERITY } from "../lib/severity";

export function PermissionCard({ permission }: { permission: PermissionFinding }) {
  const style = SEVERITY[permission.severity];

  return (
    <li className={cn("flex flex-col rounded-3xl border bg-surface p-6 shadow-card", style.card)}>
      <div className="flex items-start justify-between gap-3">
        <span className={cn("grid size-12 place-items-center rounded-full", style.iconBox)}>
          <PermissionIcon name={permission.icon} className="size-5" />
        </span>
        {permission.known ? (
          <span className={cn("rounded-full px-3 py-1 text-xs font-bold", style.chip)}>{style.label}</span>
        ) : (
          <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-muted">Sin clasificar</span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug">{permission.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{permission.explanation}</p>
      <code className="mt-4 w-fit max-w-full truncate rounded-md bg-canvas px-2 py-1 text-xs font-medium text-muted">
        {shortPermissionName(permission.android_name)}
      </code>
    </li>
  );
}
