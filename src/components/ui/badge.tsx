import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium transition-colors duration-short ease-standard focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // MD3 Filled badge
        default:
          "bg-primary text-primary-foreground",
        // MD3 Tonal badge
        secondary:
          "bg-secondary-container text-secondary-on-container",
        // MD3 Error badge  
        destructive:
          "bg-destructive-container text-destructive-on-container",
        // MD3 Outlined badge
        outline: 
          "border border-outline text-foreground bg-transparent",
        // Circadian specific badges
        sleep:
          "bg-sleep-light text-sleep",
        melatonin:
          "bg-melatonin-light text-melatonin",
        caffeine:
          "bg-caffeine-light text-caffeine",
        nap:
          "bg-nap-light text-nap",
        light:
          "bg-light-seek/20 text-light-seek-foreground",
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
