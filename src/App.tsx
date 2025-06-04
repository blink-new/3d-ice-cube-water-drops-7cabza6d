import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Sphere, Box } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Ice Cube Component
function IceCube() {
  const cubeRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      cubeRef.current.rotation.y += 0.005
    }
  })

  return (
    <Box ref={cubeRef} args={[2, 2, 2]} castShadow>
      <meshPhysicalMaterial 
        color="#e0f6ff"
        transparent 
        opacity={0.8}
        roughness={0.05}
        transmission={0.9}
        thickness={0.5}
        ior={1.31}
        reflectivity={0.3}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Box>
  )
}

// Water Drop Component
function WaterDrop({ position, delay }: { position: [number, number, number], delay: number }) {
  const dropRef = useRef<THREE.Mesh>(null)
  const startTime = useRef(Date.now())
  
  useFrame(() => {
    if (dropRef.current) {
      const elapsed = (Date.now() - startTime.current) / 1000
      const adjustedTime = elapsed - delay
      
      if (adjustedTime > 0) {
        // Physics simulation
        const fallSpeed = 2.5
        const initialY = position[1]
        const newY = initialY - fallSpeed * adjustedTime
        
        // Reset when drop falls too far
        if (newY < -3) {
          startTime.current = Date.now()
        } else {
          dropRef.current.position.y = newY
          // Add slight wobble
          dropRef.current.position.x = position[0] + Math.sin(adjustedTime * 8) * 0.03
          // Scale effect as it falls
          const scale = Math.max(0.3, 1 - adjustedTime * 0.2)
          dropRef.current.scale.setScalar(scale)
        }
      }
    }
  })

  return (
    <Sphere 
      ref={dropRef} 
      args={[0.08, 8, 6]} 
      position={position}
      castShadow
    >
      <meshPhysicalMaterial 
        color="#4da6d9"
        transparent 
        opacity={0.9}
        roughness={0}
        transmission={0.95}
        thickness={0.1}
        ior={1.33}
      />
    </Sphere>
  )
}

// Main App Component
function App() {
  // Generate water drops
  const waterDrops = useMemo(() => [
    { position: [-0.8, 1.8, 0.5] as [number, number, number], delay: 0 },
    { position: [0.4, 1.9, -0.3] as [number, number, number], delay: 0.6 },
    { position: [-0.3, 1.7, 0.9] as [number, number, number], delay: 1.2 },
    { position: [0.7, 2.0, 0.1] as [number, number, number], delay: 1.8 },
    { position: [-0.6, 1.6, -0.8] as [number, number, number], delay: 2.4 },
    { position: [0.2, 1.8, 0.7] as [number, number, number], delay: 3.0 },
    { position: [-0.1, 1.9, -0.4] as [number, number, number], delay: 3.6 },
    { position: [0.5, 1.7, -0.6] as [number, number, number], delay: 4.2 },
  ], [])

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-100 via-blue-200 to-blue-400">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.3} color="#87CEEB" />
        <pointLight position={[5, -5, 5]} intensity={0.2} color="#ffffff" />
        
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
        
        {/* Environment and effects */}
        <Environment preset="city" background={false} />
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.3} 
          scale={8} 
          blur={2} 
          far={1.5}
        />
        
        {/* Controls */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 1.8}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.8}
        />
        
        {/* Atmospheric fog */}
        <fog attach="fog" args={['#87CEEB', 5, 20]} />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-8 left-8 text-white z-10">
        <h1 className="text-5xl font-bold mb-3 drop-shadow-2xl text-blue-50">
          3D Ice Cube
        </h1>
        <p className="text-xl opacity-90 drop-shadow-lg text-blue-100">
          Watch the water drops fall from the melting ice
        </p>
        <div className="mt-4 text-sm opacity-75 text-blue-200">
          Drag to rotate • Scroll to zoom
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-8 right-8 text-white text-sm opacity-60">
        Rendered with Three.js + React
      </div>
    </div>
  )
}

export default App