import React from 'react';
import { useTruckStore } from '../../store/truckStore';

const PALETTE = [
  '#0f172a', '#ffffff', '#64748b',
  '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#3b82f6', '#a855f7',
  '#d97706', '#0891b2', '#ec4899',
  '#334155', '#475569', '#0f766e',
];

const ColorControls: React.FC = () => {
  const { color, setColor, resetToDefaults } = useTruckStore();

  return (
    <div className="bg-[#0f1620] rounded-[2rem] border border-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-3">Color Principal</p>
        <h2 className="text-2xl font-black tracking-tight text-white">Pintura Premium</h2>
        <p className="mt-2 text-sm text-slate-400">Selecciona el acabado de pintura para tu camión.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {PALETTE.map((colorItem) => {
          const selected = colorItem.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={colorItem}
              onClick={() => setColor(colorItem)}
              className={`relative flex items-center justify-center rounded-full transition-all duration-200 ease-in-out focus:outline-none ${selected ? 'scale-105 ring-4 ring-offset-2 ring-sky-500/80 shadow-[0_25px_60px_rgba(56,189,248,0.25)]' : 'hover:scale-105 hover:shadow-[0_18px_45px_rgba(15,23,42,0.2)]'}`}
              style={{ backgroundColor: colorItem, width: '56px', height: '56px' }}
              title={`Color ${colorItem}`}
            >
              {selected && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-lg">✓</span>
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setColor('#ffffff')}
          className="flex flex-col items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-200 ease-in-out hover:scale-105 hover:border-sky-400 hover:text-white"
          style={{ width: '56px', height: '56px' }}
          title="Selector de Color Personalizado"
        >
          <span className="text-xl">+</span>
          <span className="text-[10px] mt-1 uppercase tracking-[0.25em]">Custom</span>
        </button>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[inset_0_0_30px_rgba(255,255,255,0.03)]">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-3">Acabado</p>
          <div className="grid gap-3">
            <div className="rounded-3xl bg-[#111827] p-4">
              <p className="text-sm font-semibold text-white mb-3">Brillo</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Mate</span>
                <span>Alto Brillo</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-3/5 rounded-full bg-sky-500" />
              </div>
            </div>

            <div className="rounded-3xl bg-[#111827] p-4">
              <p className="text-sm font-semibold text-white mb-3">Metálico</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>No Metálico</span>
                <span>Alto</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-2/5 rounded-full bg-sky-500" />
              </div>
            </div>

            <div className="rounded-3xl bg-[#111827] p-4">
              <p className="text-sm font-semibold text-white mb-3">Efecto</p>
              <div className="grid grid-cols-3 gap-2">
                <button className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300 hover:bg-sky-500/20 transition">Perla</button>
                <button className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300 hover:bg-sky-500/20 transition">Escamas</button>
                <button className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300 hover:bg-sky-500/20 transition">Mate</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => resetToDefaults()}
          className="w-full rounded-[1.75rem] bg-slate-800 px-5 py-4 text-sm font-semibold text-white shadow-[0_25px_80px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <span>🔄</span> Restablecer Diseño
          </span>
        </button>
      </div>
    </div>
  );
};

export default ColorControls;
