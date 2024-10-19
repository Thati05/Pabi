import React from 'react'
import { PabiLogo } from './PabiLogo'
import CircleText from './CircleText'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className=' bg-[#FDFBEC]'>
      <div className='relative mx-auto flex w-full max-w-full justify-center px-4 py-10' >
        <PabiLogo/>
        <div className=' absolute right-24 top-0 size-28 origin-center
        -translate-y-14 md:size-48 md:-translate-y-28
        '>
      </div>
          {/**Circle text 
          <CircleText/> */}
        </div>
    </footer>
  )
}