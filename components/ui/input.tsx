import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "rounded-md outline outline-offset-2 outline-stone-300/20 focus:outline focus:outline-offset-2 focus:outline-stone-300/30 outline-8 flex  w-full focus:outline-none focus:border-green-400 focus:shadow-md  focus:shadow-neutral-700/20 border-neutral-400 bg-transparent px-3 py-3 text-sm shadow-none transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
