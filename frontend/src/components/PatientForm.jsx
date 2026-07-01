import React, { useState } from 'react';
import axios from 'axios';

export default function PatientForm({ onNext, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    sexo: 'F',
    distrito: '',
    idioma: 'es'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        nombre: formData.nombre,
        edad: parseInt(formData.edad),
        sexo: formData.sexo === 'M' ? 'Masculino' : 'Femenino',
        distrito: formData.distrito,
        idioma: formData.idioma === 'es' ? 'Español' : 'Quechua'
      };
      const response = await axios.post('http://localhost:3000/api/pacientes', payload);
      onNext(response.data);
    } catch (err) {
      alert("Error registrando paciente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface h-screen flex flex-col md:flex-row overflow-hidden">
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-surface-container-low">
        
        {/* Header / Stepper */}
        <header className="bg-surface-container-lowest shadow-sm z-10 sticky top-0 px-margin-tablet py-gutter flex flex-col gap-base border-b border-outline-variant">
          <div className="flex items-center gap-4">
            <button type="button" onClick={onCancel} aria-label="Atrás" className="w-touch-target h-touch-target flex items-center justify-center rounded-full hover:bg-surface-container-high text-primary transition-colors">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>arrow_back</span>
            </button>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Nuevo paciente</h1>
          </div>
          <div className="flex items-center gap-2 mt-4 max-w-2xl">
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-2 bg-primary rounded-full w-full"></div>
              <span className="font-label-md text-label-md text-primary">1. Datos Personales</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-2 bg-surface-variant rounded-full w-full"></div>
              <span className="font-label-md text-label-md text-on-surface-variant">2. Signos Vitales</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-2 bg-surface-variant rounded-full w-full"></div>
              <span className="font-label-md text-label-md text-on-surface-variant">3. Síntomas</span>
            </div>
          </div>
        </header>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 px-margin-tablet py-gutter flex flex-col gap-gutter max-w-4xl mx-auto w-full pb-32">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-gutter flex flex-col gap-gutter">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b-4 border-secondary w-fit pb-2">Datos del Paciente</h2>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="nombre">Nombre Completo</label>
              <input required name="nombre" value={formData.nombre} onChange={handleChange} className="w-full h-[56px] px-4 font-body-lg text-body-lg text-on-surface bg-surface border border-outline-variant rounded-lg focus:border-primary focus:border-2 focus:ring-0 transition-all outline-none" id="nombre" placeholder="Ej. Juan Pérez" type="text"/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="edad">Edad (Años)</label>
                <input required name="edad" value={formData.edad} onChange={handleChange} className="w-full h-[56px] px-4 font-body-lg text-body-lg text-on-surface bg-surface border border-outline-variant rounded-lg focus:border-primary focus:border-2 focus:ring-0 transition-all outline-none" id="edad" placeholder="Ej. 45" type="number"/>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface">Sexo Biológico</span>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input className="peer sr-only" name="sexo" type="radio" value="F" checked={formData.sexo === 'F'} onChange={handleChange} />
                    <div className="h-[56px] flex items-center justify-center gap-2 border border-outline-variant rounded-lg bg-surface peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary peer-checked:border-2 hover:bg-surface-container-high transition-all font-body-lg text-body-lg text-on-surface-variant">
                      <span className="material-symbols-outlined">female</span>Femenino
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input className="peer sr-only" name="sexo" type="radio" value="M" checked={formData.sexo === 'M'} onChange={handleChange} />
                    <div className="h-[56px] flex items-center justify-center gap-2 border border-outline-variant rounded-lg bg-surface peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary peer-checked:border-2 hover:bg-surface-container-high transition-all font-body-lg text-body-lg text-on-surface-variant">
                      <span className="material-symbols-outlined">male</span>Masculino
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="distrito">Distrito / Comunidad</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">location_on</span>
                  <input required name="distrito" value={formData.distrito} onChange={handleChange} className="w-full h-[56px] pl-12 pr-4 font-body-lg text-body-lg text-on-surface bg-surface border border-outline-variant rounded-lg focus:border-primary focus:border-2 focus:ring-0 transition-all outline-none" id="distrito" placeholder="Ej. San Salvador" type="text"/>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface">Idioma Preferido</span>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input className="peer sr-only" name="idioma" type="radio" value="es" checked={formData.idioma === 'es'} onChange={handleChange}/>
                    <div className="h-[56px] flex items-center justify-center border border-outline-variant rounded-lg bg-surface peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary peer-checked:border-2 hover:bg-surface-container-high transition-all font-body-lg text-body-lg text-on-surface-variant">
                      Español
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input className="peer sr-only" name="idioma" type="radio" value="qu" checked={formData.idioma === 'qu'} onChange={handleChange}/>
                    <div className="h-[56px] flex items-center justify-center border border-outline-variant rounded-lg bg-surface peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary peer-checked:border-2 hover:bg-surface-container-high transition-all font-body-lg text-body-lg text-on-surface-variant">
                      Runasimi
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 w-full bg-surface-container-lowest border-t border-outline-variant p-gutter shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-20 flex justify-end gap-4 left-0">
            <button type="button" onClick={onCancel} className="h-[56px] px-8 rounded-lg font-button text-button text-primary border border-primary hover:bg-surface-container-high transition-colors flex items-center justify-center min-w-[120px]">
              Cancelar
            </button>
            <button disabled={loading} type="submit" className="h-[56px] px-8 rounded-lg font-button text-button text-on-primary bg-primary hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50">
              {loading ? 'Guardando...' : 'Continuar a signos vitales'}
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>arrow_forward</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
