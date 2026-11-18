import { useId } from "react";

interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  hint?: string;
}

export function Field({ label, hint, ...input }: FieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-brand"
        {...input}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
