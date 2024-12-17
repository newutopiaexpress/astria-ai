import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { FooterV2 } from "@/components/FooterV2";
import CookieConsent from "@/components/CookieConsent";
import { ChristmasBanner } from "@/components/ChristmasBanner";
import Script from "next/script";
import IntercomClientComponent from "@/components/IntercomClientComponent";

export const metadata = {
  title: "The AI Photographer",
  description: "Take photos in the modern way",
};

export default function RootLayout({
  children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
    <html lang="en" className="overflow-x-hidden">
      <body className="flex flex-col bg-stone-200 h-screen overflow-x-hidden"> 
              <section className="">
              <ChristmasBanner/>
                <Suspense
                  fallback={
                    <div className="pb-9 items-center text-center gap-8 justify-between h-[69px] z-10" />
                  }
                >
                  <Navbar />
                </Suspense>
              </section>
              <main className="mx-auto w-full"> {/* max-w-[1500px] */}
                {children}
              </main>
              <CookieConsent /> 
              <section>
                <FooterV2/>
              </section>
              <Toaster />
              <Analytics />
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
      </body>
    </html>
  );
}


export function ChatIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="w-6 h-6 text-stone-700 mx-auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
)
}

