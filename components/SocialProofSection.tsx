import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function SocialProofSection() {
  const testimonials = [
    {
      name: "Anna",
      role: "Realtor",
      content: "As a real estate agent, I needed professional photos that felt genuine. The UTOPIA photo maker did an incredible job – I honestly believe these photos are really me!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Suzanne",
      role: "Owner of Hope",
      content: "A Royal Transformation for My Pet! My daughter was so excited to see our dog transformed into a king! For me, it was fascinating to see how the photo captured his unique facial features and magnificent chest fur.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Nora",
      role: "Owner of Kuszkusz",
      content: "After seeing the photo of Kuszkusz, I couldn't help but wonder what my other cat, Bulgur, would look like since they have such different personalities. It's amazing how Utopia captured Kuszkusz’s unique character so perfectly! My husband was so impressed, he immediately asked which program I used. Incredible results!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]



  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">The perfect picture of your best self</h2>
          <p className="text-lg mt-4 text-gray-500 dark:text-gray-400 max-w-[700px] mx-auto">
          Create stunning first impressions with AI-powered photography. Designed to help you look your best, so you can make a lasting impression on your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">&quot;{testimonial.content}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}