"use client";

import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase";
import { imageRow, modelRow, sampleRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import JSZip from 'jszip';
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import { ShareButton } from "../ShareButton";
import { ShareDialog } from "../ui/ShareDialog";

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

  const toggleImagePublic = async (imageId: number) => {
    const { data, error } = await supabase
      .from('images')
      .update({ is_public: true })
      .eq('id', imageId)
      .select()
      .single();
      
    if (error) {
      console.error('Error sharing image:', error);
      return null;
    }
    return data;
  };

  const getShareUrl = (shareId: string) => {
    // Add logging to debug
    console.log('Share ID:', shareId);
    console.log('ENV URL:', process.env.NEXT_PUBLIC_APP_URL);
    
    // Use window.location.origin as fallback
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_APP_URL || 'https://utopia.photos';
    
    const url = `${baseUrl}/share/${shareId}`;
    console.log('Generated URL:', url);
    return url;
  };

  const downloadAllImages = async () => {
    const zip = new JSZip();
    
    // Create a folder in the zip
    const imgFolder = zip.folder("generated-images");
    
    // Download each image and add to zip
    const downloadPromises = serverImages.map(async (image, index) => {
      try {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        imgFolder?.file(`image-${index + 1}.png`, blob);
      } catch (error) {
        console.error(`Error downloading image ${index + 1}:`, error);
      }
    });

    await Promise.all(downloadPromises);
    
    // Generate and download zip file
    const content = await zip.generateAsync({ type: "blob" });
    const downloadUrl = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'generated-images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div id="train-model-container" className="w-full h-full">
      <div className="grid grid-cols-1 w-full mt-4 gap-8">
        <div className="col-span-1">
          {samples && (
            <div className="grid grid-cols-1 gap-2">
              <div className="col-span-1">
                <div className="flex flex-row flex-wrap">
                  {samples.map((sample, index) => (
                    <div 
                      key={sample.id} 
                      className="relative"
                      style={{ 
                        marginLeft: index === 0 ? '0' : '-8px',
                        zIndex: samples.length - index 
                      }}
                    >
                      <img
                        src={sample.uri}
                        alt="Training sample"
                        className="rounded-full w-16 h-16 object-cover border-2 border-white transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="col-span-1 w-full mb-32">
            <div className="absolute bottom-6 md:top-24 right-3">
              <button
                onClick={downloadAllImages}
                className="flex items-center gap-2 px-3 py-1 text-xs bg-stone-800/0 border border-stone-300 rounded-full text-stone-800"
              >
                <Icons.spinner className="w-4 h-4" />
                Download
              </button>
            </div>

            {model.status === "finished" && (
              <div className="flex flex-1 flex-col gap-2 mt-9 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
                  {serverImages?.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.uri}
                        alt="Generated result"
                        className="transition-all rounded-sm shadow-sm hover:shadow-md shadow-stone-800/60 w-full h-auto object-cover"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ShareDialog 
                          imageUrl={image.uri}
                          shareUrl={getShareUrl(image.share_id)}
                        />
                      </div>
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