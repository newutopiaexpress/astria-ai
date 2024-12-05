import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { FooterV2 } from "@/components/FooterV2";
import CookieConsent from "@/components/CookieConsent";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Chat from "@/components/Chat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { ChristmasBanner } from "@/components/ChristmasBanner";
import Spline from '@splinetool/react-spline/next';

export const metadata = {
  title: "The AI Photographer",
  description: "Take photos in the modern way",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-fixed flex flex-col bg-stone-200 h-screen overflow-x-hidden">
              
              {/*<ChristmasBanner />*/}
              <section>
                <Suspense
                  fallback={
                    <div className="pb-9 items-center text-center gap-8 justify-between h-[69px] z-10" />
                  }
                >
                  <Navbar />
                </Suspense>
              </section>
              <main className="mx-auto mt-20 lg:mt-28 w-full z-10"> {/* max-w-[1500px] */}
                {children}
              </main>
              <CookieConsent /> 
              <section>
                <FooterV2/>
              </section>
              <Toaster />
              <Analytics />


{/*}
              <Sheet>
                <SheetTrigger className="transition-all w-10 h-10 outline outline-8 outline-offset-2 outline-stone-300/50 hover:outline-offset-1 hover:outline-2 hover:outline-stone-300/80 border border-stone-300 bg-stone-200 rounded-full fixed left-5 bottom-6">
                  <Badge className="absolute -top-4 -right-1 opacity-0 animate-bounce-in  flex items-center justify-center" variant={"message"}>1</Badge>
                  <ChatIcon/>
                </SheetTrigger>
                <SheetContent className="md:min-w-[600px] sm:w-full">
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>
                      <p className="mx-auto text-center mt-16">
                      <Link href="/login" className=" hover:text-stone-300">
                          <Button variant={"google"} size={"md"} className="ml-4">Login with Google
                              <AiOutlineGoogle size={30} className="ml-2 hover:text-stone-300  text-stone-800"/>
                          </Button>
                      </Link>
                      </p>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
*/}

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

