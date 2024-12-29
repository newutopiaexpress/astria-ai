"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { List, Send, Coins, ShieldCheck,} from 'lucide-react';
import { User } from "@supabase/auth-helpers-nextjs";
import { StripeLogo } from "@/components/StripeLogo";

interface VerticalNavProps {
  onClose?: () => void;
}

const navItems = [
  { name: "FAQ", href: "/faq", icon: List },
  { name: "Contact Us", href: "/contact", icon: Send },
  { name: "Pricing", href: "/get-credits", icon: Coins },
  { name: "Privacy Policy", href: "/privacy", icon: ShieldCheck },
]

export function VerticalNav({ onClose }: VerticalNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
        <nav
            className={cn(
                "h-full  bg-stone-200/0 transition-transform duration-200 ease-in-out lg:translate-x-0",
                isOpen && "translate-x-0"
            )}
            >
            <div className="flex h-full flex-col">
                <ScrollArea className="flex-1">
                <div className="mt-8 flex-col items-center justify-between">
                    {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleClick}
                        className={cn(
                        "flex items-center rounded-xl px-4 py-6 text-sm  bg-white/40 mb-2 text-gray-900 transition-all hover:bg-white/90 dark:text-gray-100 dark:hover:bg-gray-800",
                        pathname === item.href ? "bg-gray-100 dark:bg-gray-800" : ""
                        )}
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                    </Link>
                    ))}

                    {/*<div className="relative text-[10px] opacity-75 text-left mt-10 mb-0">
                    Secured payment with: 
                    <span className="float-left -ml-10 -mt-4 opacity-40"><StripeLogo/></span>
                    </div>*/}
                </div>
                </ScrollArea>
            </div>

        </nav>
  )
}

