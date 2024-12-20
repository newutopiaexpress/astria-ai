import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Database } from "@/types/supabase";
import { UtopiaLogo } from "@/components/ui/utopia-logo";
import Link from "next/link";
import { ShareDialog } from "@/components/ui/ShareDialog";
import { HiOutlineSparkles } from "react-icons/hi";

export const dynamic = "force-dynamic";

export default async function SharePage({ params }: { params: { shareId: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: image } = await supabase
    .from("images")
    .select("*, models(name)")
    .eq("share_id", params.shareId)
    .single();

  if (!image) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-950">
      {/* Minimal Header */}
      <header className=" bg-stone-950 fixed top-0 w-full z-50">
        <div className="mx-auto px-8 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <UtopiaLogo />
          </Link>
          <Link 
            href="/overview/models/train"
            className="flex items-center gap-2 text-sm px-4 py-2 bg-stone-950 text-white rounded-full hover:bg-stone-800 transition-colors"
          >
            <HiOutlineSparkles className="w-4 h-4" />
            <span>Create Your Own</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4">
        <div className="max-w-5xl mx-auto mt-4">
          <div className="relative w-full h-full overflow-hidden bg-transparent">
            <img
              src={image.uri}
              alt="AI generated photo"
              className="w-auto rounded-md lg:max-h-[700px] mx-auto"
            />
            {/*<div className="absolute top-4 right-4">
              <ShareDialog 
                imageUrl={image.uri}
                shareUrl={`${process.env.NEXT_PUBLIC_APP_URL}/share/${params.shareId}`}
              />
            </div>*/}
          </div>

          {/* Info Bar */}
          <div className="max-w-xl mx-auto mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-stone-600">Generated with Utopia Photos AI</span>
            </div>
            <div className="text-sm text-stone-500">
              {image.models?.name && `Model: ${image.models.name}`}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-stone-200 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-stone-600">
          <div className="flex items-center justify-center gap-2">
            <span>Powered by</span>
            <span className="font-bold">Flux AI</span>
            <span>•</span>
            <span>Secured by</span>
            <span className="font-bold italic">Stripe</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
