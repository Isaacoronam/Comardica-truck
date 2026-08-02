import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  TruckStore,
  TruckState,
  MeshConfig,
  DEFAULT_TRUCK_CONFIG,
} from '../types/truck.types';

const initialState: TruckState = {
  color: DEFAULT_TRUCK_CONFIG.color,
  metalness: DEFAULT_TRUCK_CONFIG.metalness,
  roughness: DEFAULT_TRUCK_CONFIG.roughness,
  isModelLoaded: false,
  meshConfigs: {},
};

export const useTruckStore = create<TruckStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setColor: (color: string) => {
          set(() => ({ color }), false, 'truck/setColor');
        },
        setMetalness: (value: number) => {
          const clamped = Math.max(0, Math.min(1, value));
          set(() => ({ metalness: clamped }), false, 'truck/setMetalness');
        },
        setRoughness: (value: number) => {
          const clamped = Math.max(0, Math.min(1, value));
          set(() => ({ roughness: clamped }), false, 'truck/setRoughness');
        },
        resetToDefaults: () => {
          set(
            () => ({
              color: DEFAULT_TRUCK_CONFIG.color,
              metalness: DEFAULT_TRUCK_CONFIG.metalness,
              roughness: DEFAULT_TRUCK_CONFIG.roughness,
            }),
            false,
            'truck/resetToDefaults'
          );
        },
        setModelLoaded: (loaded: boolean) => {
          set(() => ({ isModelLoaded: loaded }), false, 'truck/setModelLoaded');
        },
        registerMesh: (meshName: string, config: MeshConfig) => {
          set((state) => ({ meshConfigs: { ...state.meshConfigs, [meshName]: config } }), false, 'truck/registerMesh');
        },
        getMeshConfig: (meshName: string) => {
          return get().meshConfigs[meshName];
        },
      }),
      {
        name: 'truck-storage',
        partialize: (state) => ({
          color: state.color,
          metalness: state.metalness,
          roughness: state.roughness,
        }),
      }
    ),
    { name: 'TruckStore', enabled: import.meta.env.DEV }
  )
);
