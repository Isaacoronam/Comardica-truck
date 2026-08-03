import React from 'react';
import { useTruckStore } from '../../store/truckStore';

const PALETTE = [
  '#000000', '#FFFFFF', '#64748b',
  '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#3b82f6', '#a855f7',
];

const ColorControls: React.FC = () => {
  const { color, setColor, resetToDefaults } = useTruckStore();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Color Principal
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {PALETTE.map((colorItem) => {
            const selected = colorItem.toLowerCase() === color.toLowerCase();
            return (
              <button
                key={colorItem}
                onClick={() => setColor(colorItem)}
                className={`w-14 h-14 rounded-full shadow-sm transition-all duration-200 ease-in-out focus:outline-none ${selected ? 'ring-4 ring-offset-2 ring-blue-500 scale-110' : 'ring-1 ring-gray-200 hover:scale-110 hover:shadow-lg'}`}
                style={{ backgroundColor: colorItem }}
                title={`Color ${colorItem}`}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={() => resetToDefaults()}
          className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <span>🔄</span> Restablecer Diseño
        </button>
      </div>
    </div>
  );
};

export default ColorControls;
