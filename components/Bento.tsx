/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/3E3dlWMavIx
 */
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineGoogle } from "react-icons/ai";
import PricingSection from "@/components/PricingSection";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { FaFemale, FaMale, FaRainbow } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import FaqDialog from "@/components/FaqDialog";
  


export function Bento() {
  return (
<div>
	<div className="grid grid-cols-1 lg:grid-cols-12 md:gap-6  lg:max-w-[1200px] md:mt-12 mx-auto">

        <div className="md:col-span-8 lg:col-span-9 mb-6 md:mb-0">
            <div className="bg-stone-950 rounded-3xl grid md:grid-cols-2 md:gap-0 relative">
                <Link href="/login" className="absolute top-0 right-0 z-40 w-20 h-20 bg-stone-900 rounded-full hidden md:block outline outline-offset-2 outline-stone-300 hover:outline-stone-300/0">
                    <CamIcon/>
                    <Image
                        className="z-10 hover:-rotate-6 transition-all duration-50"
                        height="100"
                        width="100"
                        alt="hello"
                        src="/lens.png">
                    </Image>
                </Link>
                <Image
                    className="absolute top-0 right-0 z-10  hidden md:block"
                    height="125"
                    width="130"
                    alt="hello"
                    src="/kor.png">
                </Image>


                <div className="md:col-span-1 relative p-6 min-h-[500px]">
                    <div className="absolute left-8 bottom-[240px] max-w-96">
                        <h1 className="text-stone-300 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-4xl leading-[2.5rem] md:text-5xl md:leading-[3rem]">Stunningly lifelike photos, as if taken by a professional photographer. </h1>
                    </div>
                    <div className="absolute left-8 -bottom-16 w-96">
                        <p className="text-stone-400 font-thin drop-shadow-sm [text-wrap:balance] text-md italic">Upload your photos and let the magic happen</p>
                        <div className="relative w-60 h-[200px] mt-6">
                            <Image
                            className="absolute left-0 top-0 rounded-full w-16 h-16 shadow-lg"
                            height="128"
                            width="128"
                            alt="hello"
                            src="/s1.png">
                            </Image>
                            <Image
                            className="absolute left-14 top-0 rounded-full w-16 h-16 shadow-lg"
                            height="128"
                            width="128"
                            alt="hello"
                            src="/s2.png">
                            </Image>
                            <Image
                            className="absolute right-16 top-0 rounded-full w-16 h-16 shadow-lg"
                            height="128"
                            width="128"
                            alt="hello"
                            src="/s4.png">
                            </Image>
                        </div>
                        
                    </div>
                </div>

                <div className="order-1 md:col-span-1 relative p-6 bg-cover bg-center md:bg-right rounded-3xl min-h-[700px]"  style={{ backgroundImage: "url('/ai.png')" }}>
                </div>

            </div> 

            <div className="grid gap-6 md:grid-cols-12 md:w-[79%] md:float-right mt-6 mb-6 bg-slate-100 rounded-3xl rounded-bl-[90px]  relative  shadow-md shadow-stone-600/10 transition-all duration-50 hover:shadow-xl">
                <div className="col-span-7 relative p-6 md:pt-4 md:ml-6 md:pr-0">
                    <div className="h-3 w-3 absolute right-0 top-5">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-stone-200"></span>
                        </span>
                    </div>
                    <p className=" text-stone-400 font-thin drop-shadow-sm [text-wrap:balance] text-[11px] mt-1 mr-6 text-right">Powered by <Link className="font-bold" target="_blank" href="https://blackforestlabs.ai/">FLUX AI</Link>  </p>
                    <h1 className="md:text-right mt-16 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-4xl leading-[2.5rem] md:text-5xl md:leading-[3rem] text-stone-800">Enhance the first impression.<span className="bg-gradient-to-r from-indigo-400 to-red-600 inline-block text-transparent bg-clip-text pb-2">Take photos with AI.</span></h1>
                    <p className="text-stone-500 text-md mt-2 mb-6 md:text-right md:w-72 md:float-right">It's not a filter. Meet Your beautiful, carefree, photogenic digital clone.</p>
                </div> 
                <div className="col-span-5">
                    <Image
                            className="w-full md:w-72 h-auto float-right rounded-3xl md:rounded-tl-[0px] md:rounded-bl-[0px] shadow-lg shadow-stone-900/40"
                            height="1152"
                            width="896"
                            alt="hello"
                            src="/cyber2.jpg">
                    </Image>
                </div>      
                        
                    
            </div>


        </div>

        <div className="md:col-span-4 lg:col-span-3 flex flex-col md:mb-0">  

            <div className="mb-6 bg-slate-100 rounded-3xl relative p-6 shadow-md shadow-stone-600/10 transition-all duration-50 hover:shadow-xl">
                <p className="text-md mb-4">"I never thought it would, but it was good for my confidence. And my husband also seems to look at me differently "</p>
                <Image
                        className="w-10 h-10 rounded-full float-left mr-2"
                        height="512"
                        width="512"
                        alt="hello"
                        src="/square.png">
                </Image>
                <p className="text-sm font-bold align-baseline mt-6">
                    Vanda
                </p>
            </div>  

            <div className="mb-6 bg-slate-100 rounded-3xl relative p-6 shadow-md shadow-stone-600/10 transition-all duration-50 hover:shadow-xl">
                <p className="text-md mb-4">"Finally we have a uniform look on our company website! The results were quick and I couldn't be more happy with the images."</p>
                <Image
                        className="w-10 h-10 rounded-full float-left mr-2"
                        height="1006"
                        width="1006"
                        alt="hello"
                        src="/v12.png">
                </Image>
                <p className="text-sm font-bold align-baseline mt-6">
                    Barbara
                </p>
            </div> 

            <div className="relative mb-6 min-h-96 bg-slate-100 text-stone-200 rounded-3xl p-6 shadow-md shadow-stone-600/10 transition-all duration-50 hover:shadow-xl bg-cover" style={{ backgroundImage: "url('/vx.jpg')" }}>
                <div className="absolute bottom-4">
                    <p className="text-md mb-4">"this is true science fiction"</p>
                    <Image
                        className="w-10 h-10 rounded-full float-left mr-2"
                        height="128"
                        width="128"
                        alt="hello"
                        src="/s5.png">
                    </Image>
                    <p className="text-md font-bold align-baseline mt-6">
                        - Tamas
                    </p>
                </div>
            </div>  

        </div>
        
	</div>

    <div className="lg:max-w-[1300px] mx-auto">

        <div className="grid md:grid-cols-3 gap-6">
            <div className="col-span-1 content-center transition-all w-full h-full bg-cover bg-gradient-to-r from-stone-900 from-70% via-stone-800 via-90% to-stone-900 to-99% rounded-3xl rounded-br-[60px] rounded-tr-[60px] z-10 relative p-6 shadow-md outline outline-8 hover:outline-2 hover:outline-offset-4 outline-offset-8 outline-stone-300/20 hover:outline-fuchsia-300/40">
                 <h1 className="pt-12 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-4xl leading-[2.5rem] md:text-5xl md:leading-[3rem] text-stone-200">Professional portraits, for everyone</h1>
                 <p className="text-stone-400 mt-2 pb-4">Create some breathtaking photos in minutes!</p>
            </div>
            <div className="col-span-2 h-fit mx-auto">
                <div className="grid md:grid-cols-3 gap-6 md:gap-16 w-full relative text-center mx-auto md:pl-6 md:mt-10">
                        
                        <div className="max-w-3/4 float-right transition-all md:w-full h-full bg-stone-200 hover:bg-slate-100 rounded-3xl hover:rounded-[40px] z-10 col-span-1 relative p-6 shadow-md outline outline-8 hover:outline-2 hover:outline-offset-4 outline-offset-8 outline-stone-300/20 hover:outline-fuchsia-300/40">
                            <p className="mx-auto w-8 h-8 shadow-inner bg-stone-200 text-stone-600 rounded-full text-center content-center">1</p><br/>
                            <p className="font-bold  mb-2 leading-tight">Upload 8-16 pictures of yourself</p>
                            <p className="text-sm mb-2 leading-tight">
                                We train a custom AI modell, that able to "learn" you.
                            </p>
                        </div>

                        <div className="mx-auto transition-all w-full h-full bg-stone-200 hover:bg-slate-100 rounded-3xl hover:rounded-[40px] z-10 col-span-1 relative p-6 shadow-md outline outline-8 hover:outline-2 hover:outline-offset-4 outline-offset-8 outline-stone-300/20 hover:outline-sky-300/40">
                        <p className="mx-auto w-8 h-8 shadow-inner bg-stone-200 text-stone-600 rounded-full text-center content-center">3</p><br/>
                            <p className="font-bold mb-2 leading-tight">Select a Style</p>
                            <p className="text-sm mb-6 leading-tight">
                              Well-engineered prompts in carefully selected styles. Choose the one that suits your current goals.
                            </p>
                        </div>

                        <div className="mx-auto transition-all w-full h-full bg-slate-100 hover:bg-slate-100 rounded-3xl hover:rounded-[40px] z-10 col-span-1 relative p-6 shadow-md outline outline-8 hover:outline-2 hover:outline-offset-4 outline-offset-8 outline-stone-300/20 hover:outline-lime-300/40">
                        <p className="mx-auto w-8 h-8 shadow-inner bg-stone-200 text-stone-600 rounded-full text-center content-center">4</p><br/>
                            <p className="font-bold mb-2 leading-tight">Get your awesome photos!</p>
                            <p className="text-sm mb-6 leading-tight">
                                We create 24 photos in each style, with three of four different prompt.
                            </p>
                        </div>

                        <div className="hidden md:block w-3/4 absolute top-24 left-20  h-px bg-stone-300 z-0"></div>
                </div>
            </div>
        </div>
        
    </div>  

    <div className="border-0  px-6 py-16 mt-9 mx-auto lg:max-w-[1200px] bg-stone-900 rounded-3xl rounded-tl-[60px] rounded-tr-[60px] rounded-br-[0px] rounded-bl-[0px] relative">

            <Link href="/login" className="absolute top-4 right-7 scale-105">
                <Button variant={"googleoutline"} size={"md"}>Login with Google
                    <AiOutlineGoogle size={20} className="ml-2"/>
                </Button>
            </Link>
            
            <h1 className="text-center px-6 pt-12 pb-4 text-stone-300 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-4xl leading-[2.5rem] md:text-5xl md:leading-[3rem]">Get noticed on LinkedIn, Youtube, with recruiters, clients & everywhere else.</h1>
            <p className="text-center text-stone-400 pb-10">Choose one from our constantly updated styles that best suit your goals</p>
        
            <div className="grid md:grid-cols-6 gap-6 relative ">
                        <div className="mt-6 col-span-1 rounded-3xl relative  shadow-stone-600/10">
                            <p className="absolute z-20 w-full right-0 top-0 text-stone-200 opacity-35">24 photos</p>
                            <div className="h-16 absolute -bottom-16 left-0 right-0 w-full mx-auto">
                                <h1 className="text-center text-stone-400 bg-stone-950/70 w-fit p-1 text-xs rounded-full">Aristocratic Portraits</h1>
                            </div>
                            <Image
                            className="cover rounded-3xl"
                            height="1152"
                            width="896"
                            alt="hello"
                            src="/aristocratic.jpg">
                            </Image>
                        </div>
                        <div className="mt-6 col-span-1 rounded-3xl relative  shadow-stone-600/10">
                            <div className="w-full h-16 text-center absolute -bottom-16 left-0 right-0">
                                <h1 className="text-stone-400 bg-stone-950/70 w-fit p-1 text-xs rounded-full">Corporate Portraits</h1>
                            </div>
                            <Image
                            className="cover rounded-3xl"
                            height="1152"
                            width="896"
                            alt="hello"
                            src="/corporate.jpg">
                            </Image>
                        </div>

                        <div className="mt-6 col-span-1 rounded-3xl relative  shadow-stone-600/10">
                            <div className="w-full h-16 text-center absolute -bottom-16 left-0 right-0">
                                <h1 className="text-stone-400 bg-stone-950/70 w-fit p-1 text-xs rounded-full">Youtube Thumbnails</h1>
                            </div>
                            <Image
                            className="cover rounded-3xl"
                            height="1152"
                            width="896"
                            alt="hello"
                            src="/youtube.png">
                            </Image>
                        </div>
                        <div className="mt-6 col-span-1  rounded-3xl relative  shadow-stone-600/10">
                            <div className="w-full h-16 text-center absolute -bottom-16 left-0 right-0">
                                <h1 className="text-stone-400 bg-stone-950/70 w-fit p-1 text-xs rounded-full">TED Speaker</h1>
                            </div>
                            <Image
                            className="cover rounded-3xl"
                            height="1152"
                            width="896"
                            alt="hello"
                            src="/ted.jpg">
                            </Image>
                        </div>
                        <div className="mt-6 col-span-1 rounded-3xl relative  shadow-stone-600/10">
                            <div className="w-full h-16 text-center absolute -bottom-16 left-0 right-0">
                                <h1 className="text-stone-400 bg-stone-950/70 w-fit p-1 text-xs rounded-full">AI Photographer</h1>
                            </div>
                            <Image
                            className="cover rounded-3xl"
                            height="817"
                            width="653"
                            alt="hello"
                            src="/photographer.jpg">
                            </Image>
                        </div>
                        <div className="mt-6 col-span-1 rounded-3xl relative  shadow-stone-600/10">
                            <div className="w-full h-16 text-center absolute -bottom-16 left-0 right-0">
                                <h1 className="text-stone-400 bg-stone-950/70 w-fit p-1 text-xs rounded-full">Surreal </h1>
                            </div>
                            <Image
                            className="cover rounded-3xl"
                            height="817"
                            width="653"
                            alt="hello"
                            src="/jcrew.jpg">
                            </Image>
                        </div>

          
            </div>
    </div>

            
    <div className="grid md:grid-cols-1 max-w-[1290px] mx-auto gap-6 border-t border-stone-300">   

            <div className="col-span-1 rounded-3xl bg-stone-200">
                <h1 className="text-center px-6 pt-12 pb-2 text-stone-800 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-4xl leading-[2.5rem] md:text-5xl md:leading-[3rem]">
                    10 times better, <span className="bg-gradient-to-r from-purple-600 via-indigo-400 to-fuchsia-400 inline-block text-transparent bg-clip-text">1/10th the price</span>
                </h1>
                <p className="text-center max-w-xs mx-auto mt-4 pb-6 text-stone-500">Get your photos in 20 minutes, without having to go to the hairdresser first!</p>
            </div> 

            <div className="col-span-1 grid grid-cols-1 md:grid-cols-4 md:gap-9 lg:max-w-[1200px] mx-auto">

                        <div className="outline outline-4 outline-offset-8 hover:outline-purple-400 outline-stone-300/30 mb-6 col-span-1 bg-slate-100 h-50 rounded-3xl relative shadow-md shadow-stone-600/10 hover:scale-105 transition-all duration-50 hover:shadow-xl hover:outline hover:outline-2 hover:outline-offset-1">
                            
                            {/*<div className="absolute top-3 -right-3 rounded-3xl bg-purple-400 pt-0 pb-1 pl-2 pr-2 text-center ">
                                <p className="text-lg">0.5<span className="font-normal text-sm">€/photo</span></p>
                            </div>*/}
                            <div className="p-6">  
                                <p><StarIcon/></p><br/>
                                <p className="font-bold mt-2 text-sm">1 Photo Session</p>
                                <p className="text-md md:h-20 leading-tight">1x Custom fine tuning + <br/>24 photos in the selected style</p>
                                <p className="font-normal text-5xl">
                                    14<span className="font-normal text-sm">€ /24pcs</span>
                                    <Link href="/login" className="float-right">
                                        <Button variant="outline" size="sm">Select</Button>
                                    </Link>
                                </p> 
                            </div>  
                        </div>

                        <div className="outline outline-4 outline-offset-8 hover:outline-purple-400 outline-stone-300/30 mb-6 col-span-1 bg-slate-100 h-50 rounded-3xl relative shadow-md shadow-stone-600/10 hover:scale-105 transition-all duration-50 hover:shadow-xl hover:outline hover:outline-2 hover:outline-offset-1">
                            <div className="p-6">  
                                <p><StarIcon/><StarIcon/><StarIcon/></p><br/>
                                <p className="font-bold mt-2 text-sm">3 Photo Session</p>
                                <p className="text-md  md:h-20 leading-tight">3x Custom fine tuning + <br/>3x24 photos in the selected style</p>
                                <p className="font-normal text-5xl">
                                    39<span className="font-normal text-sm">€ /72pcs</span>
                                    <Link href="/login" className="float-right">
                                        <Button variant="outline" size="sm">Select</Button>
                                    </Link>
                                </p> 
                            </div>  
                        </div>

                        <div className="outline outline-4 outline-offset-8 hover:outline-purple-400 outline-stone-300/30 mb-6 col-span-1 bg-slate-100 h-50 rounded-3xl relative shadow-md shadow-stone-600/10 hover:scale-105 transition-all duration-50 hover:shadow-xl hover:outline hover:outline-2 hover:outline-offset-1">
                            <div className="p-6">  
                                <p className="text-stone-300"><StarIconLight/><StarIconLight/><StarIconLight/><StarIconLight/><StarIconLight/></p><br/>
                                <p className="font-bold mt-2 text-sm">5 Photo Session</p>
                                <p className="text-md md:h-20 leading-tight">5x Custom fine tuning + <br/>5x24 photos in the selected style</p>
                                <p className="font-normal text-5xl">
                                    63<span className="font-normal text-sm">€ /120pcs</span>
                                    <Link href="/login" className="float-right">
                                        <Button variant="outline" size="sm" className="bg-stone-300 text-stone-800">Select</Button>
                                    </Link>
                                </p> 
                            </div>  
                        </div> 

                        <div className="outline outline-4 outline-offset-8 hover:outline-purple-400 outline-stone-300/30 mb-6 col-span-1 bg-stone-800 text-stone-300 h-50 rounded-3xl relative shadow-md shadow-stone-600/10 hover:scale-105 transition-all duration-50 hover:shadow-xl hover:outline hover:outline-2 hover:outline-offset-1">
                            <div className="p-6">  
                                <p className="text-stone-300"><HeartIcon/></p><br/>
                                <p className="font-bold mt-2 text-sm">15 Session - For Teams, Companies and Addicts</p>
                                <p className="text-md md:h-20 leading-tight">15x Custom fine tuning + 15x24 photos in the selected style</p>
                                <p className="font-normal text-5xl">
                                    160<span className="font-normal text-sm">€ /360pcs</span>
                                    <Link href="/login" className="float-right">
                                        <Button variant="outline" size="sm" className="bg-stone-300 text-stone-800">Select</Button>
                                    </Link>
                                </p> 
                            </div>  
                        </div>
            </div>
            
    </div> 

    <div className="grid mt-20 md:grid-cols-1 gap-6 mx-auto text-center w-full lg:max-w-[1200px] border border-stone-300 rounded-3xl shadow-md">

        <div className="min-h-96 w-full border-b border-stone-300 col-span-6 py-auto px-12 rounded-tl-3xl rounded-tr-3xl mx-auto bg-stone-950 content-center bg-cover" style={{ backgroundImage: "url('/al.jpg')" }}>
            <p className="mt-20 md:mt-8 text-stone-300 text-center md:text-right md:mr-12">
            <Link href="/login" className="ml-4 hover:text-stone-300">
                Personal branding, the modern way.
                <Button variant={"google"} size={"md"} className="ml-4">Login with Google
                    <AiOutlineGoogle size={30} className="ml-2 hover:text-stone-300  text-stone-800"/>
                </Button>
            </Link> 
            </p>
        </div>

        <div className="col-span-6 pb-9">
            <div className="grid md:grid-cols-8 gap-6">
                <div className="col-span-2 md:border-r border-stone-300">
                    <h1 className="text-left p-6 text-stone-800 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-4xl leading-[2.5rem] md:text-5xl md:leading-[3rem]">Rock Solid Security</h1>
                </div>
                <div className="col-span-2 text-left p-6">
                    <p className="font-bold">Training Data</p>
                    <p className="leading-tight text-xs">We delete your uploaded images immediately after the fine tune</p>
                </div>
                <div className="col-span-2 md:border-r md:border-l md:border-stone-300 text-left p-6 mb-6 md:mb-0">
                    <p className="font-bold">Modell Data</p>
                    <p className="leading-tight text-xs">We delete your data automatically 30 days after the fine tune have been created.</p>
                </div>
                <div className="col-span-2 md:border-r text-left p-6 mb-6 md:mb-0">
                    <p className="font-bold">Infrastructure</p>
                    <p className="leading-tight text-xs">Access to our database is controlled by a password-less system, all data is encrypted in transit and stored only for the period required. We will not give your data to any third party.</p>
                </div>
            </div>
        </div>

        

    </div>


</div>
  )
}

function CamIcon2() {
    return ( 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="z-50 w-10 h-10 text-stone-800 mx-auto my-4 hover:animate-ping">
 <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>
)
}

function CamIcon() {
    return ( 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="absolute left-6 top-2 z-50 w-8 h-8 text-stone-200 mx-auto my-4 hover:animate-ping">
 <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>
)
}

function StarIcon() {
    return (
<svg className="w-6 h-6 float-left text-stone-600/40 opacity-40" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path></svg> 
    )
}
function StarIconLight() {
    return (
<svg className="w-6 h-6 float-left  text-purple-300" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path></svg> 
    )
}

function HeartIcon() {
    return (
<svg className="w-6 h-6 float-left  text-purple-300" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}



  export function PlusIcon() {
    return (
        <svg className="w-8 h-8" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}

export function SunIcon() {
    return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="p-1 w-8 h-8 float-right">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
</svg>

    )
}
export function MoonIcon() {
    return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="p-1 w-8 h-8 float-right">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
</svg>
    )
}

export function UserIcon() {
    return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="p-1 w-8 h-8 float-right">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>

    )
}







