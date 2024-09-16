import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UtopiaHero } from "@/components/utopia-hero";
import { UtopiaPricing } from "@/components/utopia-pricing";
import { UtopiaFeatures } from "@/components/utopia-features";
import { UtopiaSecond2 } from "@/components/utopia-second2";
import { UtopiaFaq } from "@/components/utopia-faq";
import { Bento3 } from "@/components/Bento3";
import QuoteCard from "@/components/QuoteCard";

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
        <Bento3/>
      </div>

    
  );
}