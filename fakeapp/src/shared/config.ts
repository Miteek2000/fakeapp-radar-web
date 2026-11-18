/** Nombre público de la aplicación: se cambia aquí y se actualiza en toda la web. */
export const APP_NAME = "APK Radar";

/** Límite que se avisa en pantalla; el servidor igual lo vuelve a validar. */
export const MAX_UPLOAD_MB = Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_MB ?? 100);
