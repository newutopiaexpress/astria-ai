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
    <div className="flex w-full px-4 py-4 items-center justify-between fixed bg-gradient-to-b from-stone-200/30 via-stone-200/10 to-stone-200/0 z-50"> {/*backdrop-blur-md*/}
      <div className="flex h-full">
        <Link href="/">
          <h2 className="font-bold ml-2"><UtopiaLogo/></h2>
        </Link>
      </div>
      {user && (
        <div className="flex flex-row gap-1 md:gap-4 ml-0 md:ml-6">
          {stripeIsConfigured && (
            <Link href="/get-credits">
              <Button variant={"navbar"} size={"navbar"}>
                <CoinIcon/>
                <span className="hidden md:block ml-2 text-xs">Get Credits</span>
              </Button>
            </Link>
          )}
          {stripeIsConfigured && (
            <Link href="/overview">
              <Button variant={"navbar"} size={"navbar"}>
                <ModelsIcon/>
                <span className="hidden md:block ml-2">Your Models</span>
              </Button>
            </Link>
          )}
        </div>
      )}

      <div className="flex gap-4 lg:ml-auto mr-2 ">
        {!user && (
          <Link href="/login">
          <Button variant={"google"} size={"md"}>Login with Google
            <AiOutlineGoogle size={36} className="p-1 ml-2  rounded-full text-stone-800"/>
          </Button>
        </Link>
        )}
        {user && (
          <div className="flex flex-row gap-4 text-center align-middle justify-center">
            {stripeIsConfigured && (
              <ClientSideCredits creditsRow={credits ? credits : null} />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer z-50">
                <div className="transition-all pt-2 pl-2 w-8 h-8 bg-transparent hover:bg-stone-100 rounded-full border border-stone-300 outline outline-4 outline-stone-300/50 outline-offset-2 hover:outline hover:outline-1 hover:outline-green-400 hover:outline-offset-0">
                  <UserIcon/>     
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="text-primary text-center overflow-hidden text-ellipsis">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <form action="/auth/sign-out" method="post">
                  <Button
                    type="submit"
                    className="w-full text-left"
                    variant={"ghost"}
                    >
                    Log out
                  </Button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
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




