import React from 'react'
import { PabiLogo } from './PabiLogo'


type Props = {}

export default function Header({}: Props) {
  return (
   <header className='flex cursor-pointer justify-center pt-5'>
    

 <PabiLogo/>

   </header>
  )
}