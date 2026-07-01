import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientForm from './components/PatientForm';
import TriageForm from './components/TriageForm';
import ResultView from './components/ResultView';

export default function App() {
  const [view, setView] = useState('login'); // login, dashboard, form1, form2, result
  const [paciente, setPaciente] = useState(null);
  const [evaluacion, setEvaluacion] = useState(null);

  const handleLogin = () => setView('dashboard');
  
  const handleNewPatient = () => {
    setPaciente(null);
    setEvaluacion(null);
    setView('form1');
  };

  const handlePatientSubmit = (data) => {
    setPaciente(data);
    setView('form2');
  };

  const handleTriageSubmit = (data) => {
    setEvaluacion({ ...data, vitals: data.vitals || {}, sintomas: data.sintomas || '' });
    setView('result');
  };

  const handleBackToDashboard = () => setView('dashboard');

  return (
    <>
      {view === 'login' && <Login onLogin={handleLogin} />}
      {view === 'dashboard' && <Dashboard onNewPatient={handleNewPatient} onLogout={() => setView('login')} />}
      {view === 'form1' && <PatientForm onNext={handlePatientSubmit} onCancel={handleBackToDashboard} />}
      {view === 'form2' && <TriageForm paciente={paciente} onNext={handleTriageSubmit} onBack={() => setView('form1')} />}
      {view === 'result' && <ResultView paciente={paciente} evaluacion={evaluacion} onReset={handleBackToDashboard} />}
    </>
  );
}
