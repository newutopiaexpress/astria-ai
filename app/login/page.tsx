import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "../../types/supabase";
import { Login } from "@/components/Login";
import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";

const Spline = dynamicImport(() => import("@splinetool/react-spline"), { ssr: false });

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const headersList = headers();
  const host = headersList.get("host");

  return (
    <div className="flex flex-col flex-1 w-full relative">
      <Login host={host} searchParams={searchParams} />
      <Spline
      className="fixed z-[1] top-0 left-0 w-full h-full"
        scene="https://prod.spline.design/D2jez6cdpXZmTCmu/scene.splinecode" 
      />
    </div>
  );
}
