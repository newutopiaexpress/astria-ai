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

  return <div className="relative w-full h-full">
            <div className="mt-8 md:mt-8 px-2">
            {children}
            </div>
          </div>;
}
