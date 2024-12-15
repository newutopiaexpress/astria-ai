import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "../../types/supabase";
import { Login } from "@/components/Login";

export const dynamic = "force-dynamic";


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
    <div className="max-w-[460px] mt-16 mx-auto min-h-max flex items-center justify-center">
      <div>
      <Login host={host} searchParams={searchParams} />
      </div>
      {/*<Spline
      className="fixed z-[1] top-0 left-0 w-full h-full hidden md:block"
        scene="https://prod.spline.design/D2jez6cdpXZmTCmu/scene.splinecode" 
      />*/}
    </div>
  );
}
