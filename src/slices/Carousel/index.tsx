"use client"

import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText} from "@prismicio/react";
import { SliceComponentProps } from "@prismicio/react";
import { useState } from "react";


import { ShampooProps } from "@/components/Shampoo";
import { Center, Environment, View } from "@react-three/drei";
import Floating from "@/components/Floating";



const FLAVORS: {
  flavor: ShampooProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "peach", color: "#710523", name: "Peachy" },
  { flavor: "pineapple", color: "#572981", name: "Tropical Pine" },
  { flavor: "citrus", color: "#164405", name: "Citrusy" },
  {
    flavor: "strawberry",
    color: "#690B3D",
    name: "Strawberry Love",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];


/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0)

  function changeFlavor(index:number){
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length

    setCurrentFlavorIndex(nextIndex)
  }


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" carsousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center 
      overflow-hidden bg-white py-12 text-white
      "
    >
      <div className="background inset-0 pointer-events-none absolute bg-[#710523] opacity-50 "/>
    <h2 className=" relative text-center text-5xl font-bold">

      <PrismicText field={slice.primary.heading} />
    </h2>
    <div className="grid grid-cols-[auto,auto,auto] items-center ">

      {/*Left button */}
      <button className=" z-20" onClick={() => changeFlavor(currentFlavorIndex +1)} >Left</button>


     {/*Can */}
     <View className=" aspect-square h-[70vmin] min-h-20" >
<Center position={[0, 0, .7]}>
  
      <Floating 
      floatIntensity={.3}
      rotationIntensity={1}
      flavor={FLAVORS[currentFlavorIndex].flavor}
      />
      </Center>
      <Environment files="/hdrs/lobby.hdr"
      environmentIntensity={0.35}
      
     
      />
      <directionalLight intensity={1} position={[2,3,10]}/>
     

     </View>

     {/*Right button */}
     <button className=" z-20 "  onClick={() => changeFlavor(currentFlavorIndex - 1)} > Right</button>

      
    </div>

    <div className="text-area relative mx-auto text-center ">

<div className="text-wrapper text-3xl font-light">
  <p>{FLAVORS[currentFlavorIndex].name}</p>
</div>

<div className="mt-2 text-xl">


     <PrismicRichText field={slice.primary.heading} />
</div>
    </div>


    </section>
  );
};

export default Carousel;
