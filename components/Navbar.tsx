import { AvatarIcon } from "@radix-ui/react-icons";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";
import { Database } from "@/types/supabase";
import ClientSideCredits from "./realtime/ClientSideCredits";
import { UtopiaLogo } from "./ui/utopia-logo";
import { UserIcon } from "./ui/user-icon";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { VerticalNav } from "./VerticalNav";
import { FiUser } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavIcon } from "@/components/ui/navicon";

export const dynamic = "force-dynamic";

const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === "true";

export const revalidate = 0;

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: credits,
  } = await supabase.from("credits").select("*").eq("user_id", user?.id ?? '').single()
  

  return (
    <div className="flex w-full py-4 px-4 items-center justify-between z-50"> {/*backdrop-blur-md*/}
      <div className="flex h-full">
        <Link href="/">
          <span className="font-bold ml-2 flex items-center justify-between"><UtopiaLogo/></span>
        </Link>
      </div>
      {user && (
        <div className="flex flex-row gap-1 md:gap-4 ml-0 md:ml-6">
          {/*}
          {stripeIsConfigured && (
            <Link href="/get-credits" className="flex items-center justify-cente text-sm">
              <span className="ml-4 mr-4 transition-all flex items-center justify-center w-8 h-8 bg-transparent hover:bg-stone-100 rounded-full border border-stone-500">
                <CoinIcon/>   
              </span>
              Buy Credits
            </Link>
          )}
            */}

          {stripeIsConfigured && (
            <Link href="/overview">
              <Button variant={"navbar"} size={"navbar"}>
                <ModelsIcon/>
                <span className="hidden md:block ml-2">Your Photos</span>
              </Button>
            </Link>
          )}
        </div>
      )}

      <div className="flex gap-4 lg:ml-auto mr-2 ">
        {!user && (
          <div className="flex items-center justify-center">
            <Sheet>
                  <SheetTrigger className="ml-4">
                    <NavIcon />
                  </SheetTrigger>
                  <SheetContent className="md:w-[440px] sm:w-[80%]">
                    <SheetHeader>
                      <SheetDescription className="pt-16">
                        <Link href="/auth/sign-in">
                          <Button
                            className="w-min text-left bg-stone-800 rounded-full text-white"
                            variant={"ghost"}
                          >
                            Log in
                          </Button>
                        </Link>
                        <VerticalNav/>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
            </Sheet>
        </div>
        )}
        {user && (
          <div className="flex flex-row gap-4 text-center align-middle justify-center">
            {stripeIsConfigured && (
              <ClientSideCredits 
              creditsRow={credits ? credits : null} 
              className={credits?.credits === 0 ? "animate-pulse bg-red-50 text-stone-800" : ""} 
              />
            )}


            <Sheet>
                  <SheetTrigger className="ml-4">
                    <NavIcon />
                  </SheetTrigger>
                  <SheetContent className="w-[440px] sm:w-[540px]">
                    <SheetHeader>
                      <SheetDescription className="pt-10 px-0">
                        <div className="flex items-center justify-start">
                          <div className="float-left mb-2 mr-2 transition-all flex items-center justify-center w-8 h-8 bg-transparent hover:bg-stone-100 rounded-full border border-stone-500">
                            <FiUser />
                          </div>
                          <p className="text-md">{user.email}</p>
                        </div>
                        <div className="w-full mt-4">
                          <form action="/auth/sign-out" method="post">
                            <Button
                              type="submit"
                              className="w-min text-left bg-stone-800 rounded-full text-white"
                              variant={"ghost"}
                              >
                              Log out
                            </Button>
                          </form>
                        </div>
                        <VerticalNav/>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
            </Sheet>
            


          </div>
        )}
      </div>
    </div>
  );
}


export function CoinIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>

  )
}

export function ModelsIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
</svg>
 
)
}

export function SparkleIcon() {
  return (
<svg className="animate-ping w-4 h-4 ml-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
)
}










