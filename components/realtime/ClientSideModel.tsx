"use client";

import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase";
import { imageRow, modelRow, sampleRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";

export const revalidate = 0;

type ClientSideModelProps = {
  serverModel: modelRow;
  serverImages: imageRow[];
  samples: sampleRow[];
};

export default function ClientSideModel({
  serverModel,
  serverImages,
  samples,
}: ClientSideModelProps) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [model, setModel] = useState<modelRow>(serverModel);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-model")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "models" },
        (payload: { new: modelRow }) => {
          setModel(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, model, setModel]);

  return (
    <div id="train-model-container" className="w-full h-full">
      <div className="flex flex-col w-full mt-2 gap-4">
        <div className="flex flex-col  gap-4 lg:gap-0">
          {samples && (
          <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row gap-4 flex-wrap">
                {samples.map((sample) => (
                  <img
                    src={sample.uri}
                    className="rounded-sm w-24 h-24 object-cover"
                  />
                ))}
              </div>
          </div>
          )}
          <div className="flex flex-col w-full  mx-auto">
            {model.status === "finished" && (
              <div className="flex flex-1 flex-col gap-2">
                <h1 className="text-xl opacity-25 mt-9">Results</h1>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                  {serverImages?.map((image) => (
                    <div key={image.id} className="pb-9">
                      <img
                        src={image.uri}
                        className="mx-auto text-center rounded-sm w-96 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
