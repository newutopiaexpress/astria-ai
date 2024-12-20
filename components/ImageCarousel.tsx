'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { Badge } from './ui/badge'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'

// Define the structure for our slide data
interface Slide {
  images: {
    src: string;
    alt: string;
  }[];
  description: string;
  linkText: string;
  backgroundColor: string;
  additionalText: string; 
  maleImage: string; 
  isNew?: boolean;
}

// Sample slide data
const slides: Slide[] = [
  {
    images: [
      { src: "/corporate.jpg?height=1152&width=896", alt: "ddd" },
      { src: "/corp2.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/corph.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/van.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "Look like a CEO, in just one click",
    linkText: "Business Photoshoots",
    backgroundColor: "#0F121C", 
    additionalText: "24pcs | Female | Male", 
    maleImage: "/t2.png?height=128&width=128",
    isNew: true,
  },
  {
    images: [
      { src: "/xmas2.png?height=1152&width=896", alt: "ddd" },
      { src: "/hotxmas.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/xmasb.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/xmasg.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "Santa got an upgrade - your holidays just got cooler!",
    linkText: "Cool Christmas 2024",
    backgroundColor: "#5A8C7D", 
    additionalText: "24pcs  | Female | Male | Boy | Girl", 
    maleImage: "/corporate.jpg?height=1152&width=896",
    isNew: true,
  },
  {
    images: [
      { src: "/anna3.jpg?height=1024&width=640", alt: "ddd" },
      { src: "/anna5.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/adam4.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/adam1.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "Your key to looking like a top-selling agent!",
    linkText: "Real Estate Agent",
    backgroundColor: "#362D25", 
    additionalText: "24pcs  | Female | Male", 
    maleImage: "/corporate.jpg?height=1152&width=896",
    isNew: false,
  },
  {
    images: [
      { src: "/xxxx.jpg?height=1152&width=896", alt: "ddd" },
      { src: "/xxx.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/spot.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/spot2.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "Main character energy in every shot!",
    linkText: "Spotlight Series",
    backgroundColor: "#4D3F4F", 
    additionalText: "24pcs  | Female | Male", 
    maleImage: "/corporate.jpg?height=1152&width=896",
    isNew: true,
  },
  {
    images: [
      { src: "/m1.jpg?height=1152&width=896", alt: "ddd" },
      { src: "/m2.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/m3.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/m4.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "See it, believe it, achieve it!",
    linkText: "Peak You",
    backgroundColor: "#3F4C54", 
    additionalText: "24pcs  | Female | Male", 
    maleImage: "/corporate.jpg?height=1152&width=896",
    isNew: false,
  },
  {
    images: [
      { src: "/elf1.jpg?height=1152&width=896", alt: "ddd" },
      { src: "/elf2.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/elf3.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/elf4.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "Warning: May cause pointy ears and excessive joy!",
    linkText: "Elfie Magic",
    backgroundColor: "#356530", 
    additionalText: "24pcs  | Female | Male", 
    maleImage: "/corporate.jpg?height=1152&width=896",
    isNew: false,
  },
]

export default function ImageCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    let intervalId: NodeJS.Timeout;

    if (!isHovered) {
      intervalId = setInterval(() => {
        api.scrollTo((current + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [api, current, isHovered]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
      className="mx-auto w-full rounded-[0px] md:rounded-[30px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.nav 
        variants={navVariants}
        className="md:flex md:justify-center overflow-x-auto hidden"
      >
        <div className="flex space-x-0">
          {slides.map((slide, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative px-4 py-2 text-sm leading-tight md:text-sm font-normal md:leading-relaxed rounded-lg mb-2 transition-all duration-300",
                current === index
                  ? "text-stone-100"
                  : "text-muted-foreground hover:bg-muted"
              )}
              style={{
                backgroundColor: current === index ? slide.backgroundColor : 'transparent',
              }}
            >
              {slide.linkText}
              {slide.isNew && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-0 ml-1 border border-black/20 shadow-sm bg-white/30 text-stone-800 text-[0.7em] font-normal px-2 py-1 rounded-full"
                >
                  New
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      <motion.div 
        variants={containerVariants}
        className="px-0 w-full md:max-w-[1440px] bg-transparent mx-auto md:shadow-2xl md:shadow-slate-900/40 rounded-[0px] md:rounded-[30px]">
        <Carousel className="bg-transparent border-none rounded-[0px] md:rounded-[30px]" setApi={setApi}>
          <CarouselContent className="rounded-0 md:rounded-3xl cursor-grab">
            <AnimatePresence mode="wait">
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <Card className="max-w-md md:min-w-full border-none bg-transparent relative rounded-3xl shadow-inner" style={{ backgroundColor: slide.backgroundColor }}>
                    {/* Static description section */}
                    <div className="px-6 md:px-12 pt-6 bg-transparent rounded-b-lg flex justify-between items-center">
                      <p className="text-lg md:text-2xl tracking-tight font-thin leading-tight text-left text-stone-100/60">
                        {slide.description}
                      </p>
                      {/* Keep select button animation */}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/login" className="flex items-center justify-center text-xs md:text-sm tracking-normal font-normal bg-stone-100/10 hover:bg-stone-100/20 text-stone-300 rounded-full px-4 py-1">
                          Select <SparkleIcon/>
                        </Link>
                      </motion.div>
                    </div>
                    <CardContent className="p-0 relative">
                      {/* Static image grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-6 md:px-12 py-12">
                        {slide.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="relative aspect-[7/9] w-full">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover rounded-lg shadow-md"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </AnimatePresence>
          </CarouselContent>
          <motion.div whileHover={{ scale: 1.1 }}>
            <CarouselPrevious className="left-5 bg-stone-100/20" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <CarouselNext className="right-5 bg-stone-100/20" />
          </motion.div>
        </Carousel>
      </motion.div>
    </motion.div>
  )
}

export function SparkleIcon() {
  return (
<svg className="animate-ping inline-block w-3 h-3 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
<path stroke-linecap="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
)
}

