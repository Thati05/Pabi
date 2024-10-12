import localFont from 'next/font/local'

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import './app.css'
import Header from '@/components/Header';



const alpino = localFont({
  src:'../../public/fonts/Alpino-Variable.woff2',
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
      <body className=' overflow-x-hidden bg-[#F7D210]'  >
        <Header/>
        <main>
        {children}
        </main>
       </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
