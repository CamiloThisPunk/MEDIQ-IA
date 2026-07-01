# Specification: Copiloto de Orientación Clínica (Triaje)

## 1. Description
Un "Copiloto de Orientación Clínica" diseñado para técnicos de salud en postas rurales del Perú. El usuario registra un paciente, captura sus signos vitales y síntomas, y el sistema clasifica automáticamente el nivel de urgencia mediante un motor de reglas clínicas determinístico (fijas, no IA). A partir de allí, utiliza la API de Gemini para generar una explicación, un resumen clínico y ofrecer traducción al quechua, mostrándolos en pantalla en tiempo real (efecto máquina de escribir) mientras se generan. Además emite una carta formal en PDF. Todo el aspecto visual de la aplicación (interfaz de usuario) debe extraerse y ser un reflejo exacto de los diseños alojados en Stitch bajo el nombre "MEDIQIA" vía MCP.

## 2. User Scenarios (Acceptance Criteria)

### US1: Registrar un nuevo paciente
**Como** técnico de salud, **quiero** registrar un nuevo paciente (nombre, edad, sexo, distrito, idioma) **para** iniciar una atención.
- **Given** un formulario de nuevo paciente completo y válido,
- **When** lo envío,
- **Then** el sistema crea el paciente y retorna un ID para continuar.

### US2: Capturar signos vitales y síntomas
**Como** técnico de salud, **quiero** capturar signos vitales y síntomas (temperatura, presión arterial, FR, FC, SpO2, dolor torácico, convulsiones, embarazo, motivo libre).
- **Given** un paciente ya registrado,
- **When** ingreso signos vitales válidos y los envío,
- **Then** el sistema guarda la evaluación de manera segura.
- **Given** campos numéricos inválidos,
- **When** intento enviar,
- **Then** el sistema rechaza la petición con un mensaje de error claro y amigable.

### US3: Clasificación automática de urgencia
**Como** técnico de salud, **quiero** que el sistema clasifique automáticamente el nivel de urgencia (Emergencia/Prioritario/Consulta/Autocuidado) según reglas clínicas fijas.
- **Given** SpO2 < 90% o convulsiones = Sí, **When** se evalúa, **Then** el nivel es "Emergencia".
- **Given** fiebre ≥39°C y FR > 30, **When** se evalúa, **Then** el nivel es "Prioritario".
- **Given** solo síntomas leves o signos vitales normales, **When** se evalúa, **Then** el nivel es "Consulta" o "Autocuidado".

### US4: Explicación en lenguaje simple (En Tiempo Real)
**Como** técnico de salud, **quiero** recibir una explicación en español que se muestre en tiempo real en la pantalla mientras la IA la genera, sin que emita un diagnóstico de enfermedad.
- **Given** una evaluación clasificada,
- **When** se procesa la explicación con Gemini,
- **Then** el texto va apareciendo progresivamente en la UI (streaming) y menciona factores de riesgo sin diagnosticar.

### US5: Resumen clínico breve (En Tiempo Real)
**Como** técnico de salud, **quiero** un resumen clínico breve generado y renderizado en tiempo real.

### US6: Carta de referencia en PDF
**Como** técnico de salud, **quiero** generar una carta de referencia exportable en PDF con los datos recolectados.

### US7: Traducción bilingüe (En Tiempo Real)
**Como** técnico de salud, **quiero** ver las traducciones al quechua cargando dinámicamente en tiempo real mediante streaming.

## 3. Edge Cases & Constraints

**Casos Límite:**
- La API de Gemini no responde, corta el stream a la mitad, o tarda demasiado (el sistema debe manejar errores de stream gracefully, cortando la animación y mostrando un mensaje amigable o el texto parcial rescatado).
- Gemini genera texto que menciona una enfermedad específica como diagnóstico (filtrar los fragmentos problemáticos en los chunks del stream en vuelo, o cancelar el stream si es inseguro).
- No hay conexión a internet (offline-first). El sistema debe funcionar guardando todos los datos del triaje en local y asignando el nivel de urgencia exitosamente, deshabilitando o manejando graciosamente el componente de IA y Streaming.
- Datos vitales ingresados que están físicamente fuera de un rango fisiológico (activar validaciones de frontera).

**Requisitos No Funcionales (NFRs):**
- **UI/UX**: Debe coincidir 100% con los diseños "MEDIQIA" importados de Stitch (Fidelidad de Diseño).
- **Performance de IA**: La latencia para el primer token (TTFT - Time To First Token) de la IA debe ser menor a 1 segundo para garantizar una sensación de "tiempo real".
- **Performance del Sistema**: Respuesta inicial del motor de reglas en menos de 2 segundos.
- **Seguridad**: Datos sensibles protegidos por token estático o equivalente de baja fricción.
