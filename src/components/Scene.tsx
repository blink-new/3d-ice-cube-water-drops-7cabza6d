import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { IceCube } from './IceCube'
import { WaterDrop } from './WaterDrop'

export function Scene() {
  // Generate water drops with fixed positions for testing
  const waterDrops = [
    { position: [-0.8, 1.5, 0.5] as [number, number, number], delay: 0 },
    { position: [0.3, 1.7, -0.4] as [number, number, number], delay: 0.5 },
    { position: [-0.2, 1.6, 0.8] as [number, number, number], delay: 1.0 },
    { position: [0.7, 1.8, 0.2] as [number, number, number], delay: 1.5 },
    { position: [-0.5, 1.4, -0.7] as [number, number, number], delay: 2.0 },
  ]

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-200 to-blue-300">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        shadows
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#87CEEB" />
        
        {/* Main ice cube */}
        <IceCube />
        
        {/* Water drops */}
        {waterDrops.map((drop, index) => (
          <WaterDrop
            key={index}
            position={drop.position}
            delay={drop.delay}
          />
        ))}
        
        {/* Environment and controls */}
        <Environment preset="city" />
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={2}
        />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-8 left-8 text-white">
        <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
          3D Ice Cube
        </h1>
        <p className="text-lg opacity-90 drop-shadow">
          Watch the water drops fall
        </p>
      </div>
    </div>
  )
}