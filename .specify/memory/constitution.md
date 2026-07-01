<!--
Sync Impact Report:
- Version change: 1.1.0 → 2.0.0
- Modified principles: 
  - I. Seguridad clínica primero (Updated LLM to Gemini)
  - V. Simplicidad y Offline-first (Merged simplicity and offline-first)
- Added sections:
  - III. Experiencia en Tiempo Real (Streaming)
- Removed sections: Ninguno (Merged old IV and V)
- Templates requiring updates: 
  - .specify/templates/plan-template.md (✅ updated)
- Follow-up TODOs: 
  - Update spec.md, plan.md and tasks.md to reflect Gemini API streaming.
-->

# MEDIQ Perú AI Constitution

## Core Principles

### I. Seguridad clínica primero (Safety-first)
La clasificación de urgencia (nivel_atencion) SIEMPRE la determina el motor de reglas determinístico, nunca el LLM. El LLM (Google Gemini API) está prohibido de emitir diagnósticos de enfermedades; solo explica factores de riesgo y signos de alarma detectados por las reglas. Cualquier salida de Gemini debe pasar un filtro de palabras de diagnóstico.

### II. Reglas antes que IA (Rules-over-AI)
Toda lógica de priorización (Emergencia/Prioritario/Consulta/Autocuidado) se implementa como funciones puras y testeables en el backend.

### III. Experiencia en Tiempo Real (Streaming)
Las respuestas de la IA (explicación, resumen, traducción) deben servirse a la interfaz de usuario en tiempo real utilizando el soporte de streaming nativo de la API de Gemini, mejorando la percepción de velocidad y la UX del técnico de salud.

### IV. Fidelidad de Diseño (Stitch MCP)
Todo el desarrollo del frontend debe basarse estrictamente en los diseños alojados en Stitch bajo el nombre "MEDIQIA". Es obligatorio utilizar el Model Context Protocol (MCP) para conectarse a Stitch, leer estos diseños y plasmarlos fielmente en React + Tailwind.

### V. Simplicidad y Offline-first
Preferir soluciones simples (SQLite local). La app debe funcionar offline para registro y clasificación; solo el uso de Gemini y la sincronización requieren red.

### VI. Trazabilidad y observabilidad
Cada evaluación debe quedar auditable (reglas disparadas, prompt enviado a Gemini, respuesta).

### VII. Accesibilidad bilingüe
Soporte de español y quechua como ciudadanos de primera clase.

### VIII. Test-first para lógica crítica
El motor de reglas de triaje debe tener tests pasando en verde antes de usarse.

## Gobernanza

- Todos los Pull Requests (PRs) y revisiones deben verificar el cumplimiento de estos principios.
- Cualquier modificación a estos principios requiere documentación, aprobación y un plan de migración.
- El uso de Gemini será monitoreado para asegurar que cumple las reglas de "Safety-first" y "Rules-over-AI".
- Las interfaces de usuario deben ser validadas contra los diseños de Stitch antes de ser aceptadas.

**Version**: 2.0.0 | **Ratified**: 2026-07-01 | **Last Amended**: 2026-07-01
