import React from 'react';

export default function Login({ onLogin }) {
  return (
    <div className="bg-surface-bright text-on-surface font-body-md min-h-screen w-full flex flex-col relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Atmospheric Clinical Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary-fixed-dim opacity-[0.15] blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[50%] rounded-full bg-secondary-fixed opacity-[0.15] blur-[100px]"></div>
      </div>
      
      {/* Header */}
      <header className="w-full absolute top-0 left-0 p-margin-tablet flex justify-end z-20 pointer-events-none">
        <button className="pointer-events-auto flex items-center gap-2 px-6 h-touch-target bg-surface-container-lowest border border-outline-variant rounded-full shadow-sm hover:bg-surface-container-low hover:border-primary transition-all duration-200 group">
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">language</span>
          <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary transition-colors">Español / Quechua</span>
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_drop_down</span>
        </button>
      </header>
      
      {/* Main Login Canvas */}
      <main className="flex-1 flex items-center justify-center p-margin-tablet w-full z-10">
        <div className="w-full max-w-[560px] bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 md:p-12 flex flex-col gap-10" style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.02)' }}>
          {/* Brand & Identity */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 bg-primary-container rounded-[28px] flex items-center justify-center shadow-sm mb-2 transform hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-[48px] text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>ecg_heart</span>
            </div>
            <div>
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">MEDIQ Perú AI</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Copiloto de orientación clínica</p>
            </div>
          </div>
          
          {/* Login Form */}
          <form className="flex flex-col gap-8 w-full" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative">
                <label className="font-label-md text-label-md text-on-surface ml-1" htmlFor="username">Usuario Clínico</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">badge</span>
                  <input className="w-full pl-14 pr-4 h-[64px] rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none font-body-lg text-body-lg text-on-surface transition-all placeholder:text-outline-variant" id="username" placeholder="Ingrese su DNI o código" type="text" />
                </div>
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-label-md text-label-md text-on-surface ml-1" htmlFor="password">Contraseña</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">lock</span>
                  <input className="w-full pl-14 pr-14 h-[64px] rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none font-body-lg text-body-lg text-on-surface transition-all placeholder:text-outline-variant tracking-widest" id="password" placeholder="••••••••" type="password" />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-fixed" type="button">
                    <span className="material-symbols-outlined">visibility_off</span>
                  </button>
                </div>
              </div>
            </div>
            
            <button className="w-full min-h-[64px] bg-primary-container text-on-primary-container font-button text-button rounded-xl hover:bg-primary shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.98]" type="submit">
              Ingresar
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
          <div className="flex flex-col gap-3 w-full border-t border-outline-variant pt-6 mt-2">
            <p className="text-center font-label-md text-label-md text-on-surface-variant mb-2">Accesos directos de prueba</p>
            <div className="flex gap-4">
              <button onClick={(e) => { e.preventDefault(); onLogin(); }} className="flex-1 min-h-[48px] bg-surface-container-high text-on-surface font-button text-sm rounded-xl hover:bg-surface-variant transition-all border border-outline-variant/50 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">stethoscope</span>
                Médico
              </button>
              <button onClick={(e) => { e.preventDefault(); onLogin(); }} className="flex-1 min-h-[48px] bg-surface-container-high text-on-surface font-button text-sm rounded-xl hover:bg-surface-variant transition-all border border-outline-variant/50 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-xl">medical_services</span>
                Técnico
              </button>
            </div>
          </div>
          
          <div className="mt-2 flex items-start gap-4 p-5 bg-surface-container-low rounded-xl border border-outline-variant/50">
            <div className="mt-0.5">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_sync</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              La app funciona sin conexión salvo para IA y sincronización.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
