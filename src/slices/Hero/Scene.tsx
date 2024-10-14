"use client"
import { Environment, OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { Group } from "three"


import Floating from "@/components/Floating"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useStore } from "@/hooks/useStore"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Props = {}

export default function Scene({}: Props) {
 const isReady = useStore((state) => state.isReady)


 const bottle1 = useRef<Group>(null)
 const bottle2 = useRef<Group>(null)
 const bottle3 = useRef<Group>(null) 
 const bottle4 = useRef<Group>(null)
 const bottle5 = useRef<Group>(null)

 const bottle1GroupRef = useRef<Group>(null)
 const bottle2GroupRef = useRef<Group>(null)

 const groupRef = useRef<Group>(null)


 const FLOATSPEED = 1.5

 //Will allow us to animate the bottles 
 
 useGSAP (() => {
  //Need to set a condition to ensure that the bottles exist
   
  if(
    !bottle1.current || 
    !bottle2.current ||
    !bottle3.current ||
    !bottle4.current ||
    !bottle5.current ||

    !bottle1GroupRef.current ||
    !bottle2GroupRef.current ||

    !groupRef.current
  ) return;

   //We call isReady() after the can ref checks
   isReady()


  //Set the location of the bottles

  gsap.set(bottle1.current.position, {
    x: -1.7
  });

  gsap.set(bottle1.current.rotation, {
   z:-0.3
  });

  gsap.set(bottle2.current.position, {
    x: 1.7
  });

  gsap.set(bottle2.current.rotation, {
   z:0.3
  });

  gsap.set(bottle3.current.position, {
    y:5, z:2
   });
   gsap.set(bottle4.current.position, {
    x:2, y:4, z:2
   });
   gsap.set(bottle5.current.position, {
    y:-5
   });

   const introTL = gsap.timeline({
    defaults: {
      duration:3,
      ease: "back.out(1.4)"
    }

   });


    if (window.scrollY < 20 ) {

      
      introTL 
      .from(bottle1GroupRef.current.position, {x:1,y:-2}, 0)
      .from(bottle1GroupRef.current.rotation, {z:3}, 0)
      .from(bottle2GroupRef.current.position, {x:1,y:2}, 0)
      .from(bottle2GroupRef.current.rotation, {z:3}, 0)
      
    }

   //Scroll timeline
 const scrollTL = gsap.timeline ({
  defaults:{
    duration:2

  },
   scrollTrigger: {
    trigger:".hero",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.5,
   }
 });

 scrollTL
 //Rotate bottle group 
.to(groupRef.current.rotation, {y:Math.PI * 2})


// Bottle 1 ---peach
.to(bottle1.current.position, {x:0.2, y:0.5, z:-2},0)
.to(bottle1.current.rotation, {z:0.3},0)


// Bottle 2 ---citrus
.to(bottle2.current.position, {x:1, y:-.2, z:-1},0)
.to(bottle2.current.rotation, {z:0},0)

// Bottle 3 --- pinapple
.to(bottle3.current.position, {x:-.7, y:-.1, z:-1},0)
.to(bottle3.current.rotation, {z:-.1},0)

// Bottle 4 
.to(bottle4.current.position, {x:-.3, y:-.3, z:.1},0)
.to(bottle4.current.rotation, {z:.2},0)

// Bottle 5 
.to(bottle5.current.position, {x:.3, y:.3, z:-.5},0)
.to(bottle5.current.rotation, {z:-.24},0)


.to(groupRef.current.position, {x:1.5, duration:3, ease:"sine.inOut"
}, 1.3
)





 })

  return (
    <group ref={groupRef} > {/*This is going to allow us to bring all group all bottles 
    together
    */}

      <group ref={bottle1GroupRef} >


    <Floating ref={bottle1} flavor="peach" floatSpeed={FLOATSPEED}/>
      </group>


      <group ref={bottle2GroupRef}>

    <Floating ref={bottle2} flavor="citrus" floatSpeed={FLOATSPEED}/>
      </group>


    <Floating ref={bottle3} flavor="pineapple" floatSpeed={FLOATSPEED}/>
    <Floating ref={bottle4} flavor="strawberry" floatSpeed={FLOATSPEED}/>
    <Floating ref={bottle5} flavor="watermelon" floatSpeed={FLOATSPEED}/>


{/*<OrbitControls/>*/}







<Environment files='/hdrs/lobby.hdr' environmentIntensity={1} />
    </group>
  )
}