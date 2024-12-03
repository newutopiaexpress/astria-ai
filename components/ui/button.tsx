import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        christmas:
          "text-xs hover:shadow-sm bg-stone-100/40 border hover:bg-stone-100 text-stone-800",
        googledark:
          "transition-all duration-75 font-medium text-stone-100 bg-stone-800 fill-stone-100 rounded-full outline outline-8 hover:outline-0 outline-offset-2 hover:outline-offset-0 outline-stone-300/20 hover:bg-gradient-to-b hover:from-white hover:to-neutral-200 hover:text-stone-800 hover:shadow-sm",
        google:
          "font-medium bg-gradient-to-b from-white to-white/0 rounded-full text-stone-800 outline outline-8 hover:outline-0 outline-offset-2 hover:outline-offset-0 outline-stone-300/20 hover:bg-gradient-to-b hover:from-white hover:to-neutral-200 hover:text-stone-800 hover:shadow-sm transition-all",
        navbar:
          "bg-transparent text-stone-800 hover:shadow-lg",
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        buy:
          "transition-all w-full border border-input bg-background shadow-sm hover:bg-white rounded-full outline outline-0 outline-offset-6 outline-fuchsia-300/0 hover:outline hover:outline-offset-0 hover:outline-4 hover:outline-fuchsia-300/20  hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        navbar: "h-9 pl-5 pr-3 py-2",
        login: "h-9 w-9 ",
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
