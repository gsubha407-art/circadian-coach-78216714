import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, Trash2, Check, ChevronsUpDown } from 'lucide-react';
import { Trip, Leg } from '@/types/trip';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import airportsData from '@/data/airports.json';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

const tripSchema = z.object({
  name: z.string().min(1, 'Trip name is required'),
  usualSleepStart: z.string().min(1, 'Sleep start time is required'),
  usualSleepEnd: z.string().min(1, 'Sleep end time is required'),
  sensitivity: z.enum(['low', 'medium', 'high']),
  melatoninOptIn: z.boolean(),
  cabinType: z.enum(['economy', 'premium', 'business', 'first']),
  caffeineHabits: z.enum(['none', 'light', 'moderate', 'heavy']),
});

type TripFormData = z.infer<typeof tripSchema>;

interface FlightLeg {
  originCity: string;
  originTZ: string;
  destCity: string;
  destTZ: string;
  departLocal: string;
  arriveLocal: string;
}

interface CustomTripFormProps {
  onBack: () => void;
  onTripCreate: (trip: Trip) => void;
}

export const CustomTripForm = ({ onBack, onTripCreate }: CustomTripFormProps) => {
  const [legs, setLegs] = useState<FlightLeg[]>([
    {
      originCity: '',
      originTZ: 'America/New_York',
      destCity: '',
      destTZ: 'Europe/London',
      departLocal: '',
      arriveLocal: '',
    }
  ]);

  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});

  const form = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      name: '',
      usualSleepStart: '23:00',
      usualSleepEnd: '07:00',
      sensitivity: 'medium',
      melatoninOptIn: false,
      cabinType: 'economy',
      caffeineHabits: 'moderate',
    },
  });

  const addLeg = () => {
    const lastLeg = legs[legs.length - 1];
    setLegs([...legs, {
      originCity: lastLeg.destCity,
      originTZ: lastLeg.destTZ,
      destCity: '',
      destTZ: 'Europe/London',
      departLocal: '',
      arriveLocal: '',
    }]);
  };

  const removeLeg = (index: number) => {
    if (legs.length > 1) {
      setLegs(legs.filter((_, i) => i !== index));
    }
  };

  const updateLeg = (index: number, field: keyof FlightLeg, value: string) => {
    const updatedLegs = [...legs];
    updatedLegs[index] = { ...updatedLegs[index], [field]: value };
    setLegs(updatedLegs);
  };

  const onSubmit = (data: TripFormData) => {
    const tripLegs: Leg[] = legs.map((leg, index) => ({
      id: `leg-${index + 1}`,
      originCity: leg.originCity,
      originCode: leg.originCity.substring(0, 3).toUpperCase(),
      originTZ: leg.originTZ,
      destCity: leg.destCity,
      destCode: leg.destCity.substring(0, 3).toUpperCase(),
      destTZ: leg.destTZ,
      departLocal: new Date(`${leg.departLocal}`).toISOString(),
      arriveLocal: new Date(`${leg.arriveLocal}`).toISOString(),
    }));

    const trip: Trip = {
      id: `custom-${Date.now()}`,
      name: data.name,
      legs: tripLegs,
      usualSleepStart: data.usualSleepStart,
      usualSleepEnd: data.usualSleepEnd,
      sensitivity: data.sensitivity,
      melatoninOptIn: data.melatoninOptIn,
      cabinType: data.cabinType,
      caffeineHabits: data.caffeineHabits,
    };

    onTripCreate(trip);
  };

  // Convert airports JSON to array format
  const airports = Object.values(airportsData).map((airport: any) => ({
    city: airport.city,
    timezone: airport.tz,
    name: airport.name,
    icao: airport.icao,
  }));

  // Get unique cities (since multiple airports may serve same city)
  const uniqueCities = Array.from(
    new Map(airports.map(a => [a.city, a])).values()
  );

  const handleCityChange = (index: number, field: 'origin' | 'dest', cityName: string) => {
    const airport = uniqueCities.find(a => a.city === cityName);
    if (airport) {
      if (field === 'origin') {
        updateLeg(index, 'originCity', airport.city);
        updateLeg(index, 'originTZ', airport.timezone);
      } else {
        updateLeg(index, 'destCity', airport.city);
        updateLeg(index, 'destTZ', airport.timezone);
      }
      // Close the popover after selection
      setOpenPopovers(prev => ({ ...prev, [`${index}-${field}`]: false }));
    }
  };

  const commonTimezones = [
    { value: 'America/New_York', label: 'Eastern Time (New York)' },
    { value: 'America/Chicago', label: 'Central Time (Chicago)' },
    { value: 'America/Denver', label: 'Mountain Time (Denver)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (Los Angeles)' },
    { value: 'America/Toronto', label: 'Eastern Time (Toronto)' },
    { value: 'America/Vancouver', label: 'Pacific Time (Vancouver)' },
    { value: 'America/Mexico_City', label: 'Central Time (Mexico City)' },
    { value: 'America/Sao_Paulo', label: 'Brasília Time (São Paulo)' },
    { value: 'America/Argentina/Buenos_Aires', label: 'Argentina Time (Buenos Aires)' },
    { value: 'Europe/London', label: 'GMT (London)' },
    { value: 'Europe/Paris', label: 'CET (Paris)' },
    { value: 'Europe/Berlin', label: 'CET (Berlin)' },
    { value: 'Europe/Rome', label: 'CET (Rome)' },
    { value: 'Europe/Madrid', label: 'CET (Madrid)' },
    { value: 'Europe/Amsterdam', label: 'CET (Amsterdam)' },
    { value: 'Europe/Moscow', label: 'MSK (Moscow)' },
    { value: 'Europe/Istanbul', label: 'TRT (Istanbul)' },
    { value: 'Asia/Dubai', label: 'GST (Dubai)' },
    { value: 'Asia/Singapore', label: 'SGT (Singapore)' },
    { value: 'Asia/Tokyo', label: 'JST (Tokyo)' },
    { value: 'Asia/Hong_Kong', label: 'HKT (Hong Kong)' },
    { value: 'Asia/Shanghai', label: 'CST (Shanghai)' },
    { value: 'Asia/Seoul', label: 'KST (Seoul)' },
    { value: 'Asia/Kolkata', label: 'IST (Mumbai)' },
    { value: 'Asia/Bangkok', label: 'ICT (Bangkok)' },
    { value: 'Australia/Sydney', label: 'AEDT (Sydney)' },
    { value: 'Australia/Melbourne', label: 'AEDT (Melbourne)' },
    { value: 'Pacific/Auckland', label: 'NZDT (Auckland)' },
    { value: 'Pacific/Honolulu', label: 'HST (Honolulu)' },
    { value: 'Africa/Cairo', label: 'EET (Cairo)' },
    { value: 'Africa/Johannesburg', label: 'SAST (Johannesburg)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Trips
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Create Custom Trip
          </h1>
          <p className="text-muted-foreground">
            Plan your personalized circadian optimization schedule
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>
                Basic information about your trip and sleep preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tokyo Business Trip" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="usualSleepStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usual Bedtime</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usualSleepEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usual Wake Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sensitivity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jet Lag Sensitivity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cabinType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cabin Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="premium">Premium Economy</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="first">First</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="caffeineHabits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caffeine Habits</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="light">Light (1 cup/day)</SelectItem>
                          <SelectItem value="moderate">Moderate (2-3 cups/day)</SelectItem>
                          <SelectItem value="heavy">Heavy (4+ cups/day)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="melatoninOptIn"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-end">
                      <FormLabel>Melatonin Recommendations</FormLabel>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label className="text-sm">Include melatonin guidance</Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Flight Itinerary
                <Button type="button" variant="outline" size="sm" onClick={addLeg}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Flight
                </Button>
              </CardTitle>
              <CardDescription>
                Add all flight segments for your trip
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {legs.map((leg, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Flight {index + 1}</h4>
                    {legs.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLeg(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Origin */}
                    <div className="space-y-2">
                      <Label>Origin City</Label>
                      <Popover 
                        open={openPopovers[`${index}-origin`] || false}
                        onOpenChange={(open) => setOpenPopovers(prev => ({ ...prev, [`${index}-origin`]: open }))}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !leg.originCity && "text-muted-foreground"
                            )}
                          >
                            {leg.originCity || "Select city"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search city..." />
                            <CommandList>
                              <CommandEmpty>No city found.</CommandEmpty>
                              <CommandGroup>
                                {uniqueCities.map((airport) => (
                                  <CommandItem
                                    key={`${airport.city}-${airport.icao}`}
                                    value={airport.city}
                                    onSelect={() => handleCityChange(index, 'origin', airport.city)}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        leg.originCity === airport.city ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {airport.city}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Label className="text-sm text-muted-foreground">Time Zone</Label>
                      <Select
                        value={leg.originTZ}
                        onValueChange={(value) => updateLeg(index, 'originTZ', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {commonTimezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Destination */}
                    <div className="space-y-2">
                      <Label>Destination City</Label>
                      <Popover 
                        open={openPopovers[`${index}-dest`] || false}
                        onOpenChange={(open) => setOpenPopovers(prev => ({ ...prev, [`${index}-dest`]: open }))}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !leg.destCity && "text-muted-foreground"
                            )}
                          >
                            {leg.destCity || "Select city"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search city..." />
                            <CommandList>
                              <CommandEmpty>No city found.</CommandEmpty>
                              <CommandGroup>
                                {uniqueCities.map((airport) => (
                                  <CommandItem
                                    key={`${airport.city}-${airport.icao}`}
                                    value={airport.city}
                                    onSelect={() => handleCityChange(index, 'dest', airport.city)}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        leg.destCity === airport.city ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {airport.city}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Label className="text-sm text-muted-foreground">Time Zone</Label>
                      <Select
                        value={leg.destTZ}
                        onValueChange={(value) => updateLeg(index, 'destTZ', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {commonTimezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Departure</Label>
                      <Input
                        type="datetime-local"
                        value={leg.departLocal}
                        onChange={(e) => updateLeg(index, 'departLocal', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Arrival</Label>
                      <Input
                        type="datetime-local"
                        value={leg.arriveLocal}
                        onChange={(e) => updateLeg(index, 'arriveLocal', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button type="submit">
              Create Optimization Plan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};