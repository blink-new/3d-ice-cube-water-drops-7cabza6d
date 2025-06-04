import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function TestCube() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  )
}

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-200 to-blue-300">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <TestCube />
        <OrbitControls />
      </Canvas>
      
      <div className="absolute top-8 left-8 text-white">
        <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
          3D Ice Cube Test
        </h1>
        <p className="text-lg opacity-90 drop-shadow">
          Testing Three.js setup
        </p>
      </div>
    </div>
  )
}

export default App