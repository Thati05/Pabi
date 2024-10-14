import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Skydive`.
 */
export type SkydiveProps = SliceComponentProps<Content.SkydiveSlice>;

/**
 * Component for "Skydive" Slices.
 */
const Skydive = ({ slice }: SkydiveProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for skydive (variation: {slice.variation}) Slices
    </section>
  );
};

export default Skydive;
