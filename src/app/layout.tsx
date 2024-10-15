import localFont from 'next/font/local'

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import './app.css'
import Header from '@/components/Header';
import ViewCanvas from '@/components/ViewCanvas';




const alpino = localFont({
  src:'../../public/fonts/Atop-R99O3.ttf',
  display: 'swap',
  weight:"100 900", //This means that we want the font weights from  100 to/through 900
  variable:"--font-alpino" 
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={alpino.variable} >
      <body className=' overflow-x-hidden bg-[#FDFCEA]'  >
        <Header/>
        <main>
        {children}
       <ViewCanvas/>
        </main>
       </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
