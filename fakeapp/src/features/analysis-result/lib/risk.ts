import type { RiskLevel } from "@/shared/api/types";

export interface RiskCopy {
  badge: string;
  headline: string;
  description: string;
  text: string; // color del texto/acento
  soft: string; // fondo suave
  stroke: string; // color del medidor
}

/** Textos y colores de cada nivel (el nivel lo calcula la API). */
export const RISK: Record<RiskLevel, RiskCopy> = {
  alto: {
    badge: "Riesgo alto",
    headline: "Mejor no instales esta app",
    description:
      "Pide permisos muy delicados que podrían usarse para robar tus códigos de verificación y tus contraseñas.",
    text: "text-danger",
    soft: "bg-danger-soft",
    stroke: "stroke-danger",
  },
  medio: {
    badge: "Riesgo medio",
    headline: "Revísala bien antes de instalar",
    description:
      "Pide algunos permisos que conviene vigilar. Instálala solo si confías en quien te la mandó.",
    text: "text-warn",
    soft: "bg-warn-soft",
    stroke: "stroke-warn",
  },
  bajo: {
    badge: "Riesgo bajo",
    headline: "No vimos señales de alarma",
    description:
      "No encontramos permisos preocupantes. Aun así, descarga las apps solo de tiendas oficiales.",
    text: "text-ok",
    soft: "bg-ok-soft",
    stroke: "stroke-ok",
  },
};

export interface AdviceStep {
  title: string;
  text: string;
  icon: "ban" | "trash" | "store" | "search" | "refresh";
}

/** Los tres pasos de la vista "Qué hacer", según el nivel. */
export function getAdvice(level: RiskLevel): AdviceStep[] {
  if (level === "bajo") {
    return [
      { icon: "search", title: "Confirma de dónde viene", text: "Asegúrate de que te la mandó alguien de confianza o el desarrollador oficial." },
      { icon: "store", title: "Prefiere la tienda oficial", text: "Si la app existe en Google Play, instálala desde ahí para recibir actualizaciones." },
      { icon: "refresh", title: "Revisa lo que pide al abrir", text: "Si te pide algo que no tiene sentido para lo que hace, niégalo." },
    ];
  }
  return [
    {
      icon: "ban",
      title: level === "alto" ? "No la instales" : "Piénsalo antes de instalar",
      text: "Aunque venga de alguien que conoces: pudo haber sido modificada.",
    },
    { icon: "trash", title: "Borra el archivo .apk", text: "Elimínalo de Descargas y de cualquier chat donde te lo hayan mandado." },
    { icon: "store", title: "Descarga solo de Google Play", text: "Si necesitas la app, búscala en la tienda oficial y revisa al desarrollador." },
  ];
}

export const ALREADY_INSTALLED = [
  { icon: "trash", text: "Desinstálala de inmediato" },
  { icon: "lock", text: "Cambia las contraseñas de tu banca" },
  { icon: "shield", text: "Avisa a tu banco si hiciste operaciones" },
] as const;
