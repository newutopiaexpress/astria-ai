"use client"
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/3E3dlWMavIx
 */
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineGoogle } from "react-icons/ai";
import PricingSection from "@/components/PricingSection";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator"
import { FaFemale, FaMale, FaRainbow } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import FaqDialog from "@/components/FaqDialog";
import { Video } from "./Video";
import { Slider } from "./Slider";
import { RevealFx } from "./RevealFx";
import styles from './RevealFx.module.scss';
import { LetterFx } from "./LetterFx";
import { PopupButton  } from '@typeform/embed-react';
import { Widget } from '@typeform/embed-react';
import { CameraIcon } from "@radix-ui/react-icons";
import SocialProofSection from "./SocialProofSection";
import TestimonialGrid from "./TestimonialGrid";
import { SpinningText } from "./core/spinning-text";
import { TextEffect } from './core/text-effect';
import { PriceTable2 } from "./PriceTable2";
import { PriceTable } from "./PriceTable";
import VerticalTimeline from "./VerticalTimeline";
import { InView } from './core/in-view';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import { StyleSlider } from "./StyleSlider";
import { UtopiaFeatures } from "./utopia-features";
import HoverSlideshow from "./HoverSlideshow";
import { HowToSteps, type Step } from "./HowToSteps";
import ImageCarousel from "./ImageCarousel";
  

