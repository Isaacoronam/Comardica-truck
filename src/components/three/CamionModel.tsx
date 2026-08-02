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

    // Recorremos el grafo de escena y aplicamos material solo a mallas
    // Comentarios en español: traverse visita todos los nodos hijos recursivamente
    scene.traverse((child) => {
      // Filtrar solo Mesh
      if ((child as any).isMesh) {
        const mesh = child as Mesh;
        const meshName = mesh.name && mesh.name.length ? mesh.name : `mesh_${meshCounter}`;
        meshCounter++;

        // Clasificar la malla por nombre (body, wheels, bumpers, details)
        const group = classifyMesh(meshName);

        // Registrar la malla en el store para UI/inspección
        registerMesh(meshName, {
          meshName,
          group,
          applyColor: group === 'body' || group === 'bumpers',
          applyMaterial: true,
        });

        const shouldApplyColor = group === 'body' || group === 'bumpers';
        const isWheel = group === 'wheels';

        if (shouldApplyColor) {
          // Aplicamos el color principal y las propiedades metal/roughness
          applyMaterialToMesh(mesh, {
            color: materialConfig.color,
            metalness: materialConfig.metalness,
            roughness: materialConfig.roughness,
          });
        } else if (isWheel) {
          // Ruedas: negro mate conservando cierta coherencia de material
          applyMaterialToMesh(mesh, {
            color: '#111111',
            metalness: Math.min(materialConfig.metalness, 0.15),
            roughness: Math.max(materialConfig.roughness, 0.85),
          });
        } else {
          // Detalles: ajustar sutilmente metalicidad/rugosidad si es MeshStandardMaterial
          if (mesh.material instanceof MeshStandardMaterial) {
            const existing = mesh.material as MeshStandardMaterial;
            existing.metalness = Math.min(existing.metalness + materialConfig.metalness * 0.25, 1);
            existing.roughness = Math.max(existing.roughness - materialConfig.roughness * 0.15, 0);
            existing.needsUpdate = true;
          }
        }
      }
    });

    setModelLoaded(true);
    // eslint-disable-next-line no-console
    console.log(`[CamionModel] Mallas procesadas: ${meshCounter}`);

    return () => {
      // cleanup: opcional
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
