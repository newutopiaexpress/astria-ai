import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        submit:
          "bg-stone-800 text-stone-200 rounded-full shadow-sm hover:bg-stone-600",
        navbar:"font-normal outline outline-4 border border-stone-300 outline-offset-2 outline-stone-300/0 shadow-sm transition-all duration-100 text-xs bg-stone-200 rounded-3xl text-stone-800 hover:outline hover:outline-offset-1 hover:outline-green-400 hover:outline-1 hover:shadow-md",
        google:"outline outline-4 border border-stone-300 outline-offset-2 outline-stone-300/50 shadow-sm transition-all duration-100 text-sm bg-stone-200 rounded-3xl text-stone-800 hover:outline hover:outline-offset-1 hover:outline-stone-400 hover:outline-1 hover:shadow-md",
        //google:"outline outline-offset-2 transition-all duration-100 text-sm bg-stone-800 hover:bg-stone-850 shadow-md shadow-stone-800/50 hover:shadow-md rounded-3xl text-stone-300 hover:text-stone-200",
        googleoutline:"transition-all duration-100 text-sm bg-transparent hover:bg-stone-850 shadow-md shadow-stone-800/50 hover:shadow-md rounded-3xl text-stone-300 hover:text-stone-200",
        loginbig:
          "bg-stone-800 text-stone-200 rounded-lg shadow-sm hover:bg-stone-600",
        default:
          "bg-stone-100 hover:bg-stone-100 border border-stone-200 rounded-full text-xs font-normal text-stone-800 shadow-md hover:shadow-md hover:bg-white",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-transparent rounded-full bg-transparent shadow-md hover:bg-stone-100 ",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "p-4 rounded full bg-stone-100",
        close: "text-stone-400 hover:text-stone-800 font-normal z-50 rounded-full border border-stone-300 bg-stone-100/0 hover:bg-stone-100/100  outline outline-8 outline-offset-2 outline-stone-300/20 hover:outline hover:outline-2 hover:outline-offset-1  transition-all",
        link: "text-primary underline-offset-4 hover:underline",
        back: "bg-stone-100 text-stone-400 hover:text-stone-500",
      },
      size: {
        navbar: "h-8 px-4 py-2",
        default: "h-9 px-4 py-2",
        sm: "h-6 rounded-full px-3 py-2 text-xs",
        md:"h-9 pl-4 pr-2 py-6 text-xs align-center",
        lg: "h-10 rounded-full px-6",
        icon: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        children={
          isLoading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            children
          )
        }
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
