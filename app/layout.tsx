import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { FooterV2 } from "@/components/FooterV2";
export const metadata = {
  title: "The AI Photographer",
  description: "Generate professional portraits with AI",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-fixed flex flex-col bg-stone-200 ">
        <div className="min-h-screen">
              <section>
                <Suspense
                  fallback={
                    <div className="px-4 pb-9 items-center text-center gap-8 justify-between h-[69px]" />
                  }
                >
                  <Navbar />
                </Suspense>
              </section>
              <main className="w-full mx-auto h-full">
                {children}
              </main>
              
              <section>
                <FooterV2/>
              </section>

              <Toaster />
              <Analytics />
        </div>
      </body>
    </html>
  );
}
