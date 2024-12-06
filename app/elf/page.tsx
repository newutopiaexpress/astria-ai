import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ElfSlider } from "@/components/ElfSlider";
import { InView } from '@/components/core/in-view';
import { TextEffect } from '@/components/core/text-effect';
import Spline from '@splinetool/react-spline/next';

export default function HelloWorldPage() {
    return (
    <div className="w-full ">
	    <div className="w-full mx-auto z-30 bg-transparent">
          
          <div className="text-center pt-40 md:pt-32 mb-32 md:mb-0">
            <InView
                variants={{
                  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                viewOptions={{ margin: '0px 0px 0px 0px' }}
                transition={{ duration: 0.4, ease: 'easeIn', delay: 3 }}
              >
              <p className="text-sm text-center mb-4 md:mb-0 md:mr-5">
                <span className="font-bold mr-2">Christmas Promo Gift!</span>
                <span className="font-thin italic">🎄 Spotlight Photo Series for free!</span> 
              </p>
            </InView>
            <h1 className="text-center py-4 text-stone-800 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-5xl leading-[2.5rem] md:text-6xl md:leading-[3.8rem]">

              <span className="bg-gradient-to-r from-green-500  to-fuchsia-400 inline-block text-transparent bg-clip-text pb-2">
                <TextEffect per='char' preset='fade' delay={1.5}>
                Dear Santa, I Want to Be an Elf!
                </TextEffect>         
              </span>
            </h1>
              <InView
                variants={{
                  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                viewOptions={{ margin: '0px 0px 0px 0px' }}
                transition={{ duration: 0.6, ease: 'easeIn', delay: 0.6 }}
              >
              <p className="mt-6 mx-auto">
                      <Link href="/login">
                      <Button className="rounded-full outline outline-green-500/20 outline-7 outline-offset-4 hover:outline hover:outline-stone-300/30 hover:outline-2 hover:outline-offset-0  bg-gradient-to-r from-fuchsia-950 to-neutral-950 hover:bg-gradient-to-br hover:from-fuchsia-900 hover:to-neutral-900 py-6 px-8 font-normal text-sm text-stone-100 shadow-xl hover:shadow-lg transition-all duration-100 hover:scale-105 shadow-fuchsia-600/10">
                      Activate Elf Magic<SparkleIcon/>
                      </Button>
                      </Link>
              </p>
              </InView>
          </div>
  
          <InView
              variants={{
                hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
              }}
              viewOptions={{ margin: '0px 0px 0px 0px' }}
              transition={{ duration: 0.6, ease: 'easeIn', delay:0 }}
            >
            <div className="max-w-[1200px] backdrop-blur-md flex justify-center mb-0 md:mb-12 mt-0 md:mt-20  mx-auto w-full bg-transparent  relative">
  
              {/*} <SpinningText
                radius={5}
                fontSize={1.2}
                className='font-medium leading-none'
                >
                {`In many different styles • `}
                </SpinningText>*/}
  
            <ElfSlider/>
            </div> 
          </InView>   
        </div>
        <Spline
        scene="https://prod.spline.design/fbdje1byrTMqbiBQ/scene.splinecode" 
        className="fixed top-0 left-0 w-full h-full z-[-1]"
      />
    </div>
    );
  }

  export function SparkleIcon() {
    return (
  <svg className="animate-ping w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
  <path stroke-linecap="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
  </svg>
  )
  }