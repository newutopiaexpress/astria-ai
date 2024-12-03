import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UtopiaHero } from "@/components/utopia-hero";
import { UtopiaPricing } from "@/components/utopia-pricing";
import { UtopiaFeatures } from "@/components/utopia-features";
import { UtopiaSecond2 } from "@/components/utopia-second2";
import { UtopiaFaq } from "@/components/utopia-faq";
import { Bento2 } from "@/components/Bento2";
import Spline from '@splinetool/react-spline/next';


export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  return (
 
      <div className="mx-auto px-4 relative">
        <div className="w-full absolute left-0 right-0 z-30">
          <Bento2/>
        </div>
        
        <Spline
      className="fixed z-[1] top-0 left-0 w-full h-full"
        scene="https://prod.spline.design/yKd8nBRvxzKJGFCn/scene.splinecode" 
      />
      </div>

    
  );
}