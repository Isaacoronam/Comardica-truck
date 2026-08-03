import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import CamionModel from './CamionModel';
import StudioLights from './StudioLights';

interface CanvasWrapperProps {
  height?: string;
  width?: string;
}

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({ height = '100vh', width = '100%' }) => {
  const [modelExists, setModelExists] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    // Verificar si el modelo existe realizando un fetch HEAD
    fetch('/models/camion.glb', { method: 'HEAD' })
      .then((res) => {
        if (!mounted) return;
        setModelExists(res.ok);
      })
      .catch(() => {
        if (!mounted) return;
        setModelExists(false);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div style={{ width, height, background: '#0b0d0f' }}>
      <Canvas
        shadows
        camera={{ position: [5, 3, 6], fov: 45 }}
        gl={{ antialias: true, toneMapping: 2, toneMappingExposure: 1.2 }}
        dpr={[1, 2]}
      >
        {modelExists === false && (
          <mesh>
            {/* Placeholder invisible: si el modelo falta, no renderizamos el CamionModel */}
          </mesh>
        )}
        <StudioLights />
        <Environment preset="studio" background={false} />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.6} scale={8} blur={2.5} far={4} />
        <OrbitControls enablePan enableZoom enableRotate minDistance={2} maxDistance={15} target={[0, 0.5, 0]} />

        {modelExists === true && <CamionModel scale={0.8} position={[0, 0.2, 0]} />}
        {modelExists === null && (
          // Mientras verificamos la existencia del GLB, no renderizamos el modelo
          <group />
        )}
      </Canvas>
      {modelExists === false && (
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', background: 'rgba(0,0,0,0.6)', padding: 16, borderRadius: 8 }}>
          <p style={{ margin: 0 }}>Modelo `camion.glb` no encontrado en <strong>/models/camion.glb</strong>.</p>
          <p style={{ margin: '8px 0 0' }}>Para descargarlo localmente ejecuta:</p>
          <pre style={{ background: '#111', padding: 8, color: '#9ae6b4' }}>npm run download-model -- &lt;URL_DEL_MODELO&gt;</pre>
          <p style={{ margin: '8px 0 0' }}>Luego recarga la página.</p>
        </div>
      )}
    </div>
  );
};

export default CanvasWrapper;
