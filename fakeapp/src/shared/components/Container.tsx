import { cn } from "@/shared/lib/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-20", className)}>{children}</div>
  );
}
