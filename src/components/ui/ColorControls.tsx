import React from 'react';
import { useTruckStore } from '../../store/truckStore';

const PALETTE = [
  '#000000', '#FFFFFF', '#888888',
  '#FF4D4D', '#FF7A2D', '#FFD54F',
  '#4CAF50', '#2196F3', '#6A1B9A',
];

const ColorControls: React.FC = () => {
  const { color, setColor, resetToDefaults } = useTruckStore();

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-white/20 w-40">
      <h2 className="text-white font-semibold mb-3 text-sm">🎨 Paleta</h2>

      <div className="grid grid-cols-3 gap-3">
        {PALETTE.map((c) => {
          const selected = c.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full focus:outline-none ${selected ? 'ring-2 ring-white' : ''}`}
              style={{ background: c }}
              aria-label={`Color ${c}`}
            />
          );
        })}
      </div>

      <div className="mt-3">
        <button onClick={() => resetToDefaults()} className="text-sm text-white/80 underline">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ColorControls;
