import React from 'react';
import CanvasWrapper from './components/three/CanvasWrapper';
import ColorControls from './components/ui/ColorControls';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-[#f5f5f0] overflow-hidden font-sans text-slate-800">
      <aside className="w-[350px] bg-white shadow-2xl flex flex-col z-10 h-full">
        <div className="p-8 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-black mb-8 flex items-center gap-2 tracking-tight">
            <span className="text-3xl">🚛</span> COMARDICATRUCK
          </h1>

          <div className="mb-6 flex gap-4 border-b border-gray-100 pb-4">
            <button className="font-bold text-blue-600 border-b-2 border-blue-600 pb-1">
              🎨 Pintura
            </button>
            <button className="font-semibold text-gray-400 hover:text-gray-600 transition-colors pb-1">
              🔧 Piezas
            </button>
          </div>

          <div className="space-y-6">
            <ColorControls />
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8">
        <div className="w-full h-full bg-[#1a1a1a] rounded-[2rem] shadow-inner overflow-hidden relative border border-gray-800">
          <div className="absolute bottom-6 left-0 right-0 text-center text-gray-400 text-sm z-10 pointer-events-none opacity-60">
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
