"use client";

import { Database } from "@/types/supabase";
import { creditsRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export const revalidate = 0;

type ClientSideCreditsProps = {
  creditsRow: creditsRow | null;
  className?: string;
};

export default function ClientSideCredits({
  creditsRow,
  className
}: ClientSideCreditsProps) {

  if (!creditsRow) return (
    <div className="flex gap-2 items-center">
      <p className="pt-1 text-stone-500 text-sm">Credits: 0</p>
      <Link href="/get-credits">
        <Badge 
          className="animate-pulse bg-red-300 border-red-400 hover:bg-red-500 transition-colors cursor-pointer"
        >
          Buy credits
        </Badge>
      </Link>
    </div>
  )

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [credits, setCredits] = useState<creditsRow>(creditsRow);

  useEffect(() => {
    const channel = supabase
      .channel("realtime credits")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "credits" },
        (payload: { new: creditsRow }) => {
          setCredits(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, credits, setCredits]);

  if (!credits) return null;

  return (
    <p className="text-xs text-stone-500 align-middle mt-[6px] mr-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {credits.credits === 0 ? (
              <Link href="/get-credits">
                <Badge 
                  className={`ml-2 animate-pulse bg-red-400 hover:bg-red-500 transition-colors cursor-pointer ${className}`}
                >
                  {credits.credits}
                </Badge>
              </Link>
            ) : (
              <div className="flex gap-0 items-center">
              <CoinIcon/>
              <Badge className={`ml-2 rounded-full h-8 w-8 flex items-center justify-center bg-emerald-300/0 border border-emerald-300 text-stone-800 shadow-sm ${className}`}>
                {credits.credits}
              </Badge>
              <a href="/get-credits" className="text-xs ml-8 border border-stone-300 px-4 py-1 rounded-full hover:bg-stone-100 hover:shadow-sm">Buy Credits</a>
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{credits.credits === 0 ? 'Get more credits' : 'Your credits'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </p>
  );
}

export function CoinIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>

  )
}

