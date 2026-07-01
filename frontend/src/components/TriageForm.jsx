import React, { useState } from 'react';

export default function TriageForm({ paciente, onNext, onBack }) {
  const [vitals, setVitals] = useState({
    temperatura: '',
    spo2: '',
    presion_sis: '',
    presion_dia: '',
    fc: '',
    fr: ''
  });
  
  const [flags, setFlags] = useState({
    dolor: false,
    convulsiones: false,
    embarazo: false
  });
  
  const [sintomas, setSintomas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVitalChange = (e) => {
    setVitals({...vitals, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        paciente_id: paciente?.id || 1,
        vitals: {
          temperatura: parseFloat(vitals.temperatura),
          spo2: parseInt(vitals.spo2),
          fc: parseInt(vitals.fc),
          fr: parseInt(vitals.fr),
          presion: `${vitals.presion_sis}/${vitals.presion_dia}`
        },
        sintomas: `${sintomas}. Alertas: ${Object.keys(flags).filter(k=>flags[k]).join(', ')}`
      };

      const res = await fetch('http://localhost:3000/api/evaluaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      onNext({ ...payload, ...data }); // Move to results
    } catch (err) {
      alert("Error en triaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-[72px] bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <span className="font-headline-md text-headline-md font-bold text-primary">MEDIQ Perú AI</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>cloud_sync</span>
            <span className="font-label-md text-label-md text-on-surface-variant text-sm">En línea</span>
          </div>
          <button className="w-touch-target h-touch-target rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">language</span>
          </button>
          <button className="w-touch-target h-touch-target rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">wifi</span>
          </button>
          <button className="w-touch-target h-touch-target rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-[72px] h-[calc(100vh-72px)] z-40 py-base bg-surface-container-low shadow-sm w-64 border-r border-outline-variant">
        <div className="px-6 py-4 mb-4">
          <h2 className="font-label-md text-label-md text-on-surface">Posta de Salud Rural</h2>
          <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Modo Tablet</p>
        </div>
        <ul className="flex-1 flex flex-col gap-2">
          <li>
            <a className="text-on-surface-variant mx-2 flex items-center gap-4 px-4 py-3 hover:bg-surface-variant rounded-xl transition-colors" href="#">
              <span className="material-symbols-outlined">group</span>
              <span className="font-label-md text-label-md">Pacientes</span>
            </a>
          </li>
          <li>
            <a className="bg-secondary-container text-on-secondary-container rounded-xl mx-2 flex items-center gap-4 px-4 py-3 font-bold opacity-80 transition-all" href="#">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>medical_services</span>
              <span className="font-label-md text-label-md">Nuevo Registro</span>
            </a>
          </li>
          <li>
            <a className="text-on-surface-variant mx-2 flex items-center gap-4 px-4 py-3 hover:bg-surface-variant rounded-xl transition-colors" href="#">
              <span className="material-symbols-outlined">sync</span>
              <span className="font-label-md text-label-md">Sincronización</span>
            </a>
          </li>
          <li>
            <a className="text-on-surface-variant mx-2 flex items-center gap-4 px-4 py-3 hover:bg-surface-variant rounded-xl transition-colors" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-label-md">Ajustes</span>
            </a>
          </li>
        </ul>
        <div className="p-4 mt-auto">
          <button className="w-full flex justify-center items-center gap-2 text-error font-button text-button h-touch-target rounded-lg hover:bg-error-container transition-colors border border-error">
            <span className="material-symbols-outlined">logout</span>
            Finalizar Turno
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 pt-[96px] pb-24 px-margin-mobile md:px-margin-tablet max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-6">Registro Clínico</h1>
          <div className="flex items-center w-full max-w-3xl">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
              </div>
              <span className="ml-3 font-label-md text-label-md text-on-surface-variant hidden sm:inline">1. Identificación</span>
            </div>
            <div className="flex-1 h-0.5 bg-outline-variant mx-4"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">2</div>
              <span className="ml-3 font-label-md text-label-md text-primary font-bold hidden sm:inline">2. Signos vitales</span>
            </div>
            <div className="flex-1 h-0.5 bg-outline-variant mx-4"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold">3</div>
              <span className="ml-3 font-label-md text-label-md text-on-surface-variant hidden sm:inline">3. Triaje IA</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
            <div className="xl:col-span-7 space-y-6">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>monitor_heart</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Signos Vitales</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Temperatura</label>
                    <div className="input-ring flex items-center bg-surface border border-outline-variant rounded-lg h-[56px] px-4 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed-dim">
                      <input required name="temperatura" value={vitals.temperatura} onChange={handleVitalChange} className="bg-transparent border-none outline-none w-full font-body-lg text-body-lg text-on-surface placeholder:text-outline p-0" placeholder="36.5" step="0.1" type="number" />
                      <span className="font-label-md text-label-md text-outline ml-2 whitespace-nowrap">°C</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">SpO2</label>
                    <div className="input-ring flex items-center bg-surface border border-outline-variant rounded-lg h-[56px] px-4 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed-dim">
                      <input required name="spo2" value={vitals.spo2} onChange={handleVitalChange} className="bg-transparent border-none outline-none w-full font-body-lg text-body-lg text-on-surface placeholder:text-outline p-0" placeholder="98" type="number" />
                      <span className="font-label-md text-label-md text-outline ml-2 whitespace-nowrap">%</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Presión Arterial</label>
                    <div className="flex items-center gap-4">
                      <div className="input-ring flex items-center bg-surface border border-outline-variant rounded-lg h-[56px] px-4 flex-1 transition-colors relative focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed-dim">
                        <span className="absolute -top-2.5 left-3 bg-surface px-1 text-xs font-label-md text-outline-variant">Sistólica</span>
                        <input required name="presion_sis" value={vitals.presion_sis} onChange={handleVitalChange} className="bg-transparent border-none outline-none w-full font-body-lg text-body-lg text-on-surface placeholder:text-outline p-0 text-center" placeholder="120" type="number" />
                      </div>
                      <span className="font-display-lg text-outline-variant">/</span>
                      <div className="input-ring flex items-center bg-surface border border-outline-variant rounded-lg h-[56px] px-4 flex-1 transition-colors relative focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed-dim">
                        <span className="absolute -top-2.5 left-3 bg-surface px-1 text-xs font-label-md text-outline-variant">Diastólica</span>
                        <input required name="presion_dia" value={vitals.presion_dia} onChange={handleVitalChange} className="bg-transparent border-none outline-none w-full font-body-lg text-body-lg text-on-surface placeholder:text-outline p-0 text-center" placeholder="80" type="number" />
                      </div>
                      <span className="font-label-md text-label-md text-outline w-12">mmHg</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Frecuencia Cardíaca</label>
                    <div className="input-ring flex items-center bg-surface border border-outline-variant rounded-lg h-[56px] px-4 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed-dim">
                      <input required name="fc" value={vitals.fc} onChange={handleVitalChange} className="bg-transparent border-none outline-none w-full font-body-lg text-body-lg text-on-surface placeholder:text-outline p-0" placeholder="75" type="number" />
                      <span className="font-label-md text-label-md text-outline ml-2 whitespace-nowrap">lpm</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Frecuencia Respiratoria</label>
                    <div className="input-ring flex items-center bg-surface border border-outline-variant rounded-lg h-[56px] px-4 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed-dim">
                      <input required name="fr" value={vitals.fr} onChange={handleVitalChange} className="bg-transparent border-none outline-none w-full font-body-lg text-body-lg text-on-surface placeholder:text-outline p-0" placeholder="16" type="number" />
                      <span className="font-label-md text-label-md text-outline ml-2 whitespace-nowrap">rpm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-5 space-y-6">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-error" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Signos de Alarma</h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-6">Marque si el paciente presenta alguna de estas condiciones.</p>
                <div className="space-y-3">
                  <label className="block cursor-pointer relative">
                    <input className="sr-only toggle-checkbox peer" type="checkbox" checked={flags.dolor} onChange={() => setFlags({...flags, dolor: !flags.dolor})}/>
                    <div className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 min-h-[64px] ${flags.dolor ? 'bg-error-container border-error text-on-error-container' : 'bg-surface border-outline-variant text-on-surface'}`}>
                      <span className="font-label-md text-label-md">Dolor torácico intenso</span>
                      <span className={`material-symbols-outlined text-3xl transition-colors ${flags.dolor ? 'text-error' : 'text-outline-variant'}`} style={flags.dolor ? {fontVariationSettings: "'FILL' 1"} : {}}>favorite</span>
                    </div>
                  </label>
                  <label className="block cursor-pointer relative">
                    <input className="sr-only toggle-checkbox peer" type="checkbox" checked={flags.convulsiones} onChange={() => setFlags({...flags, convulsiones: !flags.convulsiones})} />
                    <div className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 min-h-[64px] ${flags.convulsiones ? 'bg-error-container border-error text-on-error-container' : 'bg-surface border-outline-variant text-on-surface'}`}>
                      <span className="font-label-md text-label-md">Convulsiones recientes</span>
                      <span className={`material-symbols-outlined text-3xl transition-colors ${flags.convulsiones ? 'text-error' : 'text-outline-variant'}`} style={flags.convulsiones ? {fontVariationSettings: "'FILL' 1"} : {}}>neurology</span>
                    </div>
                  </label>
                  <label className="block cursor-pointer relative">
                    <input className="sr-only peer" type="checkbox" checked={flags.embarazo} onChange={() => setFlags({...flags, embarazo: !flags.embarazo})} />
                    <div className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 min-h-[64px] ${flags.embarazo ? 'bg-secondary-container border-secondary text-on-secondary-container' : 'bg-surface border-outline-variant text-on-surface'}`}>
                      <span className="font-label-md text-label-md">Embarazo (Sospecha/Confirmado)</span>
                      <span className={`material-symbols-outlined text-3xl transition-colors ${flags.embarazo ? 'text-secondary' : 'text-outline-variant'}`} style={flags.embarazo ? {fontVariationSettings: "'FILL' 1"} : {}}>pregnant_woman</span>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col h-[calc(100%-410px)] min-h-[200px]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>edit_document</span>
                  <h2 className="font-label-md text-label-md text-on-surface">Motivo de consulta</h2>
                </div>
                <div className="input-ring flex-1 flex flex-col bg-surface border border-outline-variant rounded-lg p-1 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-fixed-dim">
                  <textarea required value={sintomas} onChange={e => setSintomas(e.target.value)} className="flex-1 bg-transparent border-none outline-none w-full font-body-md text-body-md text-on-surface placeholder:text-outline p-3 resize-none" placeholder="Describa brevemente los síntomas principales que reporta el paciente..."></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-outline-variant flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
            <button type="button" onClick={onBack} className="w-full sm:w-auto px-6 h-[56px] rounded-lg font-button text-button text-primary hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">arrow_back</span>
              Volver
            </button>
            <button type="submit" disabled={loading} className="w-full sm:w-auto px-8 h-[56px] rounded-lg bg-primary-container text-on-primary-container font-button text-button hover:bg-surface-tint hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? 'Evaluando...' : 'Evaluar paciente'}
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>robot_2</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
