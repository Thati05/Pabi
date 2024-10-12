import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import React from 'react'

type Props = {
  butttonLink: LinkField;
  buttonText: string | null;
  className?: string;
 
 }
 

const Button = ({butttonLink,buttonText,className}: Props) => {
  return (
   
    <PrismicNextLink className={clsx(
      
  " hover:bg-[#D8070A] rounded-lg px-5 py-4 text-center duration-150 text-xl font-bold uppercase tracking-wide text-white transition-colors bg-[#F15723]", 
  
  className,
)} 
    
    field={butttonLink} >
    {buttonText}
    </PrismicNextLink>
  )
}

export default Button