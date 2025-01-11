'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'

interface CardData {
  id: number
  image: string
  headline: string
  description: string
}

const cards: CardData[] = [
  {
    id: 1,
    image: "/model-corp.png?height=1180&width=1000",
    headline: "Exciting Adventure",
    description: "Embark on a thrilling journey through uncharted territories."
  },
  {
    id: 2,
    image: "/model-corp.png?height=1180&width=1000",
    headline: "Corporate photos vol. 01",
    description: "Your perfect corporate photoshoot"
  },
  {
    id: 3,
    image: "/real/realB.png?height=1180&width=1000",
    headline: "Realtor Photos",
    description: "Showcase your property with stunning realtor photos"
  },
  {
    id: 4,
    image: "/date/date.png?height=1180&width=1000",
    headline: "Dating Profile",
    description: "Find your perfect match with a standout dating profile."
  },
  {
    id: 5,
    image: "/bud/bud.png?height=1180&width=1000",
    headline: "Budoir Photos",
    description: "Discover hidden gems in bustling city landscapes."
  }
]

interface CardCarouselProps {
  autoplaySpeed?: number
}

export default function CardCarousel({ autoplaySpeed = 3000 }: CardCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 2 },
      '(min-width: 1280px)': { slidesToScroll: 4 },
    }
  })

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext()
      }, autoplaySpeed)

      return () => clearInterval(autoplay)
    }
  }, [emblaApi, autoplaySpeed])

  return (
    <Carousel
      ref={emblaRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <CarouselContent className="-ml-4">
        {cards.map((card) => (
          <CarouselItem key={card.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/8">
            <Card className="h-full">
              <CardContent className="flex flex-col items-center p-4 h-full">
                <Image
                  src={card.image}
                  alt={card.headline}
                  width={300}
                  height={200}
                  className="rounded-md object-cover mb-4 w-full h-40"
                />
                <h3 className="text-lg font-semibold mb-2 text-center">{card.headline}</h3>
                <p className="text-sm text-center text-gray-600 flex-grow">{card.description}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden sm:block">
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </div>
    </Carousel>
  )
}

