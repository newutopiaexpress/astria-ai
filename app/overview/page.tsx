// 1. Update page.tsx
import ClientSideModelsList from "@/components/realtime/ClientSideModelsList";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import dynamic from 'next/dynamic';

// Dynamic import with loading state
const DynamicFacebookChat = dynamic(
  () => import('@/components/FacebookChat'),
  { 
    ssr: false,
    loading: () => <div className="z-50 fixed bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg">
      Loading chat...
    </div>
  }
);

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const { data: models } = await supabase
    .from("models")
    .select(`*, samples (*)`)
    .eq("user_id", user.id);

  return (
    <div className="relative z-10">
      <ClientSideModelsList serverModels={models ?? []} />
      <div className="fixed right-10 bottom-10 z-[9999]"> {/* Increased z-index and fixed position */}
        <DynamicFacebookChat />
      </div>
    </div>
  );
}