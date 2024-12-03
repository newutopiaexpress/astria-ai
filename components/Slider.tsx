import Image from "next/image";
export function Slider() {
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
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/s5.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/corp2.jpg" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Tamas</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/s4.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/corp3.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Vanda</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/s6.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/corp4.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Anita</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/po.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/poll.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Polly</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/dog2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/dog1.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Dogy</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/cat2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/cat1.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Kuszkusz</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/anita2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/anita.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Anita</p>
        </li>
          
    </ul>

    <ul className="text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/ttt.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/tt.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Tomi</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/s4.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/corp3.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Vanda</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/s6.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/corp4.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Anita</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/po.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/poll.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Polly</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/dog2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/dog1.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Dogy</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/cat2.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/cat1.png" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Kuszkusz</p>
        </li>

        <li className="rounded-3xl  text-stone-700 p-2 shadow-lg relative">
            <Image className="absolute bottom-4 left-4 w-16 h-16 rounded-full" width={128} height={128} src="/s5.png" alt="Corporate Portraits" />
            <Image className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" width={896} height={1152} src="/corp2.jpg" alt="Corporate Portraits" />
            <p className="mb-2 text-right">Xmas Girls</p>
        </li>
          
    </ul>



</div>
    )
  }