// Archivo de PRÁCTICA: cada línea MALO debe dispararse una regla. No forma parte de la app.
export function Malo({ html }: { html: string }) {
  localStorage.setItem("access_token", html);          // MALO: token en localStorage
  document.body.innerHTML = html;                       // MALO: innerHTML
  eval(html);                                           // MALO: eval
  const apiKey = "abc123";                              // MALO: secreto en código
  const url = "http://ejemplo.com/api";                 // MALO: http sin TLS
  const k = process.env.NEXT_PUBLIC_API_KEY;            // MALO: clave pública
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <a href="https://x.com" target="_blank">externo</a>
      {apiKey}{url}{k}
    </div>
  );
}
