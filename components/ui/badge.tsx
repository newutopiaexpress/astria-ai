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
        secondary:
          "border-transparent bg-transparent shadow-sm text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "py-2 px-6 shadow-0 border border-slate-400/30 rounded-full text-sm text-stone-600 hover:text-stone-800 hover:bg-gradient-to-t hover:from-stone-200 hover:to-white ",
        finished:
          "border border-green-300 text-xs font-normal bg-transparent text-stone-500 shadow-sm hover:shadow-md",
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
