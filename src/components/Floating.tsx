"use client"
import { Float } from "@react-three/drei"
import { Shampoo, ShampooProps } from "./Shampoo"
import { forwardRef, ReactNode } from "react"
import { Group } from "three"


type FloatingShampooProps = {
 flavor?: ShampooProps["flavor"];
 floatSpeed?:number;
 rotationIntensity?:number;
 floatIntensity?:number;
 floatingRange?:[number, number];
 children?:ReactNode

}

const Floating = forwardRef<Group, FloatingShampooProps >(({
  flavor = 'peach',
  floatSpeed = 1.5,
  rotationIntensity = 1,
  floatIntensity = 1,
  floatingRange = [-0.1, 0.1],
  children,
  ...props

}, ref


) => {
  return (
    <group ref={ref} {...props} >
    <Float
    speed={floatSpeed} // Animation speed, defaults to 1
    rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
    floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
    floatingRange={floatingRange} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      {children}
 
 <Shampoo flavor={flavor}  />
    </Float>
    </group>
  )
})

Floating.displayName = 'Floating'

export default Floating