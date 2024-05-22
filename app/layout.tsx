import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { FooterV2 } from "@/components/FooterV2";

export const metadata = {
  title: "Headshots AI",
  description: "Generate awesome headshots in minutes using AI",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-fixed flex flex-col bg-gradient-to-tl from-red-100 to-slate-300">
        <section>
          <Suspense
            fallback={
              <div className="flex w-full px-4 py-4 items-center text-center gap-8 justify-between h-[69px]" />
            }
          >
            <Navbar />
          </Suspense>
        </section>
        <main className="md:w-2/3 mx-auto">
          {children}
        </main>
        
        {/*<section>
          <FooterV2/>
          </section>*/}

        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
