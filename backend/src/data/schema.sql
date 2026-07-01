CREATE TABLE IF NOT EXISTS pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edad INTEGER NOT NULL,
    sexo TEXT NOT NULL,
    distrito TEXT NOT NULL,
    idioma TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evaluaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER,
    temperatura REAL,
    presion_sistolica INTEGER,
    presion_diastolica INTEGER,
    fr INTEGER,
    fc INTEGER,
    spo2 INTEGER,
    dolor_toracico INTEGER DEFAULT 0,
    convulsiones INTEGER DEFAULT 0,
    embarazo INTEGER DEFAULT 0,
    nota TEXT,
    nivel_atencion TEXT NOT NULL,
    explicacion TEXT,
    resumen TEXT,
    explicacion_quechua TEXT,
    resumen_quechua TEXT,
    referencia_pdf_path TEXT,
    synced INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(paciente_id) REFERENCES pacientes(id)
);
