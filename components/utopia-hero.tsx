/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/L39ONFFHsKO
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import PricingSection from "./PricingSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineGoogle } from "react-icons/ai";

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
export function UtopiaHero() {
  return (
    <section className="w-full px-0 md:px-4 mt-16 bg-stone-900 shadow-2xl shadow-slate-400/10 rounded-2xl relative">

      <div className="container">
        <div className="grid gap-1 lg:grid-cols-2 xl:grid-cols-2">

          <div className="content-center col-span-1">

            <div className=""> 
              <WarningIcon/> <span className="text-xs text-stone-500 font-thin leading-tight">Don't use it without the permission of the subject!</span>
            </div>
            <h1 className="pb-6 pt-6 bg-gradient-to-br from-stone-500 to-stone-300 bg-clip-text text-left font-extrabold tracking-tighter text-transparent drop-shadow-sm [text-wrap:balance] text-5xl md:text-7xl md:leading-[4rem]">
            The AI Photographer
            </h1>
            <p className="pb-6 max-w-[420px] text-stone-400 md:text-xl">
            Create professional, breathtakingly lifelike photos of you!  
            </p> 
            <Link href="/login">
              <Button variant={"google"} size={"lg"}>Login with Google
                <AiOutlineGoogle size={20} className="ml-2"/>
              </Button>
            </Link>
          </div>

          <div className="col-span-1">
            <Image
              className="cover fade-in-5"
              height="1168"
              width="901"
              alt="hello"
              src="/v0.png"
            />

          </div>

        </div>
      </div>

    </section>
  )
}

export  function WarningIcon() {
  return (
    <svg className="w-4 h-4 float-left mr-2 mt-2 text-rose-500" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

  )
}

