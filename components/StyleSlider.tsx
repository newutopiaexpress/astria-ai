import Image from "next/image";

const styles = [
  { src: "/corporate.jpg", alt: "Corporate Portraits", label: "Corporate" },
  { src: "/real.jpg", alt: "Realtor Portraits", label: "Realtor" },
  { src: "/glam.jpg", alt: "Glamour Portraits", label: "Glamour" },
  { src: "/xm.jpg", alt: "Christmas Portraits", label: "Christmas" },
  { src: "/cat.jpg", alt: "Cat Magic Portraits", label: "Cat Magic" },
  { src: "/shoot.jpg", alt: "Photoshoot Portraits", label: "Photoshoot" },
  { src: "/xmas.png", alt: "Erotic Portraits", label: "Erotic" },
];

export default function StyleSlider() {
  return (
    <div
      x-data="{}"
      x-init="$nextTick(() => {
        let ul = $refs.logos;
        ul.insertAdjacentHTML('afterend', ul.outerHTML);
        ul.nextSibling.setAttribute('aria-hidden', 'true');
      })"
      className="bg-transparent group pt-2 pb-4 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
    >
      {styles.map((style, index) => (
        <ul
          key={index}
          className="h-58 text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused] [animation-duration:10s]"
          aria-hidden={index > 0 ? "true" : "false"}
        >
          <li className="rounded-3xl bg-stone-800/0 text-stone-600 p-0 shadow-lg relative">
            <Image
              className="w-32 md:w-48 h-auto rounded-tr-3xl rounded-tl-3xl"
              width={896}
              height={1152}
              src={style.src}
              alt={style.alt}
            />
            <p className="text-sm mb-2 text-center">{style.label}</p>
          </li>
        </ul>
      ))}
    </div>
  );
}