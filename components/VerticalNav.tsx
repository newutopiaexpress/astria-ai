"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, BarChart2, Users, Settings, HelpCircle, Menu } from 'lucide-react';
import { User } from "@supabase/auth-helpers-nextjs";

const navItems = [
  { name: "FAQ", href: "/analytics", icon: BarChart2 },
  { name: "Contact Us", href: "/customers", icon: Users },
  { name: "Pricing", href: "#pricing", icon: Settings },
  { name: "Privacy Policy", href: "/privacy", icon: HelpCircle },
]

export function VerticalNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
        <nav
            className={cn(
                "h-full  bg-stone-200/0 transition-transform duration-200 ease-in-out lg:translate-x-0",
                isOpen && "translate-x-0"
            )}
            >
            <div className="flex h-full flex-col">
                <ScrollArea className="flex-1 px-3">
                <div className="space-y-2 mt-16 flex-col items-center justify-between">
                    {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                        "flex items-center px-2 py-4 border-b border-stone-300 text-gray-900 transition-all hover:bg-stone-100/40 dark:text-gray-100 dark:hover:bg-gray-800",
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

