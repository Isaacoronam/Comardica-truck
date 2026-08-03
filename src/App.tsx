import React from 'react';
import CanvasWrapper from './components/three/CanvasWrapper';
import ColorControls from './components/ui/ColorControls';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#f5f5f0]">
      <div className="max-w-[1200px] mx-auto h-full flex">
        {/* Left panel */}
        <aside className="w-[350px] min-h-screen p-8 bg-white shadow-xl">
          <div className="sticky top-8">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-4">🚛 COMARDICATRUCK</h1>
            <p className="text-sm text-gray-500 mb-6">Personaliza la pintura del camión en tiempo real.</p>
            <ColorControls />
            <div className="mt-6 text-xs text-gray-400">Arrastra para rotar • Scroll para zoom</div>
          </div>
        </aside>

        {/* Right main area */}
        <main className="flex-1 p-6">
          <div className="bg-[#1a1a1a] rounded-3xl m-6 shadow-2xl p-6 h-[80vh]">
            <CanvasWrapper />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
