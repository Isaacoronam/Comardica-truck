/**
 * Configuración completa del estado del camión
 * Todas las propiedades de pintura son gestionadas centralmente
 */
export interface MeshConfig {
  meshName: string;
  group: 'body' | 'wheels' | 'bumpers' | 'details' | 'unknown';
  applyColor: boolean;
  applyMaterial: boolean;
}

export interface TruckState {
  color: string; // hex
  metalness: number; // 0-1
  roughness: number; // 0-1
  isModelLoaded: boolean;
  meshConfigs: Record<string, MeshConfig>;
}

export interface TruckActions {
  setColor: (color: string) => void;
  setMetalness: (value: number) => void;
  setRoughness: (value: number) => void;
  resetToDefaults: () => void;
  setModelLoaded: (loaded: boolean) => void;
  registerMesh: (meshName: string, config: MeshConfig) => void;
  getMeshConfig: (meshName: string) => MeshConfig | undefined;
}

export type TruckStore = TruckState & TruckActions;

export const DEFAULT_TRUCK_CONFIG = {
  color: '#FF4D4D',
  metalness: 0.3,
  roughness: 0.7,
} as const;

export const MESH_GROUPS = {
  BODY: ['chasis', 'carroceria', 'cabina', 'capot', 'puertas', 'body', 'chassis'],
  WHEELS: ['rin', 'llanta', 'neumatico', 'wheel', 'tire', 'rim'],
  BUMPERS: ['parachoques', 'bumper', 'defensa', 'bumper'],
  DETAILS: ['faros', 'luces', 'espejos', 'manijas', 'parrilla', 'grill', 'headlight'],
} as const;
