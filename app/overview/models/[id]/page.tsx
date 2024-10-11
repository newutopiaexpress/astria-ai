import Login from "@/app/login/page";
import { Icons } from "@/components/icons";
import ClientSideModel from "@/components/realtime/ClientSideModel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { CloseIcon } from "@/components/ui/close-icon";

export const dynamic = "force-dynamic";

export default async function Index({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Login />;
  }

  const { data: model } = await supabase
    .from("models")
    .select("*")
    .eq("id", Number(params.id))
    .eq("user_id", user.id)
    .single();

  if (!model) {
    redirect("/overview");
  }

  const { data: images } = await supabase
    .from("images")
    .select("*")
    .eq("modelId", model.id);

  const { data: samples } = await supabase.from("samples").select("*").eq("modelId", model.id);

  return (
    <div id="train-model-container" className="px-6 w-full bg-transparent rounded-sm shadow-none relative">
        <div className="flex flex-row align-left text-left items-center pb-4">
          <h1 className="text-xl">{model.name}</h1>
          <div className="ml-2">
            <Badge
                  className="flex gap-2 items-center w-max"
                  variant={model.status === "finished" ? "finished" : "secondary"}
                >
                  {model.status === "finished" ? "Finished" : model.status === "processing" ? "training process.." : model.status}
                  {model.status === "processing" && (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  )}
            </Badge>
          </div>
        </div>

      <ClientSideModel samples={samples ?? []} serverModel={model} serverImages={images ?? []} />
    </div>
  );
}