export function Bento2() {

  const steps: Step[] = [
    { number: 1, title: "Set Your Stage", description: "Upload photos and select from our style library - business to christmas" },
    { number: 2, title: "AI Magic Begins", description: "We build your personal AI and generate your professional photo collection" },
    { number: 3, title: "Time to Shine", description: "Your perfect photo collection is ready to share" },
  ];

  const localImages = [
    '/xmas1.jpg',
    '/xmas.png',
    '/youtube.png',
  ];

  return (


<div>

	<div className="lg:max-w-[1200px] mx-auto z-30 bg-transparent">
          
        <div className="text-center pt-24 md:pt-40 mb-32 md:mb-16">
          <InView
            variants={{
              hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            viewOptions={{ margin: '0px 0px 0px 0px' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
          <h1 className="text-center mb-10 text-stone-800 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-5xl leading-[2.5rem] md:text-6xl md:leading-[3.8rem]">
          Stunning First Impressions with <span className="bg-gradient-to-r from-red-400  to-fuchsia-400 inline-block text-transparent bg-clip-text pb-2">Ai-powered Photography</span><br/>
          </h1>
          </InView>

            <InView
              variants={{
                hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
              }}
              viewOptions={{ margin: '0px 0px 0px 0px' }}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.5 }}
            >
            <div className="mt-10 w-[430px] mx-auto  flex flex-col md:flex-row">
                <div className="flex items-center justify-center">
                    <p className="text-xs text-right mb-4 md:mb-0 md:mr-5">
                    <span className="font-bold mr-2">🎄Christmas Promo Gift!</span><span className="font-thin italic">24 Photoshoot Portrait for free!</span> 
                    </p>
                </div>
                <div>
                    <Link href="/login">
                    <Button className="rounded-full outline outline-rose-300/20 outline-7 outline-offset-4 hover:outline hover:outline-stone-300/30 hover:outline-2 hover:outline-offset-0  bg-gradient-to-l from-rose-950 to-neutral-950 hover:bg-gradient-to-br hover:from-rose-900 hover:to-neutral-900 py-6 px-6 font-normal text-sm text-stone-100 shadow-xl hover:shadow-lg transition-all duration-100 hover:scale-105 shadow-fuchsia-600/10">
                    Take Any Photo of Yourself<SparkleIcon/>
                    </Button>
                    </Link>
                </div>
            </div>
            </InView>
        </div>
        

          <InView
            variants={{
              hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            viewOptions={{ margin: '0px 0px 0px 0px' }}
            transition={{ duration: 0.6, ease: 'easeInOut', delay:1 }}
          >
        <div className="backdrop-blur-md flex justify-center mb-0 md:mb-12 mt-0 md:mt-36  mx-auto w-full bg-transparent  relative">

           {/*} <SpinningText
            radius={5}
            fontSize={1.2}
            className='font-medium leading-none'
            >
            {`In many different styles • `}
            </SpinningText>*/}

        <Slider/>
        </div> 
        </InView>   
	</div>


  <InView
            variants={{
              hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            viewOptions={{ margin: '100px 0px 0px 0px' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
  <div className="pt-24 max-w-[960px] mx-auto">
          <HowToSteps steps={steps} />
          {/*<VerticalTimeline/>*/}
  </div>
  </InView>


  <div className="max-w-[1200px] mx-auto mt-24">
        <TestimonialGrid/> 
  </div>


  <InView
                    variants={{
                        hidden: { opacity: 0, y: 0, filter: 'blur(4px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                    }}
                    viewOptions={{ margin: '0px 0px 0px 0px' }}
                    transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
                    >
  <div className="grid grid-cols-12 py-12 gap-12 mx-auto bg-gradient-to-b from-stone-900/0 from-10% via-neutral-900/0 via-30% to-stone-900/0 to-90% backdrop-blur-md min-h-96 relative">
  

    <div className="col-span-12 text-center backdrop-blur-md">
        <h1 className="md:mt-[6%] text-center text-stone-800 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-4xl leading-[2.5rem] md:text-6xl md:leading-[3.8rem]">
        Styles <span className="bg-gradient-to-r from-stone-800 to-red-800 inline-block text-transparent bg-clip-text pb-2"> for </span> <span className="bg-gradient-to-r from-red-800  to-fuchsia-800 inline-block text-transparent bg-clip-text pb-2"> Every Occasion</span><br/>
        </h1>
        <p className="py-4 text-center max-w-[460px] mx-auto md:px-0 text-lg text-stone-700 leading-tight">
         Professional to Personal, select from our diverse style collection, spanning business presence to festive celebrations.
        </p>
        <p>
          {/*}
        <Link href="/login">
                    <Button className="rounded-full outline outline-rose-300/20 outline-7 outline-offset-4 hover:outline hover:outline-stone-300/30 hover:outline-2 hover:outline-offset-0  bg-gradient-to-b from-stone-900 to-neutral-950 hover:bg-gradient-to-br hover:from-rose-900 hover:via-fuchsia-900 hover:to-neutral-900 py-6 px-6 font-normal text-sm text-stone-100 shadow-xl hover:shadow-lg transition-all duration-100 hover:scale-105 shadow-fuchsia-600/10">
                    Create Your First Collection<SparkleIcon/>
                    </Button>
        </Link>*/}
        </p>
    </div>
    <div className="col-span-12 w-full mx-auto bg-black/0">
      <ImageCarousel/>
      {/*<StyleSlider/>*/}
    </div>
  </div>

  </InView>


    <div className="max-w-[1100px] mx-auto mt-24">
        <PriceTable2/>
    </div>
    
  <div className="w-full mx-auto gap-6 md:pt-24 bg-repeat-x bg-contain bg-bottom bg-[url('/bg.png')] pb-14">   
            <div className="grid md:grid-cols-12 mx-auto text-center  min-h-[400px] ">
                <div className="col-span-12 md:col-span-5 relative min-h-[300px]">
                    <InView
                    variants={{
                        hidden: { opacity: 0, x: 100, filter: 'blur(8px)' },
                        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    }}
                    viewOptions={{ margin: '100px 0px 0px 0px' }}
                    transition={{ duration: 0.6, ease: 'easeIn', delay: 1 }}
                    >
                    <Image className="absolute right-12 top-12 md:right-0 md:top-0 w-60 md:w-72 h-auto" src="/tomi.png" width={362} height={514} alt="Corporate Portraits" />
                    </InView>
                </div>
                <div className="col-span-12 md:col-span-7 text-left mt-[120px] md:mt-[60px;]">
                    <InView
                    variants={{
                        hidden: { opacity: 0, x: 50, filter: 'blur(4px)' },
                        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    }}
                    viewOptions={{ margin: '0px -50px 0px 0px' }}
                    transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.4 }}
                    >
                    <h1 className="text-center md:text-left text-stone-800 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-4xl leading-[2.5rem] md:text-5xl md:leading-[3rem]">
                    Remember When You 
                    <br/>
                    <span className="bg-gradient-to-r from-stone-800  to-fuchsia-700 inline-block text-transparent bg-clip-text pb-2">Could Be Anything?</span>
                    </h1>
                    </InView>
                    <InView
                    variants={{
                        hidden: { opacity: 0, x: 50, filter: 'blur(4px)' },
                        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    }}
                    viewOptions={{ margin: '0px -50px 0px 0px' }}
                    transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.4 }}
                    >
                    <p className="md:max-w-[420px] text-center md:text-left px-9 md:px-0 text-md text-stone-800 leading-5">
                      <span className="underline underline-offset-4 bg-yellow-200/40">You still can.</span>
                      <br/>
                      <span className="">The digital world is full of possibilities.<br/>Our AI capture your true essence and helps you shine in every one of them</span>
                    </p>
                    <div className="mt-4">
                      <Link href="/login">
                        <Button className="rounded-full outline outline-rose-300/20 outline-7 outline-offset-4 hover:outline hover:outline-stone-300/30 hover:outline-2 hover:outline-offset-0  bg-gradient-to-l from-rose-950 to-neutral-950 hover:bg-gradient-to-br hover:from-rose-900 hover:to-neutral-900 py-6 px-6 font-normal text-sm text-stone-100 shadow-xl hover:shadow-lg transition-all duration-100 hover:scale-105 shadow-fuchsia-600/10">
                        Take photos with Ai<SparkleIcon/>
                        </Button>
                      </Link>
                    </div>

                    </InView>
                </div>  
            </div>     
  </div>

</div>
  )
}

function PlusIcon2() {
    return ( 
<svg className="w-10 h-10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

)
}

function CamIcon() {
    return ( 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="absolute left-6 top-2 z-50 w-8 h-8 text-stone-200 mx-auto my-4 hover:animate-ping">
 <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>
)
}

function StarIcon() {
    return (
<svg className="w-6 h-6 float-left text-rose-400" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path></svg> 
    )
}
function StarIconLight() {
    return (
<svg className="w-6 h-6 float-left  text-fuchsia-200" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path></svg> 
    )
}



  export function PlusIcon() {
    return (
        <svg className="w-8 h-8" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

export function SunIcon() {
    return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="p-1 w-8 h-8 float-right">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
</svg>

    )
}
export function MoonIcon() {
    return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="p-1 w-8 h-8 float-right">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
</svg>
    )
}

export function UserIcon() {
    return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="p-1 w-8 h-8 float-right">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>

    )
}

export function SparkIcon() {
    return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="w-8 h-8 text-stone-300">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
)
}


export function DiamondIcon() {
    return (
<svg className="w-10 h-10 text-stone-700 mx-auto" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.53731 0.826873C7.5125 0.824392 7.4875 0.824392 7.46269 0.826873L3.96269 1.17687C3.85672 1.18747 3.76025 1.24262 3.69736 1.32857L0.699771 5.42528C0.654046 5.48627 0.62647 5.56165 0.625057 5.6434C0.625019 5.6456 0.625 5.64781 0.625 5.65001C0.625 5.65052 0.625001 5.65103 0.625003 5.65153C0.625363 5.74237 0.658021 5.82559 0.712087 5.8903L7.21042 13.7883C7.28165 13.8749 7.38789 13.925 7.5 13.925C7.61211 13.925 7.71835 13.8749 7.78958 13.7883L14.2879 5.89031C14.342 5.8256 14.3746 5.74237 14.375 5.65153C14.375 5.65103 14.375 5.65052 14.375 5.65001C14.375 5.64849 14.375 5.64697 14.375 5.64545C14.3749 5.63963 14.3747 5.63382 14.3744 5.62801C14.37 5.55219 14.3431 5.48242 14.3002 5.42527L11.3026 1.32857C11.2397 1.24262 11.1433 1.18747 11.0373 1.17687L7.53731 0.826873ZM10.925 5.27501V5.25236L10.9223 5.27501H10.925ZM10.9342 5.17498H13.1877L11.2495 2.5261L10.9342 5.17498ZM10.5707 1.88395L8.04432 1.63131L10.1747 5.21034L10.5707 1.88395ZM6.95568 1.63131L4.42931 1.88395L4.82531 5.21034L6.95568 1.63131ZM3.75046 2.5261L1.81226 5.17498H4.0658L3.75046 2.5261ZM1.79416 6.02501L6.75861 12.0587L4.22371 6.0669C4.21787 6.0531 4.21314 6.0391 4.20949 6.02501H1.79416ZM5.15055 6.02501L7.49999 12.1085L9.84943 6.02501H9.78681H5.21319H5.15055ZM10.7905 6.02501C10.7869 6.0391 10.7821 6.0531 10.7763 6.0669L8.24139 12.0587L13.2058 6.02501H10.7905ZM7.5 2.18317L9.34038 5.27501H5.65962L7.5 2.18317Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
)
}

export function MouseIcon() {
    return (
        <svg className="w-10 h-10 text-stone-700 mx-auto" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.29227 0.048984C3.47033 -0.032338 3.67946 -0.00228214 3.8274 0.125891L12.8587 7.95026C13.0134 8.08432 13.0708 8.29916 13.0035 8.49251C12.9362 8.68586 12.7578 8.81866 12.5533 8.82768L9.21887 8.97474L11.1504 13.2187C11.2648 13.47 11.1538 13.7664 10.9026 13.8808L8.75024 14.8613C8.499 14.9758 8.20255 14.8649 8.08802 14.6137L6.15339 10.3703L3.86279 12.7855C3.72196 12.934 3.50487 12.9817 3.31479 12.9059C3.1247 12.8301 3 12.6461 3 12.4414V0.503792C3 0.308048 3.11422 0.130306 3.29227 0.048984ZM4 1.59852V11.1877L5.93799 9.14425C6.05238 9.02363 6.21924 8.96776 6.38319 8.99516C6.54715 9.02256 6.68677 9.12965 6.75573 9.2809L8.79056 13.7441L10.0332 13.178L8.00195 8.71497C7.93313 8.56376 7.94391 8.38824 8.03072 8.24659C8.11753 8.10494 8.26903 8.01566 8.435 8.00834L11.2549 7.88397L4 1.59852Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
)
}


export function Heart2Icon() {
    return (
        <svg className="w-10 h-10 text-stone-700 mx-auto" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
)
}

export function SparkleIcon() {
    return (
  <svg className="animate-ping w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
  <path stroke-linecap="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
  </svg>
  )
  }

  export function User2Icon() {
    return (
<svg className="w-5 h-5 float-left mr-2"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-width="1" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>

  )
  }

  export function FileIcon() {
    return (
      <svg className="w-4 h-4 text-gray-800 float-left mr-2"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linejoin="round" stroke-width="1" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
    </svg>
    
  )
  }







  
