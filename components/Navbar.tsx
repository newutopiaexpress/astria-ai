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
    <div className="flex w-full px-4 py-4 items-center text-center justify-between">
      <div className="flex h-full">
        <Link href="/">
          <h2 className="font-bold ml-2"><UtopiaLogo/></h2>
        </Link>
      </div>
      {user && (
        <div className="hidden lg:flex flex-row gap-2 ml-6">
          {stripeIsConfigured && (
            <Link href="/get-credits">
              <Button variant={"google"}>Get Credits</Button>
            </Link>
          )}
        </div>
      )}

      <div className="flex gap-4 lg:ml-auto mr-2 ">
        {!user && (
          <Link href="/login">
          <Button variant={"google"} size={"md"}>Login with Google
            <AiOutlineGoogle size={20} className="ml-2"/>
          </Button>
        </Link>
        )}
        {user && (
          <div className="flex flex-row gap-4 text-center align-middle justify-center">
            {stripeIsConfigured && (
              <ClientSideCredits creditsRow={credits ? credits : null} />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <div className="transition-all pt-2 pl-2 w-8 h-8 bg-transparent hover:bg-stone-100 border border-stone-200 rounded-full shadow-lg">
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




