import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PriceCard() {
    return (

                    <div className="grid md:grid-cols-3 md:gap-6">
                        <div className="mb-6 col-span-1 bg-slate-100 h-50 rounded-3xl relative p-6 shadow-md shadow-stone-600/10 hover:scale-105 transition-all duration-50 hover:shadow-xl">
                            <p><StarIcon/></p><br/>
                            <p className="font-bold mt-2">1 credit</p>
                            <p className="text-xs md:h-20">One modell, 12 photos in three different settings.</p>
                            <p className="font-normal text-5xl">9<span className="font-normal text-xl">€</span></p>
                            <Link href="/login" className="absolute bottom-6 right-6">
                                <Button variant="outline" size="sm">Select</Button>
                            </Link>
                        </div>
                        <div className="mb-6 col-span-1 bg-slate-300 h-50 rounded-3xl relative p-6 hover:scale-105 transition-all duration-50 hover:shadow-xl hover:z-10">
                            <p><StarIcon/><StarIcon/><StarIcon/></p><br/>
                            <p className="font-bold mt-2">3 credit</p>
                            <p className="text-xs md:h-20">Three modell, 3x12 photos in three different settings.</p>
                            <p className="font-normal text-5xl">25<span className="font-normal text-xl">€</span></p>
                            <Link href="/login" className="absolute bottom-6 right-6">
                                <Button variant="outline" size="sm">Select</Button>
                            </Link>
                        </div>
                        <div className="mb-6 col-span-1 bg-stone-800 text-stone-300 h-50 rounded-3xl relative p-6 hover:scale-105 transition-all duration-50 hover:z-10 hover:shadow-xl">
                            <p><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></p><br/>
                            <p className="font-bold mt-2">5 credit</p>
                            <p className="text-xs md:h-20">Five modell, 5x12 photos in three different settings.</p>
                            <p className="font-normal text-5xl">39<span className="font-normal text-xl">€</span></p>
                            <Link href="/login" className="absolute bottom-6 right-6">
                                <Button variant="outline" size="sm">Select</Button>
                            </Link>
                        </div>
                    </div>

    )
}


function StarIcon() {
    return (
<svg className="w-6 h-6 float-left  opacity-10" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path></svg> 
    )
}
