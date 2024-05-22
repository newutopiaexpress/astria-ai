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
          "flex rounded-none w-full border-b focus:outline-none focus:border-neutral-500 focus:shadow-xl  focus:shadow-neutral-700/20 border-neutral-400 bg-transparent px-3 py-3 text-sm shadow-none transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ",
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
