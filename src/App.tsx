import React from 'react';
import CanvasWrapper from './components/three/CanvasWrapper';
import ColorControls from './components/ui/ColorControls';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-[#f5f5f0] overflow-hidden font-sans text-slate-800">
      <aside className="w-[360px] bg-[#101319] text-white shadow-2xl flex flex-col z-10 h-full">
        <div className="px-8 py-10 flex-1 overflow-y-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 rounded-[2rem] bg-white/5 px-4 py-3">
              <span className="text-3xl">🚛</span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Configurador</p>
                <h1 className="text-2xl font-black tracking-tight">COMARDICATRUCK</h1>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-[2rem] bg-[#151a20] border border-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-4">
              <button className="flex-1 rounded-2xl bg-slate-800/90 px-4 py-3 text-sm font-semibold text-sky-400 ring-1 ring-sky-500/40 shadow-sm">
                🎨 Pintura
              </button>
              <button className="flex-1 rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors">
                🔧 Piezas
              </button>
            </div>
          </div>

          <ColorControls />
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8">
        <div className="relative w-full h-full rounded-[2rem] bg-[#111418] shadow-[inset_0_0_120px_rgba(0,0,0,0.45)] border border-white/10 overflow-hidden">
          <div className="absolute bottom-6 left-6 text-left text-slate-400 text-xs z-10 pointer-events-none opacity-90">
            Arrastra para rotar • Scroll para zoom
          </div>

          <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <CanvasWrapper />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
