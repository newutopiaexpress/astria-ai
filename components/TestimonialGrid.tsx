import { Star } from 'lucide-react'
import Image from "next/image"
import { InView } from "@/components/core/in-view";

export default function TestimonialGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 gap-6 p-4 min-w-full mx-auto">
      
      <div className="backdrop-blur-md	md:col-span-3 relative overflow-hidden h-fit rounded-3xl shadow-md">
        <InView
        variants={{
        hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '-100px 0px 0px 0px' }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0 }}
        >
        <div className="relative h-[522px]">
          <Image
            src="/baker.jpg"
            alt="Professional headshot of a person"
            className="object-cover"
            width={896}
            height={1152}
          />
          <Image src="/s3.png" alt="Professional headshot of a person" 
          className="rounded-full absolute bottom-4 right-4 w-16 h-16 z-40" width={128} height={128} 
          />

          <div className="h-full absolute inset-0 flex flex-col justify-end">
            <span className="p-6 text-stone-800 text-md font-normal leading-tight">
              "As a bakery owner, I wanted to quickly get some great images for my website. I think I did it!"
              <br/>
              <span className="font-thin text-sm leading-tight italic ">Vanda - Owner</span>
              <span className="py-2 flex gap-1 pb-6">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-200 text-yellow-300" />
                ))}
              </span> 
            </span>
          </div>
        </div>
        </InView>
      </div>

      <div className="backdrop-blur-md	md:col-span-3 relative overflow-hidden h-[522px] rounded-3xl shadow-md">
        <InView
        variants={{
        hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '-100px 0px 0px 0px' }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.4 }}
        >
        <div className="relative h-[522px]">
          <Image
            src="/corp2.jpg"
            alt="Professional headshot of a person"
            className="object-cover"
            width={896}
            height={1152}
          />
          <Image src="/t2.png" alt="Professional headshot of a person" 
          className="rounded-full absolute bottom-4 right-4 w-16 h-16 z-40" width={128} height={128} 
          />

          <div className="h-full absolute inset-0 flex flex-col justify-end">
            <span className="p-6 text-stone-800 text-md font-normal leading-tight">
              "I'm a programmer and not at all photogenic. Now I finally have some good pictures of me"
              <br/>
              <span className="font-thin text-sm leading-tight italic ">Tamas - programmer</span>
              <span className="py-2 flex gap-1">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-200 text-yellow-300" />
                ))}
              </span> 
            </span>
          </div>
        </div>
        </InView>
      </div>

      <div className="backdrop-blur-md	md:col-span-3 relative overflow-hidden h-fit rounded-3xl shadow-md">
        <InView
        variants={{
        hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '-100px 0px 0px 0px' }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.8 }}
        >
        <div className="relative h-[555px]">
          <Image
            src="/anna.jpg"
            alt="Professional headshot of a person"
            className="object-cover"
            width={896}
            height={1152}
          />
          <Image src="/anna.png" alt="Professional headshot of a person" 
          className="rounded-full absolute bottom-4 right-4 w-16 h-16 z-40" width={128} height={128} 
          />

          <div className="h-full absolute inset-0 flex flex-col justify-end"> 
            <span className="p-6 text-stone-800 text-md font-normal leading-tight">   
              "In law, credibility is currency. The quality and consistency are remarkable - exactly what my practice needs to stand out in a crowded field."
              <br/>
              <span className="font-thin text-sm leading-tight italic ">Anita - Lawyer</span>
              <span className="py-2 flex gap-1">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-200 text-yellow-300" />
                ))}
              </span> 
            </span>
          </div>
        </div>
        </InView>
      </div>

      <div className="backdrop-blur-md	md:col-span-3 relative overflow-hidden h-fit rounded-3xl shadow-md">
        <InView
        variants={{
        hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '-100px 0px 0px 0px' }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 1.2 }}
        >
        <div className="relative h-[540px]">
          <Image
            src="/real1.jpg"
            alt="Professional headshot of a person"
            className="object-cover"
            width={896}
            height={1152}
          />
          <Image src="/s3.png" alt="Professional headshot of a person" 
          className="rounded-full absolute bottom-4 right-4 w-16 h-16 z-40" width={128} height={128} 
          />

          <div className="h-full absolute inset-0 flex flex-col justify-end">
            <span className="p-6 text-stone-800 text-md font-normal leading-tight">
              "The quality and consistency are remarkable - exactly what my practice needs to stand out in a crowded field."
              <br/>
              <span className="font-thin text-sm leading-tight italic ">Christian - Realtor</span>
              <span className="py-2 flex gap-1 pb-6">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-200 text-yellow-300" />
                ))}
              </span> 
            </span>
          </div>
        </div>
        </InView>
      </div>

    </div>
  )
}