import ClientSideModelsList from "@/components/realtime/ClientSideModelsList";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";

const Spline = dynamicImport(() => import("@splinetool/react-spline"), { ssr: false });

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const { data: models } = await supabase
    .from("models")
    .select(
      `*, samples (
      *
    )`
    )
    .eq("user_id", user.id);

  return (
    <div className="relative z-10">
      <ClientSideModelsList serverModels={models ?? []} />

    </div>
);

}
