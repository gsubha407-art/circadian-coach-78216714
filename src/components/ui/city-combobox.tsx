import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
}

export function CityCombobox({
  cities,
  value,
  onValueChange,
  placeholder = "Select city...",
  label,
}: CityComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-14 px-3 font-normal text-left"
            data-testid={`combobox-${label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className={cn("text-sm", !value && "text-muted-foreground")}>
                {value || placeholder}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
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
