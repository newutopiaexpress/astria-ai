'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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
  additionalText: string; // Add this line
  maleImage: string; // Add this line
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
    description: "Business Photoshoots",
    linkText: "Business Photoshoots",
    backgroundColor: "#191817", 
    additionalText: "24pcs | Female | Male", 
    maleImage: "/t2.png?height=128&width=128",
  },
  {
    images: [
      { src: "/xmas2.png?height=1152&width=896", alt: "ddd" },
      { src: "/hotxmas.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/xmasb.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/xmasg.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "Cool Christmas 2024",
    linkText: "Cool Christmas 2024",
    backgroundColor: "#5A8C7D", 
    additionalText: "24pcs  | Female | Male | Boy | Girl", 
    maleImage: "/corporate.jpg?height=1152&width=896",
  },
  {
    images: [
      { src: "/real1.jpg?height=1152&width=896", alt: "ddd" },
      { src: "/real2.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/real3.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/real4.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "Real estate agent photoshoots",
    linkText: "Real Estate Agent",
    backgroundColor: "#362D25", 
    additionalText: "24pcs  | Female | Male", 
    maleImage: "/corporate.jpg?height=1152&width=896",
  },
  {
    images: [
      { src: "/ted1.jpg?height=1152&width=896", alt: "ddd" },
      { src: "/ted2.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/ted3.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/ted4.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "TED Speaker",
    linkText: "TED Speaker",
    backgroundColor: "#940400", 
    additionalText: "24pcs  | Female | Male", 
    maleImage: "/corporate.jpg?height=1152&width=896",
  },
  {
    images: [
      { src: "/m1.jpg?height=1152&width=896", alt: "ddd" },
      { src: "/m2.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/m3.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/m4.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "Motivational Board",
    linkText: "Motivational Board",
    backgroundColor: "#3F4C54", 
    additionalText: "24pcs  | Female | Male", 
    maleImage: "/corporate.jpg?height=1152&width=896",
  },
  {
    images: [
      { src: "/m1.jpg?height=1152&width=896", alt: "ddd" },
      { src: "/m2.jpg?height=1152&width=896", alt: "Image 2" },
      { src: "/m3.jpg?height=1152&width=896", alt: "Image 3" },
      { src: "/m4.jpg?height=1152&width=896", alt: "Image 4" },
    ],
    description: "Cat Meowgic",
    linkText: "Cat Meowgic",
    backgroundColor: "#3F4C54", 
    additionalText: "24pcs  | Female | Male", 
    maleImage: "/corporate.jpg?height=1152&width=896",
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

  return (
    <div
      className="mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <nav className="flex justify-center overflow-x-auto">
        <div className="flex space-x-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "px-4 py-2 text-xs leading-tight md:text-sm font-normal md:leading-relaxed rounded-xl transition-colors",
                current === index
                  ? "text-stone-100"
                  : "text-muted-foreground hover:bg-muted"
              )}
              style={{
                backgroundColor: current === index ? slide.backgroundColor : 'transparent',
              }}
              aria-current={current === index ? "true" : "false"}
            >
              {slide.linkText}
            </button>
          ))}
        </div>
      </nav>

      <div className="bg-transparent w-full md:max-w-[1100px] mx-auto shadow-2xl shadow-slate-900/40  rounded-[0px] md:rounded-[30px]">
        <Carousel className="bg-transparent border-none p-0 md:p-3 rounded-[0px] md:rounded-[30px]" setApi={setApi}>
          <CarouselContent className="rounded-0 md:rounded-3xl cursor-grab	">
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="border-none bg-transparent relative rounded-3xl" style={{ backgroundColor: slide.backgroundColor }}>
                  <div className="px-6 md:px-12 pt-6 bg-transparent rounded-b-lg flex justify-between items-center">
                    <p className="text-lg font-normal leading-tight text-left text-stone-100/60">
                      {slide.description}
                    </p>
                    <p className="text-right">
                      <span className="opacity-100 text-stone-100/70 tracking-wide text-xs font-thin">
                        {slide.additionalText}
                      </span>
                      <Link href="/login">
                        <span className="ml-4 text-sm tracking-normal font-normal bg-stone-100/10 hover:bg-stone-100/20 text-stone-300 rounded-full px-4 py-1">
                        Take Photos < PlusIcon className="inline-block w-3 h-3" />
                        </span>
                      </Link>
                    </p>
                  </div>
                  <CardContent className="p-0 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-2 px-6 md:px-12 py-6">
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
          </CarouselContent>
          <CarouselPrevious className="left-5 bg-stone-100/20" />
          <CarouselNext className="right-5 bg-stone-100/20" />
        </Carousel>
      </div>
        
    </div>
  )
}

