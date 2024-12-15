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
    className="bg-transparent group w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
>
    <ul className="text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]">
        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/po.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/polly.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Tamas</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/odett.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elfSlider.png" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Suzye</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/tomi2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elf1.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Tamas</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/tomi2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elf4.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Sophie</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/tomi2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elf1.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Tamas</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/odett.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elfSlider.png" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Suzye</p>
        </li>


        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/tomi2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elf2.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Tamas</p>
        </li>
          
    </ul>

    <ul className="text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
    <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/tomi2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elf1.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Tamas</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/odett.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elfSlider.png" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Suzye</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/tomi2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elf2.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Tamas</p>
        </li>


        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/tomi2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elf4.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Sophie</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/tomi2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elf1.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Tamas</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/odett.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elfSlider.png" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Suzye</p>
        </li>


        <li className="rounded-3xl  text-stone-700 p-2 relative">
            <Image className="absolute bottom-2 left-8 w-16 h-16 rounded-full" width={128} height={128} src="/tomi2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-3xl" width={896} height={1152} src="/elf2.jpg" alt="Corporate Portraits" />
            <p className="mb-2 ml-24 text-left italic text-stone-600">Tamas</p>
        </li>
          
    </ul>



</div>
    )
  }