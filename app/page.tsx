import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UtopiaHero } from "@/components/utopia-hero";
import { UtopiaPricing } from "@/components/utopia-pricing";
import { UtopiaFeatures } from "@/components/utopia-features";
import { UtopiaSecond } from "@/components/utopia-second";
import { UtopiaFaq } from "@/components/utopia-faq";

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
      <UtopiaHero/>
      <UtopiaSecond/>
      <UtopiaFaq/>
    </div>

    
  );
}