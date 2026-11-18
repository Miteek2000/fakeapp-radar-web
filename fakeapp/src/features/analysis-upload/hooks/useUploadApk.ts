"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, createAnalysis } from "@/shared/api/client";
import { validateApk } from "../lib/validate";

export function useUploadApk() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    const problem = validateApk(file);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const created = await createAnalysis(file);
      router.push(`/analisis/${created.id}`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Algo salió mal. Inténtalo de nuevo.");
      setUploading(false);
    }
  }

  return { upload, uploading, error };
}
