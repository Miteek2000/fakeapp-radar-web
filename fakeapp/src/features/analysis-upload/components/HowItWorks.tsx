const STEPS = [
  { title: "Sube el APK", text: "Arrástralo o elígelo desde tu celular." },
  { title: "Lo revisamos sin abrirlo", text: "Lo desarmamos en un espacio aislado, sin internet." },
  { title: "Te explicamos el riesgo", text: "Un semáforo y cada permiso en palabras simples." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto w-full max-w-[1440px] scroll-mt-6 px-5 pb-16 sm:px-10 lg:px-20">
      <h2 className="sr-only">Paso a paso</h2>
      <ol className="grid gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex items-start gap-4 rounded-2xl bg-surface p-5 shadow-card">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <p className="font-bold">{step.title}</p>
              <p className="mt-1 text-sm text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
