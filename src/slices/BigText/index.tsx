"use client"

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { View } from "@react-three/drei";
import { Bubbles } from "../Hero/Bubbles";
import { Environment } from "@react-three/drei"

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText = ({ slice }: BigTextProps): JSX.Element => {

  const isDesktop = useMediaQuery("(min-width:768px)", true);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" min-h-screen w-screen overflow-hidden bg-[#FBE5CE] text-[#F48706] "
    >
        {isDesktop && (

<View className=" hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block " >
<Environment files='/hdrs/lobby.hdr' environmentIntensity={1} />
<Bubbles/>
</View>
)}
      <h2 className="
       grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7] " >
        <div className=" text-[20vw]">
          Shampoo  </div>
          <div className=" grid gap-[3vw] text-[10vw] md:flex md:text-[10vw]">
           <span className=" ml-8 max-md:ml-0 inline-block  max-md:text-[18vw]">that</span>
           <span className=" inline-block max-md:text-[18vw]">makes</span>
           <span className=" inline-block max-md:text-[18vw] ">your</span>
         

          </div>
          <div className="flex gap-[3vw] ">

          <div className="text-[18vw]">Hair</div>
          <div className=" text-[18vw]" >Smile</div>
          </div>
       </h2>
    </section>
  );
};

export default BigText;
