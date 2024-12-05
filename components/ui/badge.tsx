import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        warning:
          "border border-red-900 text-xs font-normal bg-transparent text-stone-500 shadow-sm hover:shadow-md",
        default:
          "border border-red-900 text-xs font-normal bg-transparent text-stone-500 shadow-sm hover:shadow-md",
        message:
          "rounded-full w-5 h-5 bg-gradient-to-b from-stone-600 to-stone-700 text-center text-xs font-normal text-stone-100 shadow-md hover:shadow-md border-0",
        secondary:
          "border-transparent bg-transparent shadow-sm text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
          examples: "bg-stone-100/80 transition-all hover:backdrop-blur-sm hover:bg-stone-100 py-1 px-4 shadow-0 border border-stone-100 rounded-full text-xs text-stone-600 hover:text-stone-800",
          outline: "outline outline-6 outline-offset-4 outline-stone-100 bg-stone-100/0 transition-all hover:backdrop-blur-sm hover:bg-stone-100 py-1 px-4 shadow-0 border border-stone-100 rounded-full text-xs text-stone-600 hover:text-stone-800",
        finished:
          "border border-green-300 text-xs font-normal bg-transparent text-green-600 shadow-sm hover:shadow-md",
        credits:
          "w-auto h-6 outline outline outline-offset-2 outline-4 outline-green-300/50 rounded-full text-center border-none bg-green-300 text-xs font-normal text-green-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
