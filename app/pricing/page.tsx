import { PriceTable2 } from "@/components/PriceTable2";
export default function Pricing() {
  return (

    <div className="w-full max-w-6xl mx-auto pb-12 px-4 mt-36 sm:px-6 lg:px-8">
      <div className="col-span-12">
        <h1 className="pt-8 pb-4 text-center text-stone-800 font-bold tracking-tight drop-shadow-sm [text-wrap:balance] text-5xl leading-[3rem] md:text-6xl md:leading-[4.25rem]">
        Studio Quality, <span className="font-thin bg-gradient-to-r from-stone-800 via-red-800  to-fuchsia-800 inline-block text-transparent bg-clip-text pb-2"> Minus the Studio Costs</span><br/>
        </h1>
      </div>  
        <PriceTable2/>    
    </div>
  );
}

