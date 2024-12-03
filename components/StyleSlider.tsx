import Image from "next/image";
export function StyleSlider() {
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
    <ul className="h-96 text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]">
        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/corporate.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Corporate</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={768} height={1024} src="/real.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Realtor</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/glam.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Glamour</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/xm.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Christmas</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/cat.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Cat Magic</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/shoot.jpg" alt="Corporate Portraits" />
            <p className="mb-2 text-center">Photoshoot</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/xmas.png" alt="Corporate Portraits" />
            <p className="mb-2 text-center">Erotic</p>
        </li>
          
    </ul>

    <ul className="text-stone-300 bg-transparent text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
    <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/corporate.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Corporate</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={768} height={1024} src="/real.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Realtor</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/glam.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Glamour</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/xm.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Christmas</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/cat.jpg" alt="Corporate Portraits" />
            <p className="text-lg mb-2 text-center">Cat Magic</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/shoot.jpg" alt="Corporate Portraits" />
            <p className="mb-2 text-center">Photoshoot</p>
        </li>

        <li className="rounded-3xl bg-stone-800/0 text-stone-200 p-2 shadow-lg relative">
            <Image className="w-72 h-auto rounded-3xl " width={896} height={1152} src="/xmas.png" alt="Corporate Portraits" />
            <p className="mb-2 text-center">Erotic</p>
        </li>
          
    </ul>



</div>
    )
  }