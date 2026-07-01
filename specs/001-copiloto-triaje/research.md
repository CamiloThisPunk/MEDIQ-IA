# Technical Research & Decisions

## 1. Integración Frontend: Stitch MCP "MEDIQIA"
**Decisión**: El Frontend (React+Vite) funcionará estricta y puramente como un consumidor de las especificaciones de diseño.
**Justificación**: De acuerdo al principio "Fidelidad de Diseño", el código UI será generado o ensamblado importando los lineamientos de la herramienta Stitch mediante MCP.

## 2. Experiencia en Tiempo Real: Server-Sent Events (SSE)
**Decisión**: Utilizar SSE (`text/event-stream`) en Express en lugar de WebSockets.
**Justificación**: Las respuestas de Gemini son unidireccionales (servidor a cliente) y secuenciales. SSE es mucho más ligero de implementar en Express que WebSockets y mapea perfectamente con el concepto de stream de un LLM. React consumirá el stream usando la API nativa de `EventSource` o procesando el body con `ReadableStream`, proveyendo una actualización progresiva y una latencia percibida (TTFT) menor a 1 segundo.

## 3. Base de Datos y Modo Offline
**Decisión**: SQLite (`better-sqlite3`) y flujo en 2 pasos.
**Justificación**: Al separar el guardado determinístico en `POST /api/evaluaciones` de la explicación en `GET /api/evaluaciones/:id/explicacion/stream`, garantizamos que si el usuario pierde la conexión, el registro y triaje ocurran sin error (offline-first). El streaming de Gemini es opcional y progresivo.

## 4. Generador PDF: `pdfkit`
**Decisión**: Se utilizará `pdfkit` en el backend.
**Justificación**: Para evitar cargar el cliente de React (que debe mantenerse muy ligero y fiel a los componentes de Stitch) con lógica pesada de PDF. El endpoint `GET /.../referencia` ensamblará y devolverá el binario.
