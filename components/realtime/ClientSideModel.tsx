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
      <div className="grid grid-cols-1 w-full mt-4 gap-8">
        <div className="col-span-1">
          {samples && (
            <div className="grid grid-cols-1 gap-2">
              <div className="col-span-1">
                <h2 className="text-xs mb-2">Uploaded photos</h2>
                <div className="flex flex-row gap-4 flex-wrap">
                  {samples.map((sample) => (
                    <img
                      key={sample.id}
                      src={sample.uri}
                      alt="Training sample"
                      className="rounded-full w-16 h-16 object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="col-span-1 w-full mb-32">
            {model.status === "finished" && (
              <>
                <div className="flex flex-1 flex-col gap-2 mt-9">
                  <h1 className="text-xs">Results</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
                    {serverImages?.map((image) => (
                      <div key={image.id}>
                        <img
                          src={image.uri}
                          alt="Generated result"
                          className="transition-all rounded-sm shadow-sm hover:shadow-md shadow-stone-800/60 w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}