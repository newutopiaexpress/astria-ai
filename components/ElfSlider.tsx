import Image from "next/image";
export function ElfSlider() {
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
    <ul className="text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]">
        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf1.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf3.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf2.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elfSlider.png" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/1.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/5.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/2.jpg" alt="Corporate Portraits" />
        </li>
          
    </ul>

    <ul className="text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/6.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/3.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/7.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/4.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/8.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/10.jpg" alt="Corporate Portraits" />
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/elf/9.jpg" alt="Corporate Portraits" />
        </li>
          
    </ul>



</div>
    )
  }