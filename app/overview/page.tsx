import ClientSideModelsList from "@/components/realtime/ClientSideModelsList";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Login from "../login/page";
import IntercomChat from "@/components/IntercomChat";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });


  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found</div>;
  }

    if (!user) {
      return <Login />;
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