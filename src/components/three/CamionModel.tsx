import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { useTruckStore } from '../../store/truckStore';
import { applyMaterialToMesh, classifyMesh } from '../../utils/materialUtils';

interface CamionModelProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const CamionModel: React.FC<CamionModelProps> = ({
  scale = 0.8,
  position = [0, -0.5, 0],
  rotation = [0, 0, 0],
}) => {
  const gltf = useGLTF('/models/camion.glb');
  const scene = gltf.scene;
  const groupRef = useRef<Group | null>(null);

  const { color, metalness, roughness, setModelLoaded, registerMesh } = useTruckStore();

  const materialConfig = useMemo(() => ({ color, metalness, roughness }), [color, metalness, roughness]);

  useEffect(() => {
    if (!scene || !groupRef.current) return;

    let meshCounter = 0;

    // Recorremos el grafo de escena y aplicamos material a TODAS las mallas
    // Comentarios en español: traverse visita todos los nodos hijos recursivamente
    scene.traverse((child) => {
      // Filtrar solo Mesh
      if ((child as any).isMesh) {
        const mesh = child as Mesh;
        const meshName = mesh.name && mesh.name.length ? mesh.name : `mesh_${meshCounter}`;
        meshCounter++;

        // DEBUG: imprimir en consola el nombre de TODAS las mallas
        // Uso console.groupCollapsed para una salida visible y fácil de inspeccionar
        // Esto te permitirá copiar el nombre exacto de la malla frontal después
        // de inspeccionar la consola del navegador.
        // Ejemplo en consola: Mesh name: Chassis_001
        // (Se muestran también los índices para trazabilidad)
        // eslint-disable-next-line no-console
        console.groupCollapsed(`[CamionModel] Mesh #${meshCounter}: ${meshName}`);
        // eslint-disable-next-line no-console
        console.log('mesh object:', mesh);
        // eslint-disable-next-line no-console
        console.groupEnd();

        // Registrar la malla en el store para UI/inspección (opcional)
        registerMesh(meshName, {
          meshName,
          group: 'unknown',
          applyColor: true,
          applyMaterial: true,
        });

        // TEMP: aplicar color principal y propiedades a ABSOLUTAMENTE todas las mallas
        applyMaterialToMesh(mesh, {
          color: materialConfig.color,
          metalness: materialConfig.metalness,
          roughness: materialConfig.roughness,
        });
      }
    });

    setModelLoaded(true);
    // eslint-disable-next-line no-console
    console.log(`[CamionModel] Mallas procesadas (total): ${meshCounter}`);

    return () => {
      // cleanup opcional
    };
  }, [scene, materialConfig, registerMesh, setModelLoaded]);

  useEffect(() => {
    return () => setModelLoaded(false);
  }, [setModelLoaded]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

export default CamionModel;

// Drei GLTF loader typings helper (silence auto) - keep loader cache active
useGLTF.preload && useGLTF.preload('/models/camion.glb');
