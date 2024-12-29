"use client";

import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { modelRowWithSamples } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModelsTable from "../ModelsTable";
import Image from "next/image";
import { SparkleIcon } from "../SparkleIcon";
import StyleSlider from "../StyleSlider";
import { CoinIcon } from "./ClientSideCredits";

export const revalidate = 0;

type ClientSideModelsListProps = {
  serverModels: modelRowWithSamples[] | [];
  userCredits?: number; 
  userName?: string;
};

export default function ClientSideModelsList({
  serverModels,
  userCredits = 0,
  userName,
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

  const avatars = [
    "/s2.png",
    "/t2.png",
    "/s1.png",
  ];

  return (
    <div id="train-model-container" className="bg-stone-100/0 mx-auto max-w-[840px] w-full z-30">
      {models && models.length > 0 && (
        <div className="flex flex-col gap-0 rounded-2xl relative">
          <ModelsTable models={models} />
        </div>
      )}
      {models && models.length === 0 && (
        <div className="animate-in h-full fade-in zoom-in flex flex-col gap-4 items-center justify-center relative">
          <div className="z-30 md:mt-[17%]">
            <h1 className="text-2xl text-center mx-auto">
            {userName ? `Welcome ${userName}, Your story starts here!` : 'Your story starts here!'}
            </h1>
            <div className="mx-auto text-center mt-4 flex flex-row gap-4 items-center">
              <Link href="/get-credits">
                <Button className="animate-jump-in animate-delay-300 transition-colors w-auto h-6 rounded-full text-center border-none bg-green-300 hover:bg-green-300/60 text-xs font-medium text-green-700 p-7">
                  <CoinIcon/>
                  Buy Credits
                </Button>
              </Link>
              <Link href="/overview/models/train">
                <Button className="p-7 rounded-full text-xs border-stone-100 bg-stone-800 hover:bg-stone-600 text-stone-100">
                <span className="flex -space-x-6 float-left">
                  {avatars.map((src, index) => (
                  <span key={index} className="relative z-10">
                    <Image
                      src={src}
                      alt={`Avatar ${index + 1}`}
                      width={40}
                      height={40}
                      className="rounded-full border-0 border-white mr-4"
                    />
                  </span>
                    ))}
                  </span>
                  Start Creating
                  <SparkleIcon/>
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12">
              <StyleSlider/>
          </div>
        </div>
      )}
    </div>
  );
}



