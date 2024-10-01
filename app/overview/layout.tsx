import Login from "../login/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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

  return <div className="shadow-lg border rounded-3xl border-stone-300 md:mx-auto lg:max-w-[1400px] bg-stone-100 flex  flex-col md:px-6 py-9">
            <div className="">
            {children}
            </div>
          </div>;
}
