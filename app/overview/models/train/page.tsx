import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import TrainModelZoneTabs from "@/components/TrainModelZoneTabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SparkleIcon } from "@/components/SparkleIcon";
import Image from "next/image";

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: credits,
  } = await supabase.from("credits").select("*").eq("user_id", user?.id ?? '').single();

  const hasCredits = credits?.credits && credits.credits > 0;

  return (
    <div className="relative w-full mx-auto shadow-none">
      <div id="train-model-container" className="flex flex-1 flex-col relative">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent>
            {hasCredits ? (
              <TrainModelZoneTabs />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px]">
                <CardTitle className="text-2xl text-center">
                  You need credits to create a new series
                </CardTitle>
                <CardDescription className="text-center max-w-md">
                  Purchase credits to start creating your AI-powered photo series
                </CardDescription>
                <Link href="/get-credits">
                  <Button className="rounded-full bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-stone-200 px-6 py-6">
                    Buy Credits
                    <SparkleIcon />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}




