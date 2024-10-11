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

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Login />;
  }

  return <div>
            {children}

            <Sheet>
                <SheetTrigger className="transition-all w-10 h-10 outline outline-8 outline-offset-2 outline-stone-300/50 hover:outline-offset-1 hover:outline-2 hover:outline-stone-300/80 border border-stone-300 bg-stone-200 rounded-full fixed left-5 bottom-6">Open</SheetTrigger>
                <SheetContent className="md:min-w-[600px] sm:w-full">
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>
                      <Chat/>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
            </Sheet>
          </div>;
}
