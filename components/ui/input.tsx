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
          "transition-all duration-900 rounded-full border border-stone-300 hover:border-green-300 shadow-md shadow-red-400/10 hover:shadow-inner outline outline-8 outline-offset-4 outline-stone-300/40 focus:outline focus:outline-offset-2 focus:outline-stone-300/30 hover:outline-2 hover:outline-offset-1 flex  w-full focus:outline-none focus:border-green-400  bg-stone-100/90 px-3 py-3 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ",
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
