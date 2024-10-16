"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { SliceComponentProps } from "@prismicio/react";
import { useRef, useState } from "react";

import { Center, Environment, View } from "@react-three/drei";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";

import Floating from "@/components/Floating";
import { ShampooProps } from "@/components/Shampoo";
import { ArrowIcon } from "./ArrowIcon";
import { WavyCircles } from "./WavyCircles";

const SPINS_ON_CHANGE = 8;

const FLAVORS: {
  flavor: ShampooProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "peach", color: "#F0631E", name: "Peachy" }, 
  { flavor: "pineapple", color: "#FDC52A", name: "Tropical Pine" }, 
  { flavor: "citrus", color: "#F7A323", name: "Citrusy" }, 
  { flavor: "strawberry", color: "#D8070A", name: "Strawberry Love" }, 
  { flavor: "watermelon", color: "#F95B58", name: "Watermelon Crush" }, 
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);

  // Referencing the shampoo bottle so that we can make it spin
  const ShampooRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!ShampooRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      ShampooRef.current.rotation,
      {
        y: index > currentFlavorIndex
          ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
          : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0
    )
      .to(
        ".background, .wavy-circles-inner, .wavy-circles-outer",
        {
          backgroundColor: FLAVORS[nextIndex].color, // Using custom color palette
          fill: FLAVORS[nextIndex].color, // Changing fill for SVG paths
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      .to(
        ".text-wrapper",
        {
          duration: 0.2,
          y: -10,
          opacity: 0,
        },
        0
      )
      .to(
        {},
        { onStart: () => setCurrentFlavorIndex(nextIndex) },
        0.5
      )
      .to(
        ".text-wrapper",
        {
          duration: 2,
          y: 0,
          opacity: 1,
        },
        0.7
      );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      {/* Background color */}
      <div className="background inset-0 pointer-events-none absolute bg-[#F0631E] opacity-50" />
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#F0631E]" />

      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>
      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* Left button */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="left"
          label="Previous Scent"
        />

        {/* Can */}
        <View className="aspect-square h-[70vmin] min-h-20">
          <Center position={[0, 0, 0.7]}>
            <Floating
              ref={ShampooRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>
          <Environment files="/hdrs/lobby.hdr" environmentIntensity={0.5} />
          <directionalLight intensity={1.5} position={[2, 3, 10]} />
        </View>

        {/* Right button */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Scent"
        />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-3xl font-light">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className="mt-2 text-xl">
          <div className="mt-2 text-xl font-normal opacity-90">
            <PrismicRichText field={slice.primary.price_copy} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({ label, direction = "right", onClick }: ArrowButtonProps) {
  return (
    <button
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
      onClick={onClick}
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
