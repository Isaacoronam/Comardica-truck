import React from 'react';
import { useTruckStore } from '../../store/truckStore';

const PALETTE = [
  '#0B0B0B', '#F8F8F5', '#BDBDBD',
  '#FF3B30', '#FF8C42', '#FFD166',
  '#2ECC71', '#2480E3', '#6C4ACF',
  '#FFC0CB', '#4B5563', '#1F2937',
];

const ColorControls: React.FC = () => {
  const { color, setColor, resetToDefaults } = useTruckStore();

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl">
      <h2 className="text-gray-900 font-bold text-lg mb-4">🎨 Paleta Premium</h2>

      <div className="grid grid-cols-3 gap-4">
        {PALETTE.map((c) => {
          const selected = c.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-12 h-12 rounded-full transform transition-transform duration-150 focus:outline-none ${selected ? 'ring-4 ring-offset-2 ring-white' : 'hover:scale-110 hover:shadow-lg'}`}
              style={{ background: c }}
              aria-label={`Color ${c}`}
            />
          );
        })}
      </div>

      <div className="mt-6">
        <button
          onClick={() => resetToDefaults()}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ColorControls;
