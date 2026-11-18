import type { Severity } from "@/shared/api/types";

export interface SeverityStyle {
  label: string;
  plural: string;
  chip: string; // etiqueta "Peligroso"
  iconBox: string; // círculo del icono
  card: string; // borde de la tarjeta
  stat: string; // color de acento
}

export const SEVERITY: Record<Severity, SeverityStyle> = {
  peligroso: {
    label: "Peligroso",
    plural: "Peligrosos",
    chip: "bg-danger-soft text-danger",
    iconBox: "bg-danger-soft text-danger",
    card: "border-danger/25",
    stat: "text-danger",
  },
  atencion: {
    label: "Atención",
    plural: "Atención",
    chip: "bg-warn-soft text-warn",
    iconBox: "bg-warn-soft text-warn",
    card: "border-transparent",
    stat: "text-warn",
  },
  normal: {
    label: "Normal",
    plural: "Normales",
    chip: "bg-ok-soft text-ok",
    iconBox: "bg-ok-soft text-ok",
    card: "border-transparent",
    stat: "text-ok",
  },
};

export const SEVERITY_ORDER: Severity[] = ["peligroso", "atencion", "normal"];
