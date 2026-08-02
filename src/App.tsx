import React from 'react';
import CanvasWrapper from './components/three/CanvasWrapper';
import ColorControls from './components/ui/ColorControls';

const App: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#0b0d0f' }}>
      <CanvasWrapper />

      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 20 }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: 28 }}>🚛 COMARDICATRUCK</h1>
        <div style={{ marginTop: 12 }}>
          <ColorControls />
        </div>
      </div>
    </div>
  );
};

export default App;
