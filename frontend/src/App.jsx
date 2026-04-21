import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-6 text-center">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <img src="/logo.png" alt="Laguerré Beauty" className="mx-auto w-48 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
        <h1 className="text-4xl font-light tracking-[0.2em] uppercase text-red-600">Laguerré Beauty</h1>
        <p className="text-zinc-400 text-lg">A essência da beleza em cada detalhe.</p>
        <div className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent w-full"></div>
        <p className="text-zinc-500 uppercase tracking-widest text-sm">Em Breve - Nova Coleção 2026</p>
        <button className="mt-8 px-8 py-3 bg-red-700 hover:bg-red-600 transition-all text-white font-bold tracking-widest uppercase text-xs rounded-none border border-red-500">
          Notifique-me
        </button>
      </div>
    </div>
  );
}

export default App;
