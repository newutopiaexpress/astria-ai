import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Database } from "@/types/supabase";

export const dynamic = "force-dynamic";

export default async function SharePage({ params }: { params: { shareId: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  console.log('Attempting to fetch image with share_id:', params.shareId);

  const { data: image, error } = await supabase
    .from("images")
    .select("*")
    .eq("share_id", params.shareId)
    .single();

  console.log('Query result:', { image, error });

  if (!image) {
    console.log('Image not found, redirecting to 404');
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <img
          src={image.uri}
          alt="Shared image"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
