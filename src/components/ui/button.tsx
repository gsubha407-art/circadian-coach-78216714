import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-short ease-emphasized focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-38 [&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        // MD3 Filled button
        default: "bg-primary text-primary-foreground rounded-full hover:shadow-elevation-1 active:shadow-none",
        // MD3 Filled Tonal button  
        tonal: "bg-secondary-container text-secondary-on-container rounded-full hover:shadow-elevation-1 active:shadow-none",
        // MD3 Outlined button
        outline: "border border-outline bg-transparent text-primary rounded-full hover:bg-primary/[0.08] active:bg-primary/[0.12]",
        // MD3 Elevated button
        elevated: "bg-surface-container-low text-primary shadow-elevation-1 rounded-full hover:shadow-elevation-2 active:shadow-elevation-1",
        // MD3 Text button
        ghost: "text-primary rounded-full hover:bg-primary/[0.08] active:bg-primary/[0.12]",
        // Destructive variant
        destructive: "bg-destructive text-destructive-foreground rounded-full hover:shadow-elevation-1 active:shadow-none",
        // Secondary - uses secondary color
        secondary: "bg-secondary text-secondary-foreground rounded-full hover:shadow-elevation-1 active:shadow-none",
        // Link style
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2.5",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
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
