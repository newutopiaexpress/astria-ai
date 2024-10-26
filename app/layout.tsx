import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { FooterV2 } from "@/components/FooterV2";
import CookieConsent from "@/components/CookieConsent";

export const metadata = {
  title: "The AI Photographer",
  description: "Take photos in the modern way",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-fixed flex flex-col bg-stone-200 h-screen">
              <section>
                <Suspense
                  fallback={
                    <div className="pb-9 items-center text-center gap-8 justify-between h-[69px]" />
                  }
                >
                  <Navbar />
                </Suspense>
              </section>
              <main className="mx-auto mt-20 lg:mt-28 w-full"> {/* max-w-[1500px] */}
                {children}
              </main>
              <CookieConsent /> 
              <section>
                <FooterV2/>
              </section>
              <Toaster />
              <Analytics />


      </body>
    </html>
  );
}

