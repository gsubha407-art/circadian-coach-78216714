import * as React from "react"
import { cn } from "@/lib/utils"

export interface OutlinedTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: boolean
  supportingText?: string
}

const OutlinedTextField = React.forwardRef<HTMLInputElement, OutlinedTextFieldProps>(
  ({ className, type, label, error, supportingText, id, value, defaultValue, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const inputId = id || React.useId()

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    // Check if there's actual content (not just empty string)
    const hasContent = (val: unknown): boolean => {
      if (typeof val === 'string') return val.length > 0
      if (typeof val === 'number') return true
      return false
    }

    const isFloating = isFocused || hasContent(value) || hasContent(defaultValue)

    return (
      <div className="relative w-full">
        <div
          className={cn(
            "relative flex items-center rounded-md border bg-transparent transition-all duration-short ease-standard",
            isFocused
              ? error
                ? "border-2 border-error"
                : "border-2 border-primary"
              : error
              ? "border border-error"
              : "border border-outline hover:border-text-primary",
            className
          )}
        >
          <input
            type={type}
            id={inputId}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              "peer flex h-14 w-full bg-transparent px-4 pt-4 pb-2 text-base text-foreground outline-none placeholder:text-transparent disabled:cursor-not-allowed disabled:opacity-38",
              type === "time" && "appearance-none"
            )}
            placeholder={label}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          <label
            htmlFor={inputId}
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
        {supportingText && (
          <p
            className={cn(
              "mt-1 px-4 text-label-sm",
              error ? "text-error" : "text-text-secondary"
            )}
          >
            {supportingText}
          </p>
        )}
      </div>
    )
  }
)
OutlinedTextField.displayName = "OutlinedTextField"

export { OutlinedTextField }
