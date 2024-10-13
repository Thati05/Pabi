"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload('/Shampoo_5.glb');

const flavorTextures = {
pineapple: "/labels/pineapple.png",
citrus: "/labels/Citrus.png",
peach: "/labels/peach.png",
strawberry: "/labels/strawberry.png",
watermelon: "/labels/watermelon.png",
};

const bottleMaterial = new THREE.MeshStandardMaterial({
  roughness: 0,
   color: "#fff",
});
const lidMaterial = new THREE.MeshStandardMaterial({
  roughness: 0,
   color: "#000",
});

export type ShampooProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function Shampoo({
  flavor = "peach",
  scale = 0.5,
  ...props
}: ShampooProps) {
  const { nodes } = useGLTF('/Shampoo_5.glb');

  const labels = useTexture(flavorTextures);
  
  // Fixes upside down labels
  labels.strawberry.flipY = false;
  labels.pineapple.flipY = false;
  labels.watermelon.flipY = false;
  labels.citrus.flipY = false;
  labels.peach.flipY = false;

  const label = labels[flavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
    <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cylinder as THREE.Mesh).geometry}
        material={bottleMaterial}
        position={[0.036, 0.034, 0.002]}
        rotation={[0,-2,0]}
       
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cylinder002 as THREE.Mesh).geometry}
        material={lidMaterial}
        position={[0.033, 1.336, -0.005]}
        scale={1.025}
       
        
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Label as THREE.Mesh).geometry}
        material={bottleMaterial}
        position={[0.036, 0.078, 0.002]}
        rotation={[0,-2,0]}
        scale={0.999}
        
        

      >
       <meshStandardMaterial roughness={0.15} map={label} />

      </mesh>
    </group>
  );
}
