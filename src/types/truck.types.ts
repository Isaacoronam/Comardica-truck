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

/*
  === INSTRUCCIONES (Solo para desarrollador) ===

  Después de ejecutar el `CamionModel` en modo debug verás en la consola
  el nombre exacto de cada malla dentro de `camion.glb`.

  Para habilitar el modo "Solo Parte Delantera" pega el nombre EXACTO de la
  malla de la cabina frontal en la constante `FRONT_CAB_MESH` que aparece
  a continuación, reemplazando el valor 'NOMBRE_MALLA_CABINA'. Ejemplo:

    export const FRONT_CAB_MESH = 'Cabina_Front_01';

  Luego podrás usar `FRONT_CAB_MESH` en `CamionModel.tsx` para aplicar colores
  únicamente a esa malla.

  IMPORTANTE: usa el nombre tal cual aparece en consola (sensible a mayúsculas).
*/
export const FRONT_CAB_MESH = 'NOMBRE_MALLA_CABINA';
