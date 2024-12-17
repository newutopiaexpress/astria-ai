"use client";

import { Login } from "./Login";
import { useSearchParams } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { FaGoogle } from "react-icons/fa";
  import { FaFacebookF } from "react-icons/fa";
  import { MdAlternateEmail } from "react-icons/md";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";


  export function LoginModal({ host }: { host: string | null }) {
    const searchParams = useSearchParams();
    const params = Object.fromEntries(searchParams);
  
  
    return (
      <Dialog>
        <DialogTrigger>
            <div className="w-full flex justify-center items-center">
                        <Button className="flex items-center justify-center rounded-full outline outline-rose-300/20 outline-7 outline-offset-4 hover:outline hover:outline-stone-300/30 hover:outline-2 hover:outline-offset-0  bg-gradient-to-l from-rose-950 to-neutral-950 hover:bg-gradient-to-br hover:from-rose-900 hover:to-neutral-900 py-8 px-12 font-normal text-lg tracking-wide text-stone-100 shadow-xl hover:shadow-lg transition-all duration-100 hover:scale-105 shadow-fuchsia-600/10">
                        Start Creating<SparkleIcon/>
                        </Button>
            </div>
        </DialogTrigger>
        <DialogContent className="bg-transparent shadow-0 border-0 max-w-[440px]">
          <DialogHeader>
            <DialogDescription>
              <Login host={host} searchParams={params} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  export function SparkleIcon() {
    return (
  <svg className="animate-ping w-5 h-5 text-amber-300 ml-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
  <path stroke-linecap="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
  </svg>
  )
  }