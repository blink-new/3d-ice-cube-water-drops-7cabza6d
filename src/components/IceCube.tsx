import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

export function IceCube() {
  const cubeRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
      cubeRef.current.rotation.y += 0.01
    }
  })

  // Ice material with transparency and refraction
  const iceMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.8, 0.95, 1),
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      ior: 1.31, // Index of refraction for ice
      reflectivity: 0.3,
    })
  }, [])

  return (
    <Box ref={cubeRef} args={[2, 2, 2]} material={iceMaterial} castShadow>
      {/* Inner glow effect */}
      <Box args={[1.8, 1.8, 1.8]}>
        <meshBasicMaterial 
          color={0x87CEEB} 
          transparent 
          opacity={0.1}
        />
      </Box>
    </Box>
  )
}