import React from 'react';

export default function Dashboard({ onNewPatient, onLogout }) {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col md:flex-row">
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 py-base bg-surface-container-low dark:bg-surface-container-lowest shadow-sm w-64">
        <div className="px-gutter pb-gutter pt-margin-tablet">
          <h1 className="font-headline-md text-headline-md font-bold text-primary mb-1">Posta de Salud Rural</h1>
          <p className="text-on-surface-variant font-label-md text-label-md">Modo Tablet</p>
        </div>
        <div className="flex-1 flex flex-col gap-2 mt-4 overflow-y-auto">
          <a className="bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-xl mx-2 flex items-center gap-4 px-4 py-3 min-h-[48px]" href="#">
            <span className="material-symbols-outlined fill" style={{fontVariationSettings: "'FILL' 1"}}>group</span>
            <span className="font-label-md text-label-md">Pacientes</span>
          </a>
          <button onClick={onNewPatient} className="text-on-surface-variant dark:text-on-surface-variant mx-2 flex items-center gap-4 px-4 py-3 hover:bg-surface-variant dark:hover:bg-surface-container-highest rounded-xl transition-colors min-h-[48px] w-[calc(100%-1rem)] text-left">
            <span className="material-symbols-outlined">medical_services</span>
            <span className="font-label-md text-label-md">Nuevo Registro</span>
          </button>
          <a className="text-on-surface-variant dark:text-on-surface-variant mx-2 flex items-center gap-4 px-4 py-3 hover:bg-surface-variant dark:hover:bg-surface-container-highest rounded-xl transition-colors min-h-[48px]" href="#">
            <span className="material-symbols-outlined">sync</span>
            <span className="font-label-md text-label-md">Sincronización</span>
          </a>
          <a className="text-on-surface-variant dark:text-on-surface-variant mx-2 flex items-center gap-4 px-4 py-3 hover:bg-surface-variant dark:hover:bg-surface-container-highest rounded-xl transition-colors min-h-[48px]" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md text-label-md">Ajustes</span>
          </a>
        </div>
        <div className="px-gutter mt-auto pb-margin-tablet">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-[48px] h-[48px] rounded-full bg-primary flex items-center justify-center text-white border-2 border-outline-variant">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface">Dr. Silva</p>
              <p className="text-on-surface-variant text-sm">Técnico Médico</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 font-button text-button text-error bg-error-container hover:bg-error hover:text-on-error py-3 rounded-lg transition-colors min-h-[48px]">
            <span className="material-symbols-outlined">logout</span>
            Finalizar Turno
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-gutter h-[72px] bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">MEDIQ Perú AI</div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="font-label-md text-sm">Online (Sincronizado)</span>
            </div>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
              <span className="material-symbols-outlined">language</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
              <span className="material-symbols-outlined">wifi</span>
            </button>
          </div>
        </header>

        <div className="flex-1 mt-[72px] p-gutter md:p-margin-tablet pb-[100px] md:pb-margin-tablet max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Pacientes en Espera</h2>
              <p className="text-on-surface-variant font-body-md text-body-md">Seleccione un paciente para iniciar la evaluación clínica o registre uno nuevo.</p>
            </div>
            <button onClick={onNewPatient} className="w-full sm:w-auto bg-primary-container hover:bg-primary text-on-primary-container hover:text-white font-button text-button rounded-xl flex items-center justify-center gap-2 px-6 py-4 min-h-[56px] shadow-sm transition-colors shrink-0">
              <span className="material-symbols-outlined">add</span>
              + Nuevo paciente
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
              <span className="font-display-lg text-display-lg text-error mb-1">0</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Emergencia</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-tertiary"></div>
              <span className="font-display-lg text-display-lg text-tertiary mb-1">0</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Prioritario</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <span className="font-display-lg text-display-lg text-primary mb-1">0</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Consulta</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
              <span className="font-display-lg text-display-lg text-green-700 mb-1">0</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Autocuidado</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full bg-surface-container-highest border-none rounded-xl pl-12 pr-4 py-4 min-h-[56px] text-on-surface font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none" placeholder="Buscar paciente por nombre o DNI..." type="text"/>
            </div>
            <button className="bg-surface-container-highest hover:bg-surface-variant text-on-surface rounded-xl px-6 py-4 min-h-[56px] flex items-center justify-center gap-2 font-button transition-colors shrink-0">
              <span className="material-symbols-outlined">filter_list</span>
              Filtrar por Urgencia
            </button>
          </div>

          <div className="flex flex-col gap-4 text-center p-12 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant text-on-surface-variant">
            <p>No hay pacientes en espera. Agregue un nuevo paciente.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
