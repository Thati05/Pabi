"use client"
import { Canvas } from "@react-three/fiber"
import { Shampoo } from "./Shampoo"
import { Environment, Float } from "@react-three/drei"
import { RotateNode } from "three/webgpu"

type Props = {}

const ViewCanvas = (props: Props) => {
  return (
    <Canvas style={{
      position:"fixed",
      top:0,
      left:"50%",
      transform:"translate(-50%)",
      overflow:"hidden",
      pointerEvents:"none",
      zIndex:30,
     

    }}
    shadows
    
    dpr={[1, 1.5]}
    gl={{antialias:true}}
    camera={{fov: 30,
    }}
    
    >

    {/*A mesh is an 3-D object  */}
   <Float
   speed={1} // Animation speed, defaults to 1
   rotationIntensity={3} // XYZ rotation intensity, defaults to 1
   floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
   floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
   >

<Shampoo  />
   </Float>
<Environment files='/hdrs/lobby.hdr' environmentIntensity={1} />

   {/* postion are co-ordinates of the spotlight   */}
  </Canvas>
  )
}

export default ViewCanvas