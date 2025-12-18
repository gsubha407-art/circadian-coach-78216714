import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const OutlinedSelect = SelectPrimitive.Root

const OutlinedSelectGroup = SelectPrimitive.Group

const OutlinedSelectValue = SelectPrimitive.Value

interface OutlinedSelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  label: string
  error?: boolean
}

const OutlinedSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  OutlinedSelectTriggerProps
>(({ className, children, label, error, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)

  // Check if there's a value by looking at the children
  React.useEffect(() => {
    // The SelectValue component will render children when there's a value
    setHasValue(!!children)
  }, [children])

  const isFloating = isFocused || hasValue

  return (
    <div className="relative w-full">
      <SelectPrimitive.Trigger
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "flex h-14 w-full items-center justify-between rounded-md bg-transparent px-4 pt-4 pb-2 text-base ring-offset-background transition-all duration-short ease-standard [&>span]:line-clamp-1",
          isFocused
            ? error
              ? "border-2 border-error"
              : "border-2 border-primary"
            : error
            ? "border border-error"
            : "border border-outline hover:border-text-primary",
          "disabled:cursor-not-allowed disabled:opacity-38",
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-5 w-5 text-text-secondary" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <label
        className={cn(
          "absolute left-3 px-1 pointer-events-none transition-all duration-short ease-standard bg-background",
          isFloating
            ? cn(
                "top-0 -translate-y-1/2 text-label-sm",
                isFocused
                  ? error
                    ? "text-error"
                    : "text-primary"
                  : error
                  ? "text-error"
                  : "text-text-secondary"
              )
            : cn(
                "top-1/2 -translate-y-1/2 text-body-md",
                error ? "text-error" : "text-text-secondary"
              )
        )}
      >
        {label}
      </label>
    </div>
  )
})
OutlinedSelectTrigger.displayName = "OutlinedSelectTrigger"

const OutlinedSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
OutlinedSelectScrollUpButton.displayName = "OutlinedSelectScrollUpButton"

const OutlinedSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
OutlinedSelectScrollDownButton.displayName = "OutlinedSelectScrollDownButton"

const OutlinedSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md bg-surface text-foreground shadow-elevation-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <OutlinedSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "py-2",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <OutlinedSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
OutlinedSelectContent.displayName = "OutlinedSelectContent"

const OutlinedSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-2 px-4 text-sm font-medium text-text-secondary", className)}
    {...props}
  />
))
OutlinedSelectLabel.displayName = "OutlinedSelectLabel"

const OutlinedSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center py-3 pl-4 pr-12 text-base outline-none transition-colors duration-short ease-standard focus:bg-primary/[0.08] data-[disabled]:pointer-events-none data-[disabled]:opacity-38",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-4 flex h-5 w-5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-5 w-5 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
))
OutlinedSelectItem.displayName = "OutlinedSelectItem"

const OutlinedSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-outline-variant", className)}
    {...props}
  />
))
OutlinedSelectSeparator.displayName = "OutlinedSelectSeparator"

export {
  OutlinedSelect,
  OutlinedSelectGroup,
  OutlinedSelectValue,
  OutlinedSelectTrigger,
  OutlinedSelectContent,
  OutlinedSelectLabel,
  OutlinedSelectItem,
  OutlinedSelectSeparator,
  OutlinedSelectScrollUpButton,
  OutlinedSelectScrollDownButton,
}
