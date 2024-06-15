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
        outline: "shadow-0 border border-stone-300 rounded-full pl-4 pr-1 py-1 text-xs text-stone-500 hover:text-stone-800 hover:bg-gradient-to-t hover:from-stone-200 hover:to-white ",
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
