"use client"


import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { View } from "@react-three/drei";
import Scene from "./Scene";
 
/**
 * Props for `Skydive`.
 */
export type SkydiveProps = SliceComponentProps<Content.SkydiveSlice>;

/**
 * Component for "Skydive" Slices.
 */
const Skydive = ({ slice }: SkydiveProps): JSX.Element => {
  return (
    <Bounded

      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" skydive h-screen"
    >
     <h2 className="sr-only">
      {slice.primary.sentence}
     </h2>

     <View className=" h-screen w-screen" >
      <Scene flavor={slice.primary.flavor} sentence={slice.primary.sentence}/>
     </View>
    </Bounded>
  );
};

export default Skydive;
