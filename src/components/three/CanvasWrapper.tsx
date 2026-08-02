import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import CamionModel from './CamionModel';
import StudioLights from './StudioLights';

interface CanvasWrapperProps {
  height?: string;
  width?: string;
}

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({ height = '100vh', width = '100%' }) => {
  return (
    <div style={{ width, height, background: '#0b0d0f' }}>
      <Canvas
        shadows
        camera={{ position: [5, 3, 6], fov: 45 }}
        gl={{ antialias: true, toneMapping: 2, toneMappingExposure: 1.2 }}
        dpr={[1, 2]}
      >
        <StudioLights />
        <Environment preset="studio" background={false} />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.6} scale={8} blur={2.5} far={4} />
        <OrbitControls enablePan enableZoom enableRotate minDistance={2} maxDistance={15} target={[0, 0.5, 0]} />

        <CamionModel scale={0.8} position={[0, 0.2, 0]} />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
