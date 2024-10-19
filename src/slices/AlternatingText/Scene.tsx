"use client";

import Floating from "@/components/Floating";
import { Environment } from "@react-three/drei";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Group } from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type Props = {};

// Scene component
export default function Scene({}: Props) {
  const shampooRef = useRef<Group>(null);

  const isDesktop = useMediaQuery("(min-width:768px)", true);

  const bgColor = ["#FFA685", "#E9CFF6", "#CBEF9A"];

  useLayoutEffect(() => {
    if (!shampooRef.current) return; 

    const sections = gsap.utils.toArray(".alternating-section");
    const scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".alternating-text-view",
        endTrigger: ".alternating-text-container", 
        pin: true,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    sections.forEach((_, index) => {
      
      if (!shampooRef.current) return;

      const isOdd = index % 2 !== 0;

      const xPosition = isDesktop? ( isOdd ? "-1.2" : "1") : 0
      const yRotation = isDesktop? (  isOdd ? ".5" : "-.5") : 0


      scrollTL
      .to(shampooRef.current!.position, {
        x: xPosition, 
        ease: "circ.inOut",
        delay: 0.5,
      })

      .to(shampooRef.current!.rotation, {
        y: yRotation, 
        ease: "back.inOut"
      }, "<")

      .to(".alternating-text-container", {
        backgroundColor: gsap.utils.wrap(bgColor, index)
      })
      

    });
  }, []);

  return (
    <group ref={shampooRef} position-x ={isDesktop? 1 : 0} rotation-y ={isDesktop? -0.2 :0}  >
      <Floating flavor="peach" />
      <Environment files={"/hdrs/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}
