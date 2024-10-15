"use client";

import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { Content } from "@prismicio/client";
import { Cloud, Clouds, Environment, OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";

import Floating from "@/components/Floating";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP,ScrollTrigger)

type SkyDiveProps = {
  sentence: string | null;
  flavor: Content.SkydiveSliceDefaultPrimary["flavor"];
};

export default function Scene({ sentence, flavor }: SkyDiveProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bottleRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordRef = useRef<THREE.Group>(null);


  const ANGLE = 75 * (Math.PI / 180)

  const getXPosition = (distance:number) => distance * Math.cos(ANGLE)
  const getYPosition = (distance:number) => distance * Math.sin(ANGLE)

  const getXYPosition = (distance:number) => ({
    x: getXPosition(distance),
    y:getYPosition(-1*distance)


  })


 {/*Animations  */}

 useGSAP(() => {
  if(
    !cloudsRef.current ||
    !cloud1Ref.current ||
    !cloud2Ref.current ||
    !bottleRef.current ||
    !wordRef.current ||
    !groupRef.current 
  
  )
  return;

  {/*Setting the initial positions of the objects 
    */}
    gsap.set(cloudsRef.current.position, {z:10});
    gsap.set(bottleRef.current.position,{
      ...getXYPosition(-4),
    });
    
    gsap.set(wordRef.current.children.map((word) => word.position),
    {...getXYPosition(7), z:2},
  );

//Spinning bottle
gsap.to(bottleRef.current.rotation,
  {
    y: Math.PI*2,
    duration:1.7,
    repeat:-1,
    ease: "none"
  
  }
);

//Infinite cloud movement 

const DISTANCE = 15;
const DURATION = 6;

gsap.set([cloud1Ref.current.position, cloud2Ref.current.position],
  {
    ...getXYPosition(DISTANCE)
  }
);
gsap.to(cloud1Ref.current.position, {
  y: `+=${getYPosition(DISTANCE*2)}`,
  x: `+=${getXPosition(DISTANCE*-2)}`,
  ease:'none',
  repeat: -1,
  duration: DURATION

});
gsap.to(cloud2Ref.current.position, {
  y: `+=${getYPosition(DISTANCE*2)}`,
  x: `+=${getXPosition(DISTANCE*-2)}`,
  ease:'none',
  repeat: -1,
  delay: DURATION /2,
  duration: DURATION

});

const scrollTL = gsap.timeline({
  scrollTrigger:{
    trigger:'.skydive',
    pin: true,
    start:"top top",
    end:'+=2000',
    scrub:1.5
  }
})
scrollTL
.to("body",
  {
    backgroundColor:'#C0F0F5',
    overwrite:"auto",
    duration:.1

  }
)

.to(cloudsRef.current.position,{z:0, duration:.3}, 0)
.to(bottleRef.current.position,{

  x:0,
  y:0, 
  duration:0.3,
  ease:"back.out(1.7)"
}

)

.to(wordRef.current.children.map((word) => word.position),
{
  keyframes: [
    { x: 0, y: 0, z: -1 }, // Initial position
    { ...getXYPosition(-7), z: -7 } // Target position
  ],
  stagger: 0.3,
},
0,
)
.to(bottleRef.current.position,{
  ...getXYPosition(4),
  duration:0.5, 
  ease: " back.in(1.7?"
})




 })





  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <Floating 
        ref={bottleRef} flavor={flavor}
        floatIntensity={3}
        rotationIntensity={0} //Setting the floating roattion equals to 0 decreases the wobbliness of the bottle 
        floatSpeed={3}
        
        ></Floating>
      </group>

      {/* Text */}
      <group ref={wordRef}>
        {sentence && <ThreeTextBold sentence={sentence} color="#F97315" />}
      </group>

      {/* Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      <OrbitControls />

      {/* Lights */}
      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdrs/field.hdr" environmentIntensity={1} />
    </group>
  );
}

function ThreeTextBold({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  // We are going to map over the words of the sentence
  const words = sentence.toUpperCase().split(" ");

  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return (
    <>
      {words.map((word: string, wordIndex: number) => (
        <Text
          key={`${wordIndex} - ${word}`}
          color={color}
          material={material}
          scale={isDesktop ? 1 : 0.5}
          font='/fonts/Alpino-Variable.woff'
          fontWeight={900}
          anchorX={'center'}
          anchorY={'middle'}
          characters="ABCDEFGHIGKLMNOPQRSTUVWXYZ!.,;?"
        >
          {word}
        </Text>
      ))}
    </>
  );
}
