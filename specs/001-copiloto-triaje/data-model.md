# Modelos de Datos

**Base de datos principal**: SQLite (`better-sqlite3`) para asegurar una instalación rápida y funcionamiento "offline-first".

## 1. Tabla `pacientes`

Guarda la información demográfica básica del paciente que llega al establecimiento de salud.

| Columna | Tipo | Descripción | Restricción |
|---|---|---|---|
| `id` | INTEGER | Identificador único local | PRIMARY KEY, AUTOINCREMENT |
| `nombre` | TEXT | Nombre completo del paciente | NOT NULL |
| `edad` | INTEGER | Edad en años | NOT NULL |
| `sexo` | TEXT | 'Masculino', 'Femenino' | NOT NULL |
| `distrito` | TEXT | Lugar de procedencia | NOT NULL |
| `idioma` | TEXT | 'Español', 'Quechua' u otro | NOT NULL |
| `created_at` | DATETIME | Fecha de registro | DEFAULT CURRENT_TIMESTAMP |

## 2. Tabla `evaluaciones`

Almacena la captura de signos vitales, el resultado determinístico del triaje, y de manera asíncrona (opcional) las explicaciones generadas por la IA.

| Columna | Tipo | Descripción | Restricción |
|---|---|---|---|
| `id` | INTEGER | Identificador de la evaluación | PRIMARY KEY, AUTOINCREMENT |
| `paciente_id` | INTEGER | Llave foránea hacia `pacientes` | FOREIGN KEY |
| `temperatura` | REAL | Temperatura en °C | Opcional |
| `presion_sistolica`| INTEGER | Presión Sistólica (mmHg) | Opcional |
| `presion_diastolica`| INTEGER | Presión Diastólica (mmHg) | Opcional |
| `fr` | INTEGER | Frecuencia respiratoria (rpm) | Opcional |
| `fc` | INTEGER | Frecuencia cardíaca (lpm) | Opcional |
| `spo2` | INTEGER | Saturación de oxígeno (%) | Opcional |
| `dolor_toracico` | INTEGER | Booleano (1=Sí, 0=No) | DEFAULT 0 |
| `convulsiones` | INTEGER | Booleano (1=Sí, 0=No) | DEFAULT 0 |
| `embarazo` | INTEGER | Booleano (1=Sí, 0=No) | DEFAULT 0 |
| `nota` | TEXT | Anotación libre o motivo | Opcional |
| `nivel_atencion` | TEXT | 'Emergencia', 'Prioritario', 'Consulta', 'Autocuidado' | NOT NULL (Dictado por triageEngine) |
| `explicacion` | TEXT | Justificación dada por LLM | Opcional |
| `resumen` | TEXT | Resumen corto del LLM | Opcional |
| `explicacion_quechua` | TEXT| Traducción de la explicación | Opcional |
| `resumen_quechua` | TEXT | Traducción del resumen | Opcional |
| `referencia_pdf_path` | TEXT| Ruta local si el PDF fue generado | Opcional |
| `synced` | INTEGER | Booleano (0=Local, 1=Sincronizado a Firebase) | DEFAULT 0 |
| `created_at` | DATETIME | Fecha y hora de evaluación | DEFAULT CURRENT_TIMESTAMP |
