import * as React from "react"
import { cn } from "@/lib/utils"

export interface OutlinedTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: boolean
  supportingText?: string
}

const OutlinedTextField = React.forwardRef<HTMLInputElement, OutlinedTextFieldProps>(
  ({ className, type, label, error, supportingText, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const inputId = id || React.useId()

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value)
      props.onChange?.(e)
    }

    const isFloating = isFocused || hasValue || !!props.value || !!props.defaultValue

    return (
      <div className="relative w-full">
        <div
          className={cn(
            "relative flex items-center rounded-xs border bg-transparent transition-all duration-short ease-standard",
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
            className={cn(
              "peer flex h-14 w-full bg-transparent px-4 pt-4 pb-2 text-base text-foreground outline-none placeholder:text-transparent disabled:cursor-not-allowed disabled:opacity-38",
              type === "time" && "appearance-none"
            )}
            placeholder={label}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
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
