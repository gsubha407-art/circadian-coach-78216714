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
    const [internalValue, setInternalValue] = React.useState(defaultValue || "")
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
    }

    const inputId = id || React.useId()

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      // Update internal value from the actual input on blur
      setInternalValue(e.target.value)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      props.onChange?.(e)
    }

    // Check if there's actual content (not just empty string)
    const hasContent = (val: unknown): boolean => {
      if (typeof val === 'string') return val.length > 0
      if (typeof val === 'number') return true
      return false
    }

    // Use controlled value if provided, otherwise use internal tracking
    const currentValue = value !== undefined ? value : internalValue
    const isFloating = isFocused || hasContent(currentValue)

    // Ensure "outfocus" happens even if something prevents native blur (e.g. overlays)
    // Skip this for time/date inputs as it interferes with native pickers
    React.useEffect(() => {
      if (!isFocused) return
      if (type === "time" || type === "date" || type === "datetime-local") return

      const onPointerDownCapture = (e: PointerEvent) => {
        const container = containerRef.current
        const input = inputRef.current
        if (!container || !input) return

        const target = e.target as Node | null
        if (target && !container.contains(target)) {
          input.blur()
        }
      }

      document.addEventListener("pointerdown", onPointerDownCapture, true)
      return () => document.removeEventListener("pointerdown", onPointerDownCapture, true)
    }, [isFocused, type])

    return (
      <div ref={containerRef} className="relative w-full">
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
            {...props}
            type={type}
            id={inputId}
            ref={setRefs}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            className={cn(
              "peer flex h-14 w-full bg-transparent px-4 pt-4 pb-2 text-base text-foreground outline-none placeholder:text-transparent disabled:cursor-not-allowed disabled:opacity-38",
              type === "time" && "appearance-none"
            )}
            placeholder={label}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
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
