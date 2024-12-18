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
    title: "Upload Photos",
    description: "Upload 6-10 photos of yourself in different settings",
    completed: true,
    icon: <Camera className="w-6 h-6" />,
  },
  {
    title: "Select a Style",
    description: "Choose from our curated collection of premium styles",
    completed: true,
    icon: (
      <div className="relative">
        <Sparkles className="w-6 h-6" />
        <motion.div
          className="absolute -inset-2 rounded-full"
          animate={{
            background: [
              "radial-gradient(circle, rgba(28,25,23,0.2) 0%, rgba(0,0,0,0) 50%)",
              "radial-gradient(circle, rgba(28,25,23,0.4) 50%, rgba(0,0,0,0) 100%)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    ),
  },
  {
    title: "AI Magic",
    description: "Our AI learns your unique features and creates personalized photos",
    completed: false,
    icon: (
      <div className="relative">
        <Loader2 className="w-8 h-8 animate-spin text-stone-600" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-stone-400/50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    ),
  },
  {
    title: "Get Your Breathtaking Photos",
    description: "Receive your high-quality photos within 30 minutes",
    completed: false,
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
]

export default function VerticalTimeline() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <AnimatePresence>
        <div className="relative flex flex-col items-center">
          {/* Vertical line with gradient animation */}
          <motion.div 
            className="absolute w-[2px] bg-gradient-to-b from-stone-300 via-stone-300 to-transparent"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ 
              height: "100%", 
              opacity: 1,
              transition: {
                duration: 1.5,
                ease: "easeOut"
              }
            }}
            viewport={{ once: false, margin: "-100px" }}
          />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  duration: 0.8,
                  delay: index * 0.3,
                  ease: "easeOut"
                }
              }}
              exit={{ 
                opacity: 0,
                y: -20,
                transition: { duration: 0.3 } 
              }}
              viewport={{ once: false, margin: "-50px" }}
              className="mb-12 sm:mb-16 relative w-full flex flex-col items-center"
            >
              {/* Timeline dot with pulse effect */}
              <motion.div 
                className={cn(
                  "flex items-center justify-center z-10",
                  "w-16 h-16 mb-6",
                  index === 2 ? "w-24 h-24 scale-150" : "",
                  step.completed ? "text-stone-800" : "text-stone-600"
                )}
                whileInView={{
                  scale: [0.8, index === 2 ? 1.5 : 1],
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }}
                whileHover={{
                  scale: index === 2 ? 1.6 : 1.1,
                  rotate: [0, 5, -5, 0],
                  transition: {
                    duration: 0.3
                  }
                }}
              >
                <div className={cn(
                  "relative flex items-center justify-center w-full h-full",
                  "rounded-full bg-white border-2 border-stone-300",
                  "shadow-md hover:shadow-lg transition-shadow duration-300"
                )}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.2 }}
                  >
                    {step.icon}
                  </motion.div>
                  {step.completed && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-stone-300"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: [1, 1.2],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Content with directional slide */}
              <motion.div 
                className={cn(
                  "w-full max-w-lg",
                  index % 2 === 1 ? "self-end" : "self-start"
                )}
                initial={{ 
                  opacity: 0, 
                  x: index % 2 === 0 ? -50 : 50,
                  filter: "blur(10px)"
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.8,
                    delay: index * 0.3,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: false, margin: "-50px" }}
              >
                <motion.div
                  className={cn(
                    "bg-white/0 backdrop-blur-sm rounded-2xl px-12 py-8",
                    "border border-stone-200 shadow-sm",
                    "group cursor-default",
                    index % 2 === 1 ? "text-right" : "text-left"
                  )}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.h3 
                    className="text-xl font-bold text-stone-800 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.2 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-stone-600"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.3 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Add static badges for the second step */}
                  {index === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-2 mt-4 mb-2 items-center"
                    >
                      {["Corporate Photos", "Realtor Photoshoots", "Elf Magic"].map((badge, i) => (
                        <motion.div
                          key={badge}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Badge
                            className={cn(
                              "bg-stone-100/80 hover:bg-stone-200/80",
                              "text-stone-600 border-stone-200",
                              "px-3 py-1.5 text-xs font-normal"
                            )}
                          >
                            {badge}
                          </Badge>
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge
                          className={cn(
                            "bg-stone-50 border-stone-300 border-1",
                            "text-stone-400 hover:text-stone-600",
                            "px-3 py-1.5 text-sm font-medium",
                            "cursor-pointer hover:bg-stone-100/80",
                            "transition-all duration-200"
                          )}
                        >
                          +
                        </Badge>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Existing scrolling badges */}
                  {index === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 relative overflow-hidden"
                    >
                      <motion.div
                        animate={{
                          x: [0, -1000],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="flex gap-3 absolute whitespace-nowrap"
                      >
                        {[...styleOptions, ...styleOptions].map((style, i) => (
                          <Badge
                            key={`${style}-${i}`}
                            variant="outline"
                            className={cn(
                              "px-3 py-1 bg-white/50 border-stone-300/50",
                              "hover:bg-stone-100 transition-colors duration-200",
                              "text-stone-600 font-normal"
                            )}
                          >
                            {style}
                          </Badge>
                        ))}
                      </motion.div>
                      {/* Gradient overlay for smooth edges */}
                      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
                      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
                    </motion.div>
                  )}

                  {/* Add overlapping avatars for the first step only */}
                  {index === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="flex items-center mt-4"
                    >
                      {avatars.map((avatar, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ 
                            x: 0, 
                            opacity: 1,
                            transition: { delay: i * 0.1 + 0.5 }
                          }}
                          className={cn(
                            "relative -ml-4 first:ml-0",
                            "ring-4 ring-white rounded-full",
                            "hover:z-10 transition-transform duration-200 ease-out",
                            index % 2 === 1 ? "hover:translate-x-1" : "hover:-translate-x-1"
                          )}
                        >
                          <Image
                            src={avatar.src}
                            alt={avatar.alt}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full bg-black/20"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          />
                        </motion.div>
                      ))}
                      <motion.span 
                        className="ml-4 text-sm text-stone-500"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        Upload 6-10 Photos
                      </motion.span>
                    </motion.div>
                  )}

                  {/* Add image carousel for the last step */}
                  {index === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6"
                    >
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
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative aspect-square"
                              >
                                <Image
                                  src={src}
                                  alt={`Result ${i + 1}`}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </motion.div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="flex justify-center gap-2 mt-2">
                          <CarouselPrevious variant="outline" size="sm" className="static" />
                          <CarouselNext variant="outline" size="sm" className="static" />
                        </div>
                      </Carousel>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

