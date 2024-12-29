'use client'
import { Camera, Sparkles, CheckCircle2, Loader2, Palette, Brush } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Add avatar data
const avatars = [
  { src: "/t1.png", alt: "User 1" },
  { src: "/t2.png", alt: "User 2" },
  { src: "/t3.png", alt: "User 3" },
  { src: "/t1.png", alt: "User 4" },
];

const styleOptions = [
  "Corporate Photos",
  "Realtor Photoshoots",
  "Elf Magic",
  "Christmas 2024",
  "Peak You",
  "Spotlight Series"
];

const resultImages = [
  "/corp2.jpg",
  "/vx.jpg",
  "/corporate.jpg",
  "/corp3.jpg",
  "/corp4.jpg",
];

interface TimelineStep {
  title: string
  description: string
  completed: boolean
  icon: JSX.Element
}

const steps: TimelineStep[] = [
  {
    title: "Upload Your Photos",
    description: "Upload 6-10 photos of yourself in different settings",
    completed: true,
    icon: (
      <div className="bg-stone-800 w-10 h-10 rounded-full flex items-center justify-center">
        <span className="text-white font-bold">1</span>
      </div>
    ),
  },
  {
    title: "Select a Style",
    description: "Choose from our curated collection of premium styles",
    completed: true,
    icon: (
      <div className="bg-stone-800 w-10 h-10 rounded-full flex items-center justify-center">
        <span className="text-white font-bold">2</span>
      </div>
    ),
  },
  {
    title: "Get Your Breathtaking Photos",
    description: "Receive your high-quality photos within 30 minutes",
    completed: false,
    icon: (
      <div className="bg-stone-800 w-10 h-10 rounded-full flex items-center justify-center">
        <span className="text-white font-bold">3</span>
      </div>
    ),
  },
]

export default function VerticalTimeline() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <AnimatePresence>
        <div className="relative flex flex-col items-center">
          <motion.div 
            className="absolute w-[2px] bg-gradient-to-b from-stone-300 via-stone-300 to-transparent"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "100%", opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
          />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="mb-12 sm:mb-16 relative w-full flex flex-col items-center"
            >
              {/* Timeline number with simpler animation */}
              <motion.div 
                className={cn(
                  "flex items-center justify-center z-10",
                  "w-10 h-10 mb-6"
                )}
              >
                <div className="relative flex items-center justify-center w-full h-full">
                  {step.icon}
                </div>
              </motion.div>

              {/* Content Container - removed animations */}
              <div 
                className={cn(
                  "w-full flex",
                  index % 2 === 0 ? "justify-end pl-4 md:pl-0 md:pr-[50%]" : "justify-start pr-4 md:pr-0 md:pl-[50%]"
                )}
              >
                <div
                  className={cn(
                    "bg-white/100 backdrop-blur-sm rounded-2xl px-12 py-8",
                    "border-b border-stone-200",
                    "group cursor-default w-full md:max-w-[400px]",
                    index % 2 === 0 ? "text-right" : "text-left"
                  )}
                >
                  <h3 className="text-xl font-bold text-stone-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600">
                    {step.description}
                  </p>

                  {/* Add this block after the description in the first step */}
                  {index === 0 && (
                    <div className="flex -space-x-4 mt-4">
                      {avatars.map((avatar, i) => (
                        <Image
                          key={i}
                          src={avatar.src}
                          alt={avatar.alt}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                  )}

                  {/* Static badges */}
                  {index === 1 && (
                    <div className="flex flex-wrap gap-2 mt-4 mb-2 items-center">
                      {["Corporate Photos", "Realtor Photoshoots", "Elf Magic"].map((badge) => (
                        <Badge
                          key={badge}
                          className="bg-stone-100/80 hover:bg-stone-200/80 text-stone-600 border-stone-200 px-3 py-1.5 text-[11px] font-normal"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Static images for the last step */}
                  {index === 2 && (
                    <div className="mt-6">
                      <Carousel
                        opts={{
                          align: "start",
                          loop: true,
                        }}
                        className="w-full max-w-xs mx-auto"
                      >
                        <CarouselContent className="-ml-1">
                          {resultImages.map((src, i) => (
                            <CarouselItem key={i} className="pl-1 basis-1/3">
                              <div className="relative aspect-square">
                                <Image
                                  src={src}
                                  alt={`Result ${i + 1}`}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="flex justify-center gap-2 mt-2">
                          <CarouselPrevious variant="outline" size="sm" className="static" />
                          <CarouselNext variant="outline" size="sm" className="static" />
                        </div>
                      </Carousel>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

