"use client";

import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { modelRowWithSamples } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

import UploadIcon from "../UploadIcon";
import ModelsTable from "../ModelsTable";

export const revalidate = 0;

type ClientSideModelsListProps = {
  serverModels: modelRowWithSamples[] | [];
};

export default function ClientSideModelsList({
  serverModels,
}: ClientSideModelsListProps) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [models, setModels] = useState<modelRowWithSamples[]>(serverModels);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-models")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "models" },
        async (payload: any) => {
          const samples = await supabase
            .from("samples")
            .select("*")
            .eq("modelId", payload.new.id);

          const newModel: modelRowWithSamples = {
            ...payload.new,
            samples: samples.data,
          };

          const dedupedModels = models.filter(
            (model) => model.id !== payload.old?.id
          );

          setModels([...dedupedModels, newModel]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, models, setModels]);

  return (
    <div id="train-model-container">
      {models && models.length > 0 && (
        <div className="flex flex-col gap-4 rounded-2xl">
          <div className="flex flex-row gap-4 w-full justify-between items-center text-center">
            <p className="ml-2 text-lg text-stone-400 font-normal">Your models</p>
            <Link href="/overview/models/train" className="w-fit">
              <Button className="rounded-full text-xs border-stone-100 bg-stone-100 text-stone-500">
                Create new
              </Button>
            </Link>
          </div>
          <ModelsTable models={models} />
        </div>
      )}
      {models && models.length === 0 && (
        <div className="flex flex-col gap-4 items-center py-12">

          <h1 className="text-2xl text-center mx-auto">
            <span className="text-center mx-auto w-32 h-32">
              <UploadIcon/>
            </span>
             Bring to life your first AI clone!
          </h1>
          <div>
            <Link href="/overview/models/train">
              <Button variant="default" size={"lg"}>Upload photos</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
