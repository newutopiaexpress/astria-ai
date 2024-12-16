import Login from "../login/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type {Metadata} from "next";
import Script from "next/script";
import IntercomClientComponent from "@/components/IntercomClientComponent";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return <div className="relative w-full h-full">
            <div className="">
              {children}
            </div>
        <Script
            strategy="afterInteractive"
            id="intercom-settings"
            dangerouslySetInnerHTML={{
                __html: `
                        window.intercomSettings = {
                            api_base: "https://api-iam.intercom.io",
                            app_id: "opfhxwa2", 
                        };
                    `
            }}
        />
        <IntercomClientComponent/>
          </div>
          ;
}