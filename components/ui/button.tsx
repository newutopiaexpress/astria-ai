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
        google:"outline outline-offset-2 transition-all duration-100 text-sm bg-stone-800 hover:bg-stone-850 shadow-md shadow-stone-800/50 hover:shadow-md rounded-3xl text-stone-300 hover:text-stone-200",
        loginbig:
          "bg-stone-800 text-stone-200 rounded-lg shadow-sm hover:bg-stone-600",
        default:
          "bg-stone-100 hover:bg-stone-100 border border-stone-200 rounded-full text-xs font-normal text-stone-800 shadow-md hover:shadow-md hover:bg-white",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-transparent rounded-full bg-transparent shadow-lg hover:bg-stone-100 ",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "text-xs uppercase hover:rounded-full rounded-full opacity-20 hover:opacity-100 hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        back: "bg-stone-100 text-stone-400 hover:text-stone-500",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-6 rounded-full px-3 py-2 text-xs",
        md:"h-9 px-6 py-6 text-xs align-center",
        lg: "h-10 rounded-full px-8",
        icon: "h-9 w-9",
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
