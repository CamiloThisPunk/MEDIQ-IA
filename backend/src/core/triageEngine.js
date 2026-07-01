/**
 * Motor de Reglas Clínicas de Triaje
 * Clasifica la urgencia de forma determinística basándose en signos vitales y síntomas.
 * 
 * Niveles: Emergencia, Prioritario, Consulta, Autocuidado.
 */

function clasificar(vitals) {
    if (!vitals) return 'Autocuidado';

    const {
        spo2,
        fr,
        fc,
        temperatura,
        dolor_toracico,
        convulsiones,
        embarazo
    } = vitals;

    // 1. Criterios de Emergencia
    if (
        (spo2 !== undefined && spo2 !== null && spo2 < 90) ||
        convulsiones === 1 ||
        dolor_toracico === 1
    ) {
        return 'Emergencia';
    }

    // 2. Criterios de Prioritario
    const fiebreAlta = temperatura !== undefined && temperatura !== null && temperatura >= 39;
    const frAlta = fr !== undefined && fr !== null && fr > 30;

    if ((fiebreAlta && frAlta) || embarazo === 1) {
        return 'Prioritario';
    }

    // 3. Criterios de Consulta
    const fiebreModerada = temperatura !== undefined && temperatura !== null && temperatura >= 38 && temperatura < 39;
    const fcAlta = fc !== undefined && fc !== null && fc > 100;
    
    if (fiebreModerada || fcAlta) {
        return 'Consulta';
    }

    // 4. Autocuidado (Default)
    return 'Autocuidado';
}

module.exports = clasificar;
