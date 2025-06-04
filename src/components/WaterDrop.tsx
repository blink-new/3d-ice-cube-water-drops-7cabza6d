import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface WaterDropProps {
  position: [number, number, number]
  delay: number
}

export function WaterDrop({ position, delay }: WaterDropProps) {
  const dropRef = useRef<THREE.Mesh>(null)
  const startTime = useRef(Date.now())
  
  useFrame(() => {
    if (dropRef.current) {
      const elapsed = (Date.now() - startTime.current) / 1000
      const adjustedTime = elapsed - delay
      
      if (adjustedTime > 0) {
        // Drop physics
        const fallSpeed = 3
        const initialY = position[1]
        const newY = initialY - fallSpeed * adjustedTime
        
        // Reset when drop falls too far
        if (newY < -5) {
          startTime.current = Date.now()
        } else {
          dropRef.current.position.y = newY
        }
        
        // Add slight wobble for realism
        dropRef.current.position.x = position[0] + Math.sin(adjustedTime * 10) * 0.05
        dropRef.current.scale.setScalar(Math.max(0.1, 1 - adjustedTime * 0.3))
      }
    }
  })

  const waterMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.4, 0.7, 1),
      transparent: true,
      opacity: 0.8,
      roughness: 0,
      transmission: 0.95,
      thickness: 0.1,
      ior: 1.33, // Water's index of refraction
    })
  }, [])

  return (
    <Sphere 
      ref={dropRef} 
      args={[0.05, 8, 6]} 
      position={position}
      material={waterMaterial}
      castShadow
    />
  )
}