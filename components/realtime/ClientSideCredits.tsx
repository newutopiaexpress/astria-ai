"use client";

// Add these imports at the top
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
    <div className="flex gap-4 items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
          opacity: { duration: 0.2 }
        }}
      >
        <Badge className={cn(
          "text-xs rounded-full h-10 min-w-max flex items-center justify-center text-red-800 bg-red-400/0 hover:bg-green-500 border border-red-200 shadow-sm",
          className
        )}>
          <span className="mr-0"><CoinIcon/></span>0 Credits
        </Badge>
      </motion.div>
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
    <div className="text-xs text-neutral-100 align-middle p-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {credits.credits === 0 ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                  opacity: { duration: 0.2 }
                }}
              >
                <Badge className={cn(
                  "text-xs rounded-full h-10 w-10 flex items-center justify-center bg-rose-400 border border-rose-400 text-white shadow-sm",
                  className
                )}>
                  {credits.credits}
                </Badge>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.6,
                  opacity: { duration: 0.1 }
                }}
              >
                <Badge className={cn(
                  "border-none shadow-md text-xs rounded-full h-9 w-12 flex items-center justify-center text-stone-900 bg-green-300 hover:bg-green-300",
                  className
                )}>
                  <span className="mr-0"><CoinIcon/></span>
                  {credits.credits}
                </Badge>
              </motion.div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{credits.credits === 0 ? 'Buy Credits' : 'Create Photos'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export function CoinIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>

  )
}
