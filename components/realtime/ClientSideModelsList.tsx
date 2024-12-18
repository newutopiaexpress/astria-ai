"use client";

import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { modelRowWithSamples } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import UploadIcon from "../UploadIcon";
import ModelsTable from "../ModelsTable";
import Image from "next/image";
import { SparkleIcon } from "../SparkleIcon";
import StripePricingTable from "@/components/stripe/StripeTable";
import { Loader2 } from "lucide-react";
import { PriceTable2 } from "../PriceTable2";

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
  const [isLoading, setIsLoading] = useState(false);

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
    <div id="train-model-container" className="mx-auto w-full z-30">
      {models && models.length > 0 && (
        <div className="mx-auto max-w-[840px] flex flex-col gap-4 rounded-2xl relative">
          <div className="flex flex-row gap-4 min-w-full mb-6 w-full items-center text-center">
            <Link 
              href="/overview/models/train" 
              className="w-full mx-auto"
              onClick={() => setIsLoading(true)}
            >
              <Button 
                className="rounded-full bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-stone-200 px-6 py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    Create New Series
                    <SparkleIcon/>
                  </>
                )}
              </Button>
            </Link>
          </div>
          <ModelsTable models={models} />
        </div>
      )}
      {models && models.length === 0 && (
        <div className="max-w-[1200px] mx-auto animate-in h-full fade-in zoom-in flex flex-col gap-4 items-center justify-center relative">
          <div className="z-30 mt-14">
            <h1 className="text-2xl text-center mx-auto">
            {userName ? `Welcome ${userName}, Your story starts here!` : 'Your story starts here!'}
            </h1>
            <div className="mx-auto text-center flex flex-row gap-4">
              {userCredits === 0 ? (
                <div>
                <h1 className="pt-8 pb-4 text-center text-stone-800 font-bold tracking-tight drop-shadow-sm [text-wrap:balance] text-5xl leading-[3rem] md:text-6xl md:leading-[4.25rem]">
                Studio Quality, <span className="font-thin bg-gradient-to-r from-stone-800 via-red-800  to-fuchsia-800 inline-block text-transparent bg-clip-text pb-2"> Minus the Studio Costs</span><br/>
                </h1>
                <PriceTable2/>
                </div>
              ) : (
                <Link href="/overview/models/train">
                  <Button className="rounded-full text-xs border-stone-100 bg-stone-800 hover:bg-stone-600 text-stone-100" >
                    Start Creating
                    <SparkleIcon/>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



