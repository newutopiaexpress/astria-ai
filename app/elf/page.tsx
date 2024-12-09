import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ElfSlider } from "@/components/ElfSlider";
import { InView } from '@/components/core/in-view';
import { TextEffect } from '@/components/core/text-effect';
import Spline from '@splinetool/react-spline/next';
import { SparkleIcon } from '@/components/SparkleIcon';
import ImageCarousel from "@/components/ImageCarousel";

export default function HelloWorldPage() {

    return (
    <div className="w-full ">
	    <div className="w-full mx-auto z-30 bg-transparent">
          
          <div className="text-center pt-48 md:pt-40 mb-32 md:mb-0">
            <InView
                variants={{
                  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                viewOptions={{ margin: '0px 0px 0px 0px' }}
                transition={{ duration: 0.4, ease: 'easeIn', delay: 3 }}
              >
              <p className="text-sm text-center mb-4 md:mb-0 md:mr-5">
                <span className="font-bold mr-2">24 Magical Elf Portraits</span>
                <span className="font-normal">🎄 Ready to Print!</span> 
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
                {/*<span className="md:mr-4 rounded-full border border-stone-300 px-4 py-4">24pcs Printable Photo</span>*/}
                      <Link href="/login">
                      <Button className="rounded-full outline outline-green-500/20 outline-7 outline-offset-4 hover:outline hover:outline-stone-300/30 hover:outline-2 hover:outline-offset-0  bg-gradient-to-r from-fuchsia-950 to-neutral-950 hover:bg-gradient-to-br hover:from-fuchsia-900 hover:to-neutral-900 py-6 px-8 font-normal text-sm text-stone-100 shadow-xl hover:shadow-lg transition-all duration-100 hover:scale-105 shadow-fuchsia-600/10">
                      <span className="font-bold mr-1 border-r border-stone-100/20 pr-2 text-lg">€13.99</span>
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


      <InView
      variants={{
      hidden: { opacity: 0, y: 0, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }}
      viewOptions={{ margin: '0px 0px 0px 0px' }}
      transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
  >
    <div className="w-full grid grid-cols-12 pt-32 gap-0 mx-auto min-h-96 relative bg-stone-100">
      <div className="col-span-12 px-6 text-center backdrop-blur-md">
          <p className="mb-4 mx auto text-center border border-stone-300 rounded-full max-w-fit mx-auto text-sm px-4 py-1">
            No studio, no stress.
            </p>
          <h1 className="text-center text-stone-800 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-4xl leading-[2.5rem] md:text-6xl md:leading-[3.8rem]">
          Picture This: <span className="bg-gradient-to-r from-stone-800  to-neutral-600 inline-block text-transparent bg-clip-text pb-2">You, But Even Better </span>
          </h1>
          <p className="text-center mx-auto md:px-0 text-2xl font-thin text-stone-700 leading-tight">
          Drop your photos, pick your vibe, and watch the magic unfold.
          </p>
      </div>
      <div className="py-12 col-span-12 max-w-full mx-auto bg-black/0">
        <ImageCarousel/>
        {/*<StyleSlider/>*/}
      </div>
      <div className="col-span-12 max-w-full mx-auto py-16">
          <Link href="/login">
              <Button className="rounded-full outline outline-rose-300/20 outline-7 outline-offset-4 hover:outline hover:outline-stone-300/30 hover:outline-2 hover:outline-offset-0  bg-gradient-to-l from-rose-950 to-neutral-950 hover:bg-gradient-to-br hover:from-rose-900 hover:to-neutral-900 py-6 px-8 font-normal text-sm text-stone-100 shadow-xl hover:shadow-lg transition-all duration-100 hover:scale-105 shadow-fuchsia-600/10">
                Go to the Main Page<SparkleIcon/>
              </Button>
          </Link>
      </div>
    </div>
  </InView>


        <Spline
        scene="https://prod.spline.design/fbdje1byrTMqbiBQ/scene.splinecode" 
        className="fixed top-0 left-0 w-full h-full z-[-1]"
      />
    </div>
    );
  }