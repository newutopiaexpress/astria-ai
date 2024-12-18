'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import Link from "next/link"
import { NavIcon } from "./ui/navicon"

export default function LoginSheet() {
  return (
    <Sheet>
      <SheetTrigger className="ml-4">
        <NavIcon />
      </SheetTrigger>
      <SheetContent className="md:w-[440px] sm:w-[80%]">
        <SheetHeader>
          <SheetDescription className="pt-16">
            <Link href="/login" onClick={() => {
              const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]');
              if (closeButton instanceof HTMLElement) {
                closeButton.click();
              }
            }}>
              <Button
                className="w-min text-left bg-stone-800 rounded-full text-white"
                variant={"ghost"}
              >
                Log in
              </Button>
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
