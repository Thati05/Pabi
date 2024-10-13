"use client";

import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

// Using Object3D as a container to efficiently set and update positions for each bubble instance
const o = new THREE.Object3D();

// Customizations in case you want to use this in other scenes.
export function Bubbles({
  count = 70,
  speed = 5,
  bubbleSize = 0.4,
  opacity = 0.2,
  repeat = true,
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // An array that holds all of our bubbles' speeds
  const bubbleSpeed = useRef(new Float32Array(count));
  const minSpeed = speed * 0.001;
  const maxSpeed = speed * 0.005;

  const { scene } = useThree(); // Access the scene

  // Create geometry and material for our mesh
  const geometry = new THREE.SphereGeometry(bubbleSize, 16, 16);

 // Use MeshPhysicalMaterial to support transmission and other physical properties
 const material = new THREE.MeshPhysicalMaterial({
  transparent: true,
  opacity: opacity,
  transmission: 0.9,   // High transmission for clear bubbles
  metalness: 0.5,      // Reflective surface for bubble highlights
  roughness: 0.1,      // Smooth surface for realistic reflections
  clearcoat: 1,        // Glossy finish on bubbles
  clearcoatRoughness: 0, // Perfectly smooth clearcoat
  thickness: 0.1,      // Thin layer effect for soap bubbles
  envMapIntensity: 1,  // Boost reflections
  ior: 1.33,           // Index of refraction typical for soap/water
  color: new THREE.Color(0xffffff), // Set bubble color to white
});


 // Add lighting to the scene
 useEffect(() => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft ambient light
  const pointLight = new THREE.PointLight(0xffffff, 1.0); // Stronger point light for reflections
  pointLight.position.set(5, 5, 5);

  scene.add(ambientLight, pointLight);

  // Clean up lights on unmount
  return () => {
    scene.remove(ambientLight, pointLight);
  };
}, [scene]);



  // Runs once to create and place our bubbles
  useEffect(() => {
    // Access the instanced mesh
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    // Create {count} number of bubbles in random locations
    for (let i = 0; i < count; i++) {
      o.position.set(
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4),
      );

      // Update matrix so that the position is applied
      o.updateMatrix();
      // Apply the updated matrix from Object3D to the mesh at index i.
      mesh.setMatrixAt(i, o.matrix);

      // Set a random bubble speed
      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
    }

    mesh.instanceMatrix.needsUpdate = true;
    return () => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    };
  }, [count, minSpeed, maxSpeed]);

  // useFrame runs on every animation frame
  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

   

    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, o.matrix);
      o.position.setFromMatrixPosition(o.matrix);
      // Move bubble upwards by its speed
      o.position.y += bubbleSpeed.current[i];

      // Reset bubble position if it moves off the top of the screen
      if (o.position.y > 4 && repeat) {
        o.position.y = -2; // Reset to bottom
        o.position.x = gsap.utils.random(-4, 4);
        o.position.z = gsap.utils.random(0, 8);
      }

      o.updateMatrix();
      meshRef.current.setMatrixAt(i, o.matrix);
    }

    // Mark the instance matrix as needing an update, so the new positions of the bubbles are rendered.
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      position={[0, 0, 0]}
      material={material}
      geometry={geometry}
    ></instancedMesh>
  );
}
