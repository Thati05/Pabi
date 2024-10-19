"use client";

import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicText, PrismicRichText } from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import clsx from "clsx";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  const isDesktop = useMediaQuery("(min-width:768px)", true);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container bg-yellow-300 relative text-sky-950"
    >
      <div>
        <div className="grid relative z-[100]">
          {/* Shampoo bottle */}
          <View className="alternating-text-view h-screen absolute left-0 top-0 w-full">
            <Scene />
          </View>

          {/* Text group */}
          {slice.primary.text_group.map((item, index) => (
            <div
              key={asText(item.heading)}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-lg p-5 backdrop-blur-xl max-md:bg-white/30 "
                )}
              >
                <h2 className="text-balance text-5xl font-bold">
                  <PrismicText field={item.heading} />
                </h2>
                <div className="mt-3 text-lg">
                  <PrismicRichText field={item.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
