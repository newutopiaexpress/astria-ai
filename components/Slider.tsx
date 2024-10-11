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
    className="pt-2 pb-4 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
>
    <ul className="text-stone-300 text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll">
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/corp2.jpg" alt="Corporate Portraits" />
            <p className="mt-2 mb-2">Corporate Portraits</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <div className="shadow-md z-50 absolute top-4 -right-4 -rotate-3 w-12 h-12 rounded-full bg-stone-800 text-stone-300 pt-4 text-xs italic font-bold">NEW!</div>
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/sexy3.jpg" alt="Corporate Headshots" />
            <p className="mt-2 mb-2">Sexy Comicbook</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/youtube.jpg" alt="YouTube Covers" />
            <p className="mt-2 mb-2">YouTube Covers</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg relative">
            <div className="shadow-md z-50 absolute top-4 -right-4 -rotate-3 w-12 h-12 rounded-full bg-stone-800 text-stone-300 pt-4  text-xs italic font-bold">NEW!</div>
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/hallo.jpg" alt="TED Speaker" />
            <p className="mt-2 mb-2">Halloween</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/ted.jpg" alt="Glamour Shot" />
            <p className="mt-2 mb-2">TED speaker</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/v0.jpg" alt="Corporate Portraits" />
            <p className="mt-2 mb-2">Famous Musician</p>
        </li> 
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/dating.jpg" alt="Corporate Portraits" />
            <p className="mt-2 mb-2">Dating</p>
        </li>     
    </ul>
    <ul className="text-stone-300 text-sm text-center flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/corp2.jpg" alt="Corporate Portraits" />
            <p className="mt-2 mb-2">Corporate Portraits</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <div className="shadow-md z-50 absolute top-4 -right-4 -rotate-3 w-12 h-12 rounded-full bg-stone-800 text-stone-300 pt-4  text-xs italic font-bold">NEW!</div>
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/sexy.jpg" alt="Corporate Headshots" />
            <p className="mt-2 mb-2">Sexy Comicbook</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/youtube.jpg" alt="YouTube Covers" />
            <p className="mt-2 mb-2">YouTube Covers</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <div className="shadow-md z-50 absolute top-4 -right-4 -rotate-3 w-12 h-12 rounded-full bg-stone-800 text-stone-300 pt-4  text-xs italic font-bold">NEW!</div>  
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/hallo.jpg" alt="TED Speaker" />
            <p className="mt-2 mb-2">Halloween</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/ted.jpg" alt="Glamour Shot" />
            <p className="mt-2 mb-2">TED speaker</p>
        </li>
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/v0.jpg" alt="Corporate Portraits" />
            <p className="mt-2 mb-2">Famous Musician</p>
        </li> 
        <li className="rounded-3xl bg-stone-300 text-stone-700 p-2 shadow-lg">
            <img className="w-52 h-auto rounded-tl-3xl rounded-tr-3xl" src="/dating.jpg" alt="Corporate Portraits" />
            <p className="mt-2 mb-2">Dating</p>
        </li>      
    </ul>

</div>
    )
  }