"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { List, Send, Coins, ShieldCheck,} from 'lucide-react';
import { User } from "@supabase/auth-helpers-nextjs";

interface VerticalNavProps {
  onClose?: () => void;
}

const navItems = [
  { name: "FAQ", href: "/faq", icon: List },
  { name: "Contact Us", href: "/contact", icon: Send },
  { name: "Pricing", href: "/pricing", icon: Coins },
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
                <div className="space-y-2 mt-16 flex-col items-center justify-between">
                    {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleClick}
                        className={cn(
                        "flex items-center py-4 border-b text-sm border-stone-300 text-gray-900 transition-all hover:bg-stone-100/40 dark:text-gray-100 dark:hover:bg-gray-800",
                        pathname === item.href ? "bg-gray-100 dark:bg-gray-800" : ""
                        )}
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                    </Link>
                    ))}
                </div>
                </ScrollArea>
            </div>

        </nav>
  )
}

