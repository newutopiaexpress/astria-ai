import Login from "../login/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
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
import IntercomChat from "@/components/IntercomChat";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <Login />;
  }

  return <div className="relative w-full h-full">
            <div className="">
              {children}
            </div>
            <div className="absolute bottom-0 right-0 bg-black h-40 w-40 z-100">
            <IntercomChat/>
            </div>
          </div>
          ;
}

