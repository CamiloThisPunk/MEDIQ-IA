# Tasks: Copiloto de Orientación Clínica (Triaje)

**Input**: Design documents from `specs/001-copiloto-triaje/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/endpoints.md

## Phase 1: Setup & Foundational

**Purpose**: Inicialización del proyecto backend y frontend, configuración de dependencias y base de datos local SQLite.

- [x] T001 Inicializar proyecto Node.js Express en `backend/` e instalar dependencias base (express, cors, better-sqlite3, dotenv).
- [x] T002 Inicializar proyecto React+Vite con Tailwind CSS en `frontend/` e instalar dependencias (axios, react-router-dom, tailwindcss, vite).
- [x] T003 [P] Crear el script de conexión a SQLite en `backend/src/data/db.js`.
- [x] T004 [P] Crear el esquema de tablas (Pacientes y Evaluaciones) según `data-model.md` en `backend/src/data/schema.sql` y script de inicialización.
- [x] T005 Instalar dependencias para IA (`@google/genai` o SDK oficial de Gemini) en `backend/`.

---

## Phase 2: Motor de Reglas (Test-First) - [US3]

**Purpose**: Implementar la lógica determinística de clasificación de urgencia sin dependencias externas, validando rigurosamente los casos clínicos (Seguridad Clínica).

- [x] T006 [P] [US3] Escribir tests unitarios en `backend/tests/triageEngine.test.js` para los casos base: SpO2<90→Emergencia, fiebre+FR alta→Prioritario, etc.
- [x] T007 [P] [US3] Implementar función pura `clasificar(vitals)` en `backend/src/core/triageEngine.js` que satisfaga todos los casos de prueba.

---

## Phase 3: Endpoints Backend Core (Sin IA) - [US1] [US2]

**Purpose**: Crear los endpoints requeridos para registro y triaje, garantizando funcionamiento "Offline-First".

- [x] T008 [P] [US1] Implementar endpoint POST `/api/pacientes` y GET `/api/pacientes/:id` en `backend/src/api/routes.js`.
- [x] T009 [US2] Implementar endpoint POST `/api/evaluaciones` que guarde en BD el resultado de `triageEngine.js` y devuelva 200 OK **sin esperar** a la IA.
- [x] T010 [US2] Implementar endpoint GET `/api/evaluaciones/:id`.

---

## Phase 4: Integración Gemini API (Streaming) - [US4] [US5] [US7]

**Purpose**: Habilitar explicaciones y traducciones utilizando Google Gemini API mediante Server-Sent Events (SSE).

- [x] T011 [P] [US4] [US5] Configurar `backend/src/core/geminiService.js` inicializando el SDK de Google Gemini.
- [x] T012 [P] [US4] [US5] Crear la función generadora `explicarNivelStream()` en `geminiService.js` empleando `.streamGenerateContent()` para devolver los chunks.
- [x] T013 [P] [US4] Implementar el filtro anti-diagnóstico `filtrarChunk()` en `geminiService.js` que se aplique sobre el flujo continuo de texto.
- [x] T014 [US4] Implementar el endpoint SSE `GET /api/evaluaciones/:id/explicacion/stream` en `backend/src/api/routes.js` que consuma el generador y emita `data: {"chunk": "..."}`.
- [x] T015 [US7] Implementar endpoint SSE `POST /api/traducir/stream` para quechua de manera análoga.

---

## Phase 5: Generación de PDF (Carta de Referencia) - [US6]

**Purpose**: Emitir la carta formal para derivaciones médicas directamente desde Node.js.

- [x] T016 [P] [US6] Instalar `pdfkit` en el backend.
- [x] T017 [P] [US6] Implementar la lógica y endpoint GET `/api/evaluaciones/:id/referencia` que retorne el binario del PDF.

---

## Phase 6: Frontend & MCP Stitch (Tiempo Real) - [US1] [US2] [US4] [US5] [US6] [US7]

**Purpose**: Construir la UI conectando con los diseños de Stitch ("MEDIQIA") e implementando el consumo de streams SSE.

- [x] T018 [P] [US1] [US3] Conectarse vía MCP a Stitch (`list_projects`, `get_project` etc.) para buscar, procesar y descargar componentes/estilos del proyecto "MEDIQIA".
- [x] T019 [US1] [US2] Plasmar `PatientForm.jsx` y `TriageForm.jsx` exactamente como dictan los diseños de Stitch.
- [x] T020 [US4] [US5] Plasmar `ResultView.jsx` y escribir custom hook (`useGeminiStream`) para consumir el endpoint SSE y generar el efecto máquina de escribir.
- [x] T021 [US6] [US7] Implementar botones para descargar PDF y solicitar traducción.
- [x] T022 [US1] Ensamblar el flujo en `App.jsx` (Paso 1 → Paso 2 → Paso 3).

---

### Bloque 7: Pruebas End-to-End y Ajustes Finales

**Purpose**: Validar el sistema completo como lo usaría un técnico en la posta médica.

- [x] T023 [P] [US1-US7] Levantar backend y frontend simultáneamente.
- [x] T024 [P] Registrar un paciente de prueba ("Carlos Vargas", Urubamba).
- [x] T025 [P] Registrar signos vitales de emergencia (SpO2: 85%) y verificar que el resultado se renderiza instantáneamente ("Emergencia").
- [x] T026 [P] Verificar que el stream de Gemini funciona (el texto de explicación fluye dinámicamente sin bloquear el nivel de atención).
- [x] T027 [P] Descargar la carta PDF de referencia y validar que la traducción al Quechua opere correctamente.
- [x] T028 Probar Offline-First simulando que Gemini no responde; verificar que el `POST` (Fase 3) sí logró clasificar al paciente exitosamente.

---

## Dependencies & Parallel Opportunities

- **Fase 2 (Motor de Reglas)**, **Fase 5 (PDF)** y las primeras tareas de la **Fase 6 (Frontend MCP)** están marcadas con `[P]` y pueden paralelizarse sin bloquearse entre sí.
- La **Fase 4 (Streaming SSE)** necesita que el `id` de la evaluación exista (Fase 3 completada).
- El custom hook de streaming en la **Fase 6 (T020)** necesita el endpoint `/stream` de la Fase 4 activo para pruebas empíricas.
