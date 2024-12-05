import Image from 'next/image'
import { Star } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  quote: string
  rating: number
  image: string
  profilePic: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alice",
    quote: "Finally professional photos I can afford! Made my small bakery look amazing online without breaking the bank. 💕",
    rating: 5,
    image: "/baker2.jpg?height=1152&width=896",
    profilePic: "/s3.png",
  },
  {
    id: 2,
    name: "Bob",
    quote: "Seeing myself in peak shape was mind-blowing! Best motivation I've ever had to hit the gym! ",
    rating: 4,
    image: "/m1.jpg?height=1152&width=896",
    profilePic: "/t2.png",
  },
  {
    id: 3,
    name: "Adam",
    quote: "Updated my entire professional portfolio in minutes instead of scheduling endless photoshoots. Time is money - this was worth every penny.",
    rating: 5,
    image: "/adam1.jpg?height=2304&width=1792",
    profilePic: "/adam3.png",
  },
  {
    id: 4,
    name: "Anna",
    quote: "Always looking polished for new listings! Perfect for my real estate social media.",
    rating: 4,
    image: "/anna.jpg?height=1024&width=768",
    profilePic: "/anna.png",
  }
]

export default function TestimonialGrid2() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="relative h-96 w-full">
              <Image
                src={testimonial.image}
                alt={`${testimonial.name}'s photo`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <blockquote className="text-lg italic  flex-grow">"{testimonial.quote}"</blockquote>
              <div className="flex items-center justify-between relative">
                <span className="font-semibold">{testimonial.name}</span>
                <Image
                src={testimonial.profilePic}
                alt={`${testimonial.name}'s profile picture`}
                width={70}
                height={70}
                className="rounded-full"
                />
                {/*<div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>*/}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

