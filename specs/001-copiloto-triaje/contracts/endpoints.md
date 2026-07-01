# API Contracts

## 1. Pacientes

### `POST /api/pacientes`
- **Request**: `{ nombre, edad, sexo, distrito, idioma }`
- **Response** (200 OK): `{ id, nombre, edad, sexo, distrito, idioma, created_at }`

### `GET /api/pacientes/:id`
- **Response** (200 OK): `{ id, nombre, edad... }`

## 2. Evaluaciones (Triaje)

### `POST /api/evaluaciones`
- **Descripción**: Recibe signos vitales, ejecuta motor de reglas síncronamente y guarda todo en DB. NO espera a la IA.
- **Request**: `{ paciente_id, temperatura, fr, fc, spo2, dolor_toracico, convulsiones, embarazo, nota }`
- **Response** (200 OK): `{ id, nivel_atencion, synced }`

### `GET /api/evaluaciones/:id/explicacion/stream`
- **Descripción**: Endpoint SSE (Server-Sent Events). Invoca a Google Gemini API con `streamGenerateContent()` para explicar el nivel de atención asignado.
- **Header Cliente**: `Accept: text/event-stream`
- **Response** (Streaming):
  ```text
  data: {"chunk": "El paciente presenta "}
  
  data: {"chunk": "factores de riesgo..."}
  
  data: {"done": true}
  ```

### `GET /api/evaluaciones/:id`
- **Response** (200 OK): Objeto de evaluación con todos los campos (incluyendo explicación y resumen si ya terminaron).

### `GET /api/evaluaciones/:id/referencia`
- **Descripción**: Descarga documento binario `application/pdf` usando `pdfkit`.

## 3. Traducción Bilingüe (Streaming)

### `POST /api/traducir/stream`
- **Descripción**: Traduce dinámicamente texto en pantalla a quechua, devolviendo trozos por SSE.
- **Header Cliente**: `Accept: text/event-stream`
- **Request (Body o Query)**: `{ texto, idioma_origen, idioma_destino }`
- **Response** (Streaming):
  ```text
  data: {"chunk": "traducido chunk 1"}
  
  data: {"done": true}
  ```
