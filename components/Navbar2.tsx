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
import { FolderCheck, Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { ToastTest } from "./ui/ToastTest";
import { SparkleIcon } from "@/components/SparkleIcon";
import { ChristmasBanner } from "./ChristmasBanner";

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
  
  // Get username from user metadata or email
  const username = user?.user_metadata?.preferred_username || 
                  user?.user_metadata?.user_name || 
                  user?.user_metadata?.name || 
                  user?.user_metadata?.full_name || 
                  user?.email?.split('@')[0] || 
                  'User';

  // Display name is first part of email before @ if no other name is available
  const displayName = username === 'User' ? user?.email?.split('@')[0] : username;

  return (
    <div className="fixed w-full top-0 h-24 md:h-20 bg-white/70 bg-backdrop-blur-sm backdrop-filter backdrop-blur-sm shadow-2xl shadow-white">
      <ChristmasBanner />
      <div className="flex px-4 md:px-10 py-7 md:py-5 items-center justify-between z-50">

        {/* Logo section */}
        <div className="flex h-full items-center justify-center gap-4">
          <Link href="/">
            <span className="font-bold ml-2 flex items-center justify-between"><UtopiaLogo/></span>
          </Link>

          {/* 
          {user && (
            <Link href="/overview">
              <Button className="text-[10px] shadow-sm uppercase bg-transparent text-neutral-800  border border-neutral-800/10 hover:bg-stone-100 hover:text-stone-800 rounded-full">
                <FolderCheck/>
                <span className="hidden md:block ml-2 font-normal">Your Models</span>
              </Button>
            </Link>
          )}
            */}
        </div>

        {/* Center section with navigation items */}
        <div>
          {user ? (
            <div className="transition-all flex-1 flex justify-center items-center border shadow-sm hover:bg-stone-300 hover:text-stone-100 bg-stone-200/0 max-w-min rounded-full md:-ml-[47px] px-1 py-1">
              <div className="flex items-center">
                
                {stripeIsConfigured && (
                  <div className="p-2 flex items-center gap-6 outline outline-4 outline-offset-4 outline-neutral-400/0 inset-shadow-sm inset-shadow-black bg-neutral-100 text-stone-800 rounded-full">
                  <Link href="/overview">
                    <Button className="text-[10px] shadow-sm uppercase bg-transparent text-neutral-800  border border-neutral-800/10 hover:bg-stone-700 hover:text-stone-100 rounded-full">
                      <FolderCheck/>
                      <span className="hidden md:block font-normal">Your Models</span>
                    </Button>
                  </Link>

                  <Link href="/overview/models/train">
                  <Button className="text-[10px] shadow-sm uppercase bg-transparent text-neutral-800  border border-neutral-800/10 hover:bg-stone-700 hover:text-stone-100 rounded-full">
                    <span className="font-normal">Create Photos</span>
                    <span className="scale-75"><SparkleIcon/></span>
                  </Button>
                </Link>
                <Link href="/get-credits" className="relative">
                  <div className="absolute -top-4 -right-4">
                  <ClientSideCredits 
                      creditsRow={credits ? credits : null} 
                      className={credits?.credits === 0 ? "animate-pulse bg-red-50 text-stone-800" : ""} 
                    />
                  </div>
                  <Button className="text-[10px] uppercase bg-transparent text-neutral-800  border border-neutral-100/40 hover:bg-stone-700 hover:text-stone-100 rounded-full">
                    <Plus/>
                    <span className="font-normal hidden md:block">Buy Credits</span>
                  </Button>
                </Link>
                </div>
                )}

              </div>
            </div>
          ) : (
            <div className="px-0 flex items-center gap-2 text-[10px] 	font-thin text-neutral-400 md:-ml-[46px]">
              <span>Powered by <span className="font-extrabold">Flux AI</span></span>
              <span className="text-[15px]"><AiOutlineSafetyCertificate /></span>
              <span>Secured by <span className="font-extrabold italic">Stripe</span></span>
            </div>
          )}
        </div>

        {/* Right section with menu */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex items-center justify-center">
              <Sheet>
                    <SheetTrigger className="mr-3">
                        <NavIcon />   
                    </SheetTrigger>
                    <SheetContent className="w-[200px]">
                      <SheetHeader>
                        <SheetDescription className="pt-16">
                          <Link href="/login">
                            <Button
                              className="w-full text-left bg-stone-800 rounded-full text-white"
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
          ) : (
            <div className="flex items-center gap-4 justify-center">
            {/*}
            <Link href="/get-credits">
                  <Button className="text-[10px] uppercase bg-transparent text-neutral-800  border border-neutral-100/40 hover:bg-stone-100 hover:text-stone-800 rounded-full">
                    <Plus/>
                    <span className="ml-2 font-normal hidden md:block">Buy Credits</span>
                  </Button>
            </Link>
            */}

            <Sheet>
                    <SheetTrigger className="mr-3">
                        <NavIcon /> 
                    </SheetTrigger>
                    <SheetContent className="w-[200px]">
                      <SheetHeader>
                        <SheetDescription className="pt-0 px-0">
                          <div className="flex-col">
                            <div className="mb-2 mr-2 transition-all flex items-center justify-start">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={user.user_metadata?.avatar_url} />
                                <AvatarFallback>
                                  {username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <p className="text-md font-medium">Welcome, {displayName}</p>
                            <p className="text-sm text-stone-800">{user.email}</p>
                          </div>
                          <div className="w-full mt-4">
                            <form action="/auth/sign-out" method="post">
                              <Button
                                type="submit"
                                className="w-full text-left bg-stone-800 rounded-full text-white"
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








