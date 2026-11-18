import { Check, ShieldCheck } from "lucide-react";
import { ApkDropzone } from "./ApkDropzone";

const PROMISES = [
  "Tu archivo nunca se abre ni se ejecuta",
  "Funciona desde el navegador de tu celular",
  "Cada riesgo viene explicado en español",
];

export function HeroSection() {
  return (
    <section className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 py-12 sm:px-10 lg:grid-cols-2 lg:px-20 lg:py-20">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">
          <ShieldCheck className="size-3.5" aria-hidden />
          Gratis · Sin instalar nada
        </span>

        <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          Revisa un APK <span className="text-brand">antes de instalarlo</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
          Sube el archivo y te decimos en menos de un minuto si es seguro, con palabras de todos los días. Sin
          términos raros.
        </p>

        <ul className="mt-6 space-y-2.5">
          {PROMISES.map((text) => (
            <li key={text} className="flex items-center gap-3 text-sm font-medium">
              <span className="grid size-5 place-items-center rounded-full bg-ok-soft text-ok">
                <Check className="size-3" aria-hidden />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <ApkDropzone />
    </section>
  );
}
