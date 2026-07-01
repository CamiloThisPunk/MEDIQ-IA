const clasificar = require('../src/core/triageEngine');

describe('Triage Engine - clasificar(vitals)', () => {
  test('SpO2 < 90% resulta en Emergencia', () => {
    const vitals = { spo2: 88, fr: 20, temperatura: 37 };
    expect(clasificar(vitals)).toBe('Emergencia');
  });

  test('Convulsiones resulta en Emergencia', () => {
    const vitals = { convulsiones: 1, spo2: 95, fr: 20, temperatura: 37 };
    expect(clasificar(vitals)).toBe('Emergencia');
  });

  test('Fiebre >= 39 y FR > 30 resulta en Prioritario', () => {
    const vitals = { temperatura: 39.5, fr: 32, spo2: 95 };
    expect(clasificar(vitals)).toBe('Prioritario');
  });

  test('Embarazo resulta en Prioritario (si no hay signos de emergencia)', () => {
    const vitals = { embarazo: 1, spo2: 95, fr: 20, temperatura: 37 };
    expect(clasificar(vitals)).toBe('Prioritario');
  });
  
  test('Dolor torácico resulta en Emergencia', () => {
    const vitals = { dolor_toracico: 1, spo2: 95, fr: 20, temperatura: 37 };
    expect(clasificar(vitals)).toBe('Emergencia');
  });

  test('Síntomas leves o signos vitales normales resulta en Autocuidado', () => {
    const vitals = { temperatura: 37, fr: 18, fc: 80, spo2: 98, dolor_toracico: 0, convulsiones: 0, embarazo: 0 };
    expect(clasificar(vitals)).toBe('Autocuidado');
  });
  
  test('Fiebre moderada (38) resulta en Consulta', () => {
    const vitals = { temperatura: 38, fr: 20, fc: 90, spo2: 96 };
    expect(clasificar(vitals)).toBe('Consulta');
  });
  
  test('Manejo de valores nulos - falla de forma segura', () => {
    const vitals = { temperatura: null };
    expect(clasificar(vitals)).toBe('Autocuidado');
  });
});
