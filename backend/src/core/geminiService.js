const { GoogleGenAI } = require('@google/genai');

// Inicializar SDK de Google Gemini. El API_KEY debe estar en .env como GEMINI_API_KEY
const ai = new GoogleGenAI({});

/**
 * Filtro anti-diagnóstico muy simple (Blacklist)
 * Evita que se emitan diagnósticos definitivos.
 */
function filtrarChunk(texto) {
    if (!texto) return '';
    // Lista básica de censura
    const blacklist = ['neumonía', 'tuberculosis', 'infarto', 'covid-19', 'cáncer', 'diabetes'];
    let filtrado = texto;
    blacklist.forEach(enfermedad => {
        const regex = new RegExp(`\\b${enfermedad}\\b`, 'gi');
        filtrado = filtrado.replace(regex, '[POSIBLE RIESGO DETECTADO]');
    });
    return filtrado;
}

/**
 * Generador asíncrono para explicar el nivel de urgencia vía Streaming.
 * Devuelve chunk por chunk.
 */
async function* explicarNivelStream(evaluacion, paciente) {
    const prompt = `
    Eres un asistente clínico de triaje para técnicos de salud rurales.
    El motor de reglas ha clasificado a este paciente de ${paciente.edad} años, sexo ${paciente.sexo}, con nivel de atención: ${evaluacion.nivel_atencion}.
    Signos Vitales recolectados:
    SpO2: ${evaluacion.spo2 || 'N/A'}%
    Frecuencia Respiratoria: ${evaluacion.fr || 'N/A'}
    Temperatura: ${evaluacion.temperatura || 'N/A'}°C
    
    Explica en lenguaje MUY SENCILLO Y CORTO por qué se asignó este nivel basado en factores de riesgo, sin emitir ningún diagnóstico médico.
    Muestra compasión y claridad.
    `;

    try {
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        for await (const chunk of responseStream) {
            const textoLimpio = filtrarChunk(chunk.text);
            yield textoLimpio;
        }
    } catch (error) {
        console.error("Gemini Stream Error:", error);
        yield "\n[Error conectando con el sistema de análisis. Triaje válido: " + evaluacion.nivel_atencion + "]\n";
    }
}

/**
 * Generador asíncrono para traducción.
 */
async function* traducirStream(texto, idiomaOrigen, idiomaDestino) {
    const prompt = `Traduce el siguiente texto de ${idiomaOrigen} a ${idiomaDestino} de forma directa y clara para un entorno rural médico:\n\n${texto}`;
    
    try {
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        for await (const chunk of responseStream) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Gemini Translate Stream Error:", error);
        yield "\n[Error de traducción]\n";
    }
}

module.exports = {
    explicarNivelStream,
    traducirStream
};
