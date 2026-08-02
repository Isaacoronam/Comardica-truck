import React from 'react';

const StudioLights: React.FC = () => {
  return (
    <>
      <directionalLight position={[6, 5, 6]} intensity={1.8} color="#fff5e6" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-4, 3, 5]} intensity={0.6} color="#d4e8ff" />
      <directionalLight position={[-3, 4, -8]} intensity={0.8} color="#ffd700" />
      <directionalLight position={[0, 10, 0]} intensity={0.3} color="#ffffff" />
      <pointLight position={[0, 2, 3]} intensity={0.4} color="#ff6b6b" distance={6} />
      <ambientLight intensity={0.3} color="#404060" />
    </>
  );
};

export default StudioLights;
