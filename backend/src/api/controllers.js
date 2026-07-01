const db = require('../data/db');
const clasificar = require('../core/triageEngine');
const { explicarNivelStream, traducirStream } = require('../core/geminiService');

exports.createPaciente = (req, res) => {
    const { nombre, edad, sexo, distrito, idioma } = req.body;
    
    if (!nombre || !edad || !sexo || !distrito || !idioma) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const stmt = db.prepare(`
        INSERT INTO pacientes (nombre, edad, sexo, distrito, idioma)
        VALUES (?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(nombre, edad, sexo, distrito, idioma);
    
    res.status(200).json({
        id: info.lastInsertRowid,
        nombre, edad, sexo, distrito, idioma
    });
};

exports.getPaciente = (req, res) => {
    const { id } = req.params;
    const paciente = db.prepare('SELECT * FROM pacientes WHERE id = ?').get(id);
    
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.status(200).json(paciente);
};

exports.getAllPacientes = (req, res) => {
    // Return all patients with their latest evaluation status
    const pacientes = db.prepare(`
        SELECT p.*, e.nivel_atencion, e.created_at as evaluacion_fecha 
        FROM pacientes p 
        LEFT JOIN evaluaciones e ON p.id = e.paciente_id 
        GROUP BY p.id 
        ORDER BY p.created_at DESC
    `).all();
    res.status(200).json(pacientes);
};

exports.createEvaluacion = (req, res) => {
    const data = req.body;
    
    if (!data.paciente_id) {
        return res.status(400).json({ error: 'paciente_id es requerido' });
    }

    const nivel_atencion = clasificar(data);

    const stmt = db.prepare(`
        INSERT INTO evaluaciones (
            paciente_id, temperatura, presion_sistolica, presion_diastolica,
            fr, fc, spo2, dolor_toracico, convulsiones, embarazo, nota, nivel_atencion
        ) VALUES (
            @paciente_id, @temperatura, @presion_sistolica, @presion_diastolica,
            @fr, @fc, @spo2, @dolor_toracico, @convulsiones, @embarazo, @nota, @nivel_atencion
        )
    `);

    const info = stmt.run({
        paciente_id: data.paciente_id,
        temperatura: data.temperatura || null,
        presion_sistolica: data.presion_sistolica || null,
        presion_diastolica: data.presion_diastolica || null,
        fr: data.fr || null,
        fc: data.fc || null,
        spo2: data.spo2 || null,
        dolor_toracico: data.dolor_toracico || 0,
        convulsiones: data.convulsiones || 0,
        embarazo: data.embarazo || 0,
        nota: data.nota || null,
        nivel_atencion
    });

    res.status(200).json({
        id: info.lastInsertRowid,
        nivel_atencion,
        synced: 0
    });
};

exports.getEvaluacion = (req, res) => {
    const { id } = req.params;
    const evaluacion = db.prepare('SELECT * FROM evaluaciones WHERE id = ?').get(id);
    
    if (!evaluacion) return res.status(404).json({ error: 'Evaluación no encontrada' });
    res.status(200).json(evaluacion);
};

// ============================================
// ENDPOINTS STREAMING (SSE) - INTEGRACIÓN GEMINI
// ============================================

exports.streamExplicacion = async (req, res) => {
    const { id } = req.params;
    
    const evaluacion = db.prepare('SELECT * FROM evaluaciones WHERE id = ?').get(id);
    if (!evaluacion) {
        return res.status(404).json({ error: 'Evaluación no encontrada' });
    }

    const paciente = db.prepare('SELECT * FROM pacientes WHERE id = ?').get(evaluacion.paciente_id);

    // 1. Configurar headers para SSE (Server-Sent Events)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Enviar headers inmediatamente

    try {
        let fullTexto = "";
        // 2. Iterar sobre el stream devuelto por Gemini
        for await (const chunk of explicarNivelStream(evaluacion, paciente)) {
            fullTexto += chunk;
            // 3. Escribir al socket el chunk serializado
            res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        }

        // 4. Guardar explicación completa en la base de datos (Trazabilidad)
        db.prepare('UPDATE evaluaciones SET explicacion = ? WHERE id = ?').run(fullTexto, id);

        // 5. Señal de finalización
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();

    } catch (error) {
        console.error("Error al procesar el stream de explicación:", error);
        res.write(`data: ${JSON.stringify({ chunk: "\n[Error procesando la IA]" })}\n\n`);
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
    }
};

exports.streamTraduccion = async (req, res) => {
    const { texto, idioma_origen, idioma_destino } = req.body;

    if (!texto) {
        return res.status(400).json({ error: 'Texto es requerido' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    try {
        for await (const chunk of traducirStream(texto, idioma_origen || 'Español', idioma_destino || 'Quechua')) {
            res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        }
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
    } catch (error) {
        console.error("Error al procesar stream de traducción:", error);
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
    }
};

const PDFDocument = require('pdfkit');

exports.getPDF = (req, res) => {
    const { id } = req.params;
    const evaluacion = db.prepare('SELECT * FROM evaluaciones WHERE id = ?').get(id);
    if (!evaluacion) return res.status(404).json({ error: 'Evaluación no encontrada' });
    
    const paciente = db.prepare('SELECT * FROM pacientes WHERE id = ?').get(evaluacion.paciente_id);

    const doc = new PDFDocument();
    let filename = `Referencia_MEDIQ_${paciente.nombre.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('CARTA DE REFERENCIA CLÍNICA (MEDIQ)', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).text(`Paciente: ${paciente.nombre}`);
    doc.fontSize(12).text(`Edad: ${paciente.edad} | Sexo: ${paciente.sexo} | Distrito: ${paciente.distrito}`);
    doc.moveDown();
    
    doc.fontSize(14).text('Signos Vitales y Síntomas:', { underline: true });
    doc.fontSize(12).text(`SpO2: ${evaluacion.spo2 || 'N/A'} %`);
    doc.text(`Frecuencia Respiratoria: ${evaluacion.fr || 'N/A'} rpm`);
    doc.text(`Temperatura: ${evaluacion.temperatura || 'N/A'} °C`);
    doc.text(`Frecuencia Cardíaca: ${evaluacion.fc || 'N/A'} lpm`);
    doc.text(`Dolor Torácico: ${evaluacion.dolor_toracico ? 'Sí' : 'No'}`);
    doc.text(`Convulsiones: ${evaluacion.convulsiones ? 'Sí' : 'No'}`);
    doc.moveDown();
    
    doc.fontSize(16).text(`Nivel de Atención Sugerido: ${evaluacion.nivel_atencion.toUpperCase()}`, { underline: true, stroke: true });
    doc.moveDown();
    
    if (evaluacion.explicacion) {
        doc.fontSize(14).text('Explicación / Factores de Riesgo:');
        doc.fontSize(12).text(evaluacion.explicacion);
    }
    
    doc.end();
};
