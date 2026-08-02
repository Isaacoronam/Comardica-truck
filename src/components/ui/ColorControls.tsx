import React from 'react';
import { useTruckStore } from '../../store/truckStore';

const ColorControls: React.FC = () => {
  const { color, setColor, metalness, setMetalness, roughness, setRoughness, resetToDefaults } = useTruckStore();

  return (
    <div style={{ width: 320 }} className="panel">
      <h2 style={{ color: 'white', marginBottom: 12 }}>🎨 Personalización</h2>

      <div style={{ marginBottom: 12 }}>
        <label style={{ color: 'white', display: 'block', marginBottom: 6 }}>Color principal</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <input value={color} onChange={(e) => setColor(e.target.value)} style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 8px' }} />
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ color: 'white', display: 'block', marginBottom: 6 }}>Metalicidad: {metalness.toFixed(2)}</label>
        <input type="range" min={0} max={1} step={0.01} value={metalness} onChange={(e) => setMetalness(parseFloat(e.target.value))} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ color: 'white', display: 'block', marginBottom: 6 }}>Rugosidad: {roughness.toFixed(2)}</label>
        <input type="range" min={0} max={1} step={0.01} value={roughness} onChange={(e) => setRoughness(parseFloat(e.target.value))} />
      </div>

      <div>
        <button onClick={() => resetToDefaults()} style={{ padding: '8px 12px' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ColorControls;
