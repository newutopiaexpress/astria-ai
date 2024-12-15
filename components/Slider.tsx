import Image from "next/image";
import { SliderItem } from "../types/slider";

export function Slider() {
  const sliderItems: SliderItem[] = [
    {
      id: '1',
      name: "Tamas",
      avatar: "/s5.png",
      image: "/corp2.jpg",
      altText: "Corporate Portraits"
    },
    {
      id: '2',
      name: "Vanda",
      avatar: "/s4.png",
      image: "/corp3.png",
      altText: "Corporate Portraits"
    },
    {
      id: '3',
      name: "Sophie",
      avatar: "/odett.png",
      image: "/elfSlider.png",
      altText: "Corporate Portraits"
    },
    {
      id: '4',
      name: "Polly",
      avatar: "/po.png",
      image: "/poll.png",
      altText: "Corporate Portraits"
    },
    {
      id: '5',
      name: "Hannah",
      avatar: "/s3.png",
      image: "/hotxmas.jpg",
      altText: "Corporate Portraits"
    },
    {
      id: '6',
      name: "Tomi",
      avatar: "/tomi2.png",
      image: "/elftomi.jpg",
      altText: "Corporate Portraits"
    },
    {
      id: '7',
      name: "Anita",
      avatar: "/anita2.png",
      image: "/anita.png",
      altText: "Corporate Portraits"
    }
  ];

  const renderSliderItem = (item: SliderItem) => (
    <li key={item.id} className="rounded-xl text-stone-700 p-0 shadow-lg relative">
      <Image 
        className="absolute bottom-2 left-4 w-16 h-16 rounded-full"
        width={128}
        height={128}
        src={item.avatar}
        alt={item.altText}
      />
      <Image
        className="w-40 h-auto rounded-tl-xl rounded-tr-xl"
        width={896}
        height={1152}
        src={item.image}
        alt={item.altText}
      />
      <p className="mb-2 text-xs opacity-75 italic mr-2 text-right">{item.name}</p>
    </li>
  );

  return (
    <div className="bg-transparent group pb-4 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]">
        {sliderItems.map(renderSliderItem)}
      </ul>
      
      <ul className="text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
        {sliderItems.map(renderSliderItem)}
      </ul>
    </div>
  );
}