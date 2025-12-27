import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CityOption {
  city: string;
  iataCode: string;
  country: string;
}

interface CityComboboxProps {
  cities: CityOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label: string;
  error?: boolean;
}

export function CityCombobox({
  cities,
  value,
  onValueChange,
  placeholder = "Select city...",
  label,
  error = false,
}: CityComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const hasValue = !!value
  const isFloating = open || hasValue

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex h-14 w-full items-center justify-between rounded-md bg-transparent px-4 pt-4 pb-2 text-base ring-offset-background transition-all duration-short ease-standard text-left",
              open
                ? error
                  ? "border-2 border-error"
                  : "border-2 border-primary"
                : error
                ? "border border-error"
                : "border border-outline hover:border-text-primary",
              "disabled:cursor-not-allowed disabled:opacity-38"
            )}
            data-testid={`combobox-${label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <span className={cn("line-clamp-1", !value && "text-transparent")}>
              {value || placeholder}
            </span>
            <ChevronDown className="h-5 w-5 text-text-secondary" />
          </button>
        </PopoverTrigger>
        <label
          className={cn(
            "absolute left-3 px-1 pointer-events-none transition-all duration-short ease-standard bg-background",
            isFloating
              ? cn(
                  "top-0 -translate-y-1/2 text-label-sm",
                  open
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
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search city..." />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={`${city.city}-${city.iataCode}`}
                    value={city.city}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    data-testid={`city-option-${city.iataCode}`}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === city.city ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city.city}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
