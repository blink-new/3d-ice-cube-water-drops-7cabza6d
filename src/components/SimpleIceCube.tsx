import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

export function SimpleIceCube() {
  const cubeRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
      cubeRef.current.rotation.y += 0.01
    }
  })

  return (
    <Box ref={cubeRef} args={[2, 2, 2]} castShadow>
      <meshStandardMaterial 
        color="#87CEEB"
        transparent 
        opacity={0.8}
        roughness={0.1}
        metalness={0.1}
      />
    </Box>
  )
}