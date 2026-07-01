import React, { useState, useEffect } from 'react';

export default function ResultView({ paciente, evaluacion, onReset }) {
  const isEmergency = evaluacion?.nivel_atencion === 'Emergencia' || evaluacion?.nivel_urgencia === 'Emergencia';
  const [explicacion, setExplicacion] = useState('');

  useEffect(() => {
    if (evaluacion?.id) {
      const evtSource = new EventSource(`http://localhost:3000/api/evaluaciones/${evaluacion.id}/explicacion`);
      evtSource.onmessage = (e) => {
        const payload = JSON.parse(e.data);
        if (payload.done) {
          evtSource.close();
        } else if (payload.chunk) {
          setExplicacion(prev => prev + payload.chunk);
        }
      };
      return () => evtSource.close();
    }
  }, [evaluacion]);
  
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen antialiased pb-24 md:pb-12">
      <main className="w-full max-w-[1024px] mx-auto px-margin-mobile md:px-margin-tablet pt-8 md:pt-12">
        <div className="mb-8 flex items-center">
          <button onClick={onReset} className="inline-flex items-center gap-2 text-primary hover:bg-surface-container-low px-4 py-3 rounded-full transition-colors font-button text-button min-h-[48px]">
            <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
            <span>Volver al dashboard</span>
          </button>
        </div>

        <section className="mb-12 relative">
          <div className={`${isEmergency ? 'bg-error text-on-error shadow-[0_8px_30px_rgb(186,26,26,0.2)]' : 'bg-primary text-on-primary'} rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6`}>
            <span aria-hidden="true" className={`material-symbols-outlined ${isEmergency ? 'animate-pulse' : ''} text-[80px] md:text-[120px]`} style={{fontVariationSettings: "'FILL' 1"}}>
              {isEmergency ? 'warning' : 'info'}
            </span>
            <div className="text-center md:text-left flex-1">
              <h1 className="font-display-lg text-display-lg tracking-wide uppercase mb-2">
                {evaluacion?.nivel_atencion || 'Urgencia Desconocida'}
              </h1>
              <p className="font-headline-md text-headline-md opacity-95">
                {isEmergency ? 'Prioridad I - Requiere atención médica inmediata' : 'Prioridad - Revisar protocolo'}
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm w-[90%] md:w-[85%] mx-auto -mt-8 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span aria-hidden="true" className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>person</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">Paciente</p>
                <p className="font-headline-md text-headline-md text-on-surface">{paciente?.nombre || 'Desconocido'}, {paciente?.edad || '-'} años</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-surface-bright px-4 py-2 rounded-lg border border-outline-variant/50">
                <p className="font-label-md text-label-md text-on-surface-variant text-sm">Presión Arterial</p>
                <p className={`font-headline-md text-headline-md ${isEmergency ? 'text-error' : 'text-on-surface'}`}>
                  {evaluacion?.vitals?.presion || '-'}
                </p>
              </div>
              <div className="bg-surface-bright px-4 py-2 rounded-lg border border-outline-variant/50">
                <p className="font-label-md text-label-md text-on-surface-variant text-sm">Ritmo Cardíaco</p>
                <p className={`font-headline-md text-headline-md ${isEmergency ? 'text-error' : 'text-on-surface'}`}>
                  {evaluacion?.vitals?.fc || '-'} lpm
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <section className="flex flex-col gap-6">
            <div className="bg-surface-container-low border-l-[6px] border-primary rounded-r-2xl rounded-l-sm p-6 md:p-8 flex-1 flex flex-col shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden="true" className="material-symbols-outlined text-primary text-[32px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                <h2 className="font-headline-lg text-headline-lg text-primary">Explicación de IA</h2>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface mb-6 flex-1 whitespace-pre-wrap">
                {explicacion || 'Generando explicación...'}
              </p>
              
              <div className="bg-surface-variant rounded-xl p-4 flex gap-3 items-start border border-outline-variant/30">
                <span aria-hidden="true" className="material-symbols-outlined text-on-surface-variant mt-1">info</span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1">Aviso Clínico</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-snug">
                    Este es un análisis probabilístico generado para soporte de triaje. <strong>No constituye un diagnóstico médico final</strong> y requiere estabilización inmediata y derivación.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm flex-1">
              <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
                <span aria-hidden="true" className="material-symbols-outlined text-on-surface text-[28px]">summarize</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">Resumen clínico</h2>
              </div>
              
              <dl className="space-y-4">
                <div>
                  <dt className="font-label-md text-label-md text-on-surface-variant">Motivo principal / Síntomas</dt>
                  <dd className="font-body-md text-body-md text-on-surface mt-1">{evaluacion?.sintomas || '-'}</dd>
                </div>
                <div>
                  <dt className="font-label-md text-label-md text-on-surface-variant">Otros signos</dt>
                  <dd className="font-body-md text-body-md text-on-surface mt-1 flex flex-wrap gap-2">
                    <span className="bg-surface-container-high px-3 py-1 rounded-full text-sm">T: {evaluacion?.vitals?.temperatura || '-'} °C</span>
                    <span className="bg-surface-container-high px-3 py-1 rounded-full text-sm">SpO2: {evaluacion?.vitals?.spo2 || '-'}%</span>
                    <span className="bg-surface-container-high px-3 py-1 rounded-full text-sm">FR: {evaluacion?.vitals?.fr || '-'} rpm</span>
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant p-4 px-margin-mobile flex flex-col md:flex-row justify-end gap-3 md:gap-4 z-50 md:relative md:border-none md:bg-transparent md:p-0 md:mt-12 md:pb-12 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:shadow-none">
          <button className="flex-1 md:flex-none border-2 border-primary text-primary hover:bg-surface-container-low px-6 min-h-[56px] rounded-full font-button text-button flex items-center justify-center gap-2 transition-colors">
            <span aria-hidden="true" className="material-symbols-outlined">translate</span>
            <span>Traducir a Quechua</span>
          </button>
          <button className="flex-1 md:flex-none bg-primary text-on-primary hover:bg-on-primary-fixed-variant px-8 min-h-[56px] rounded-full font-button text-button flex items-center justify-center gap-2 transition-colors shadow-sm">
            <span aria-hidden="true" className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>picture_as_pdf</span>
            <span>Generar Carta de Referencia</span>
          </button>
        </div>
      </main>
    </div>
  );
}
