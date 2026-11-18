"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, ShieldCheck, Upload } from "lucide-react";
import { MAX_UPLOAD_MB } from "@/shared/config";
import { buttonStyles } from "@/shared/components/buttons";
import { cn } from "@/shared/lib/cn";
import { useUploadApk } from "../hooks/useUploadApk";

export function ApkDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const { upload, uploading, error } = useUploadApk();

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) void upload(file);
    // Permite volver a elegir el mismo archivo (si no, el navegador no dispara onChange).
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="rounded-3xl bg-surface p-5 shadow-card">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
          dragging ? "border-brand bg-brand-soft" : "border-brand/40 bg-brand-soft/50",
        )}
      >
        <motion.span
          animate={uploading ? { rotate: 360 } : { y: [0, -4, 0] }}
          transition={uploading ? { repeat: Infinity, duration: 1.2, ease: "linear" } : { repeat: Infinity, duration: 2.4 }}
          className="grid size-14 place-items-center rounded-full bg-surface text-brand shadow-card"
        >
          {uploading ? <LoaderCircle className="size-6" aria-hidden /> : <Upload className="size-6" aria-hidden />}
        </motion.span>

        <p className="mt-4 text-lg font-bold">{uploading ? "Subiendo tu archivo…" : "Suelta tu APK aquí"}</p>
        <p className="mt-1 text-sm text-muted">o toca para elegirlo desde tu dispositivo</p>

        <input
          ref={inputRef}
          type="file"
          accept=".apk"
          className="sr-only"
          aria-label="Elegir archivo APK"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className={buttonStyles("primary", "mt-5")}
        >
          Elegir archivo
        </button>
      </div>

      <p role="alert" className={cn("mt-3 text-center text-sm font-medium text-danger", !error && "hidden")}>
        {error}
      </p>

      <div className="mt-4 flex flex-col items-center gap-2 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5" aria-hidden />
          Límite {MAX_UPLOAD_MB} MB
        </span>
      </div>
    </div>
  );
}
