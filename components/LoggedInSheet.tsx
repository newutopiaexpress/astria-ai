"use client";

import { Login } from "./Login";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSearchParams } from 'next/navigation';
import { NavIcon } from "@/components/ui/navicon";
import { VerticalNav } from "./VerticalNav";


export function LoggedInSheet({ host }: { host: string | null }) {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);

  return (
    <Sheet>
      <SheetTrigger>
        <NavIcon />
      </SheetTrigger>
      <SheetContent className="w-[440px] sm:w-[540px]">
        <SheetHeader>
          <SheetDescription className="">
            <VerticalNav/>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
