import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UtopiaHero } from "@/components/utopia-hero";
import { UtopiaPricing } from "@/components/utopia-pricing";
import { UtopiaFeatures } from "@/components/utopia-features";
import { UtopiaSecond2 } from "@/components/utopia-second2";
import { UtopiaFaq } from "@/components/utopia-faq";
import { Bento2 } from "@/components/Bento2";

export const dynamic = "force-dynamic";



export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  return (
 
    <div>
      <Bento2/>
    </div>

    
  );
}