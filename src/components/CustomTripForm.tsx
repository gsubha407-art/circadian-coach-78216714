import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OutlinedTextField } from '@/components/ui/outlined-text-field';
import { Label } from '@/components/ui/label';
import { OutlinedSelect, OutlinedSelectContent, OutlinedSelectItem, OutlinedSelectTrigger, OutlinedSelectValue } from '@/components/ui/outlined-select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Trip, Leg } from '@/types/trip';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { airports } from '@/data/airports';
const tripSchema = z.object({
  name: z.string().min(1, 'Trip name is required'),
  usualSleepStart: z.string().min(1, 'Sleep start time is required'),
  usualSleepEnd: z.string().min(1, 'Sleep end time is required'),
  sensitivity: z.enum(['low', 'medium', 'high']),
  melatoninOptIn: z.boolean(),
  cabinType: z.enum(['economy', 'premium', 'business', 'first']),
  caffeineHabits: z.enum(['none', 'light', 'moderate', 'heavy'])
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
const getCurrentDateTimeLocal = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
export const CustomTripForm = ({
  onBack,
  onTripCreate
}: CustomTripFormProps) => {
  const [legs, setLegs] = useState<FlightLeg[]>([{
    originCity: '',
    originTZ: '',
    destCity: '',
    destTZ: '',
    departLocal: getCurrentDateTimeLocal(),
    arriveLocal: getCurrentDateTimeLocal()
  }]);
  const [legErrors, setLegErrors] = useState<Record<number, string>>({});
  const form = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      name: '',
      usualSleepStart: '23:00',
      usualSleepEnd: '07:00',
      sensitivity: 'medium',
      melatoninOptIn: false,
      cabinType: 'economy',
      caffeineHabits: 'moderate'
    }
  });
  const addLeg = () => {
    const lastLeg = legs[legs.length - 1];
    setLegs([...legs, {
      originCity: lastLeg.destCity,
      originTZ: lastLeg.destTZ,
      destCity: '',
      destTZ: '',
      departLocal: getCurrentDateTimeLocal(),
      arriveLocal: getCurrentDateTimeLocal()
    }]);
  };
  const removeLeg = (index: number) => {
    if (legs.length > 1) {
      setLegs(legs.filter((_, i) => i !== index));
    }
  };
  const updateLeg = (index: number, field: keyof FlightLeg, value: string) => {
    const updatedLegs = [...legs];
    updatedLegs[index] = {
      ...updatedLegs[index],
      [field]: value
    };
    const leg = updatedLegs[index];
    const newErrors = {
      ...legErrors
    };
    if (field === 'departLocal' || field === 'arriveLocal') {
      const departTime = field === 'departLocal' ? value : leg.departLocal;
      const arriveTime = field === 'arriveLocal' ? value : leg.arriveLocal;
      if (departTime && arriveTime) {
        const departDate = new Date(departTime);
        const arriveDate = new Date(arriveTime);
        if (arriveDate < departDate) {
          if (field === 'arriveLocal') {
            newErrors[index] = 'Arrival time cannot be before departure time';
          } else {
            newErrors[index] = 'Departure time cannot be after arrival time';
          }
        } else {
          delete newErrors[index];
        }
      } else {
        delete newErrors[index];
      }
    }
    setLegErrors(newErrors);
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
      arriveLocal: new Date(`${leg.arriveLocal}`).toISOString()
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
      caffeineHabits: data.caffeineHabits
    };
    onTripCreate(trip);
  };

  // Get unique cities (since multiple airports may serve same city)
  const uniqueCities = Array.from(new Map(airports.map(a => [a.city, a])).values());
  const handleCityChange = (index: number, field: 'origin' | 'dest', cityName: string) => {
    const airport = uniqueCities.find(a => a.city === cityName);
    if (airport) {
      const updatedLegs = [...legs];
      if (field === 'origin') {
        updatedLegs[index] = {
          ...updatedLegs[index],
          originCity: airport.city,
          originTZ: airport.timezone
        };
      } else {
        updatedLegs[index] = {
          ...updatedLegs[index],
          destCity: airport.city,
          destTZ: airport.timezone
        };
      }
      setLegs(updatedLegs);
    }
  };
  const commonTimezones = [{
    value: 'America/New_York',
    label: 'Eastern Time (New York)'
  }, {
    value: 'America/Chicago',
    label: 'Central Time (Chicago)'
  }, {
    value: 'America/Denver',
    label: 'Mountain Time (Denver)'
  }, {
    value: 'America/Los_Angeles',
    label: 'Pacific Time (Los Angeles)'
  }, {
    value: 'America/Toronto',
    label: 'Eastern Time (Toronto)'
  }, {
    value: 'America/Vancouver',
    label: 'Pacific Time (Vancouver)'
  }, {
    value: 'America/Mexico_City',
    label: 'Central Time (Mexico City)'
  }, {
    value: 'America/Sao_Paulo',
    label: 'Brasília Time (São Paulo)'
  }, {
    value: 'America/Argentina/Buenos_Aires',
    label: 'Argentina Time (Buenos Aires)'
  }, {
    value: 'Europe/London',
    label: 'GMT (London)'
  }, {
    value: 'Europe/Paris',
    label: 'CET (Paris)'
  }, {
    value: 'Europe/Berlin',
    label: 'CET (Berlin)'
  }, {
    value: 'Europe/Rome',
    label: 'CET (Rome)'
  }, {
    value: 'Europe/Madrid',
    label: 'CET (Madrid)'
  }, {
    value: 'Europe/Amsterdam',
    label: 'CET (Amsterdam)'
  }, {
    value: 'Europe/Moscow',
    label: 'MSK (Moscow)'
  }, {
    value: 'Europe/Istanbul',
    label: 'TRT (Istanbul)'
  }, {
    value: 'Asia/Dubai',
    label: 'GST (Dubai)'
  }, {
    value: 'Asia/Singapore',
    label: 'SGT (Singapore)'
  }, {
    value: 'Asia/Tokyo',
    label: 'JST (Tokyo)'
  }, {
    value: 'Asia/Hong_Kong',
    label: 'HKT (Hong Kong)'
  }, {
    value: 'Asia/Shanghai',
    label: 'CST (Shanghai)'
  }, {
    value: 'Asia/Seoul',
    label: 'KST (Seoul)'
  }, {
    value: 'Asia/Kolkata',
    label: 'IST (Mumbai)'
  }, {
    value: 'Asia/Bangkok',
    label: 'ICT (Bangkok)'
  }, {
    value: 'Australia/Sydney',
    label: 'AEDT (Sydney)'
  }, {
    value: 'Australia/Melbourne',
    label: 'AEDT (Melbourne)'
  }, {
    value: 'Pacific/Auckland',
    label: 'NZDT (Auckland)'
  }, {
    value: 'Pacific/Honolulu',
    label: 'HST (Honolulu)'
  }, {
    value: 'Africa/Cairo',
    label: 'EET (Cairo)'
  }, {
    value: 'Africa/Johannesburg',
    label: 'SAST (Johannesburg)'
  }];
  return <div className="space-y-6">
      {/* Fixed back button header */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-background border-b border-border z-50">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
      {/* Spacer for fixed header - 56px header + 40px gap = 96px total */}
      <div className="h-24" />
      
      <div className="space-y-4">
        <div className="mb-10 -mt-4">
          <h1 className="headline-small bg-gradient-hero bg-clip-text text-transparent">
            Create Custom Trip
          </h1>
          <p className="title-small text-3xl font-bold text-text-primary">Create Your Adjustment Plan</p>
          <p className="body-medium text-muted-foreground mt-2 text-lg font-normal">Share a few details to build a schedule that helps your body adjust</p>
        </div>
      </div>

      <Form {...form}>
        <form id="trip-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="title-large">Trip Details</CardTitle>
              <CardDescription className="body-medium">
                Basic information about your trip and sleep preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField control={form.control} name="name" render={({
              field
            }) => <FormItem>
                    <FormControl>
                      <OutlinedTextField label="Trip Name" placeholder="e.g., Tokyo Business Trip" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="usualSleepStart" render={({
                field
              }) => <FormItem>
                      <FormControl>
                        <OutlinedTextField label="Usual Bedtime" type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="usualSleepEnd" render={({
                field
              }) => <FormItem>
                      <FormControl>
                        <OutlinedTextField label="Usual Wake Up Time" type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="sensitivity" render={({
                field
              }) => <FormItem>
                      <OutlinedSelect onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <OutlinedSelectTrigger label="How Do You Handle Jet Lag?">
                            <OutlinedSelectValue />
                          </OutlinedSelectTrigger>
                        </FormControl>
                        <OutlinedSelectContent>
                          <OutlinedSelectItem value="low">I adjust pretty quickly</OutlinedSelectItem>
                          <OutlinedSelectItem value="medium">It takes a day or two</OutlinedSelectItem>
                          <OutlinedSelectItem value="high">It takes several days to feel normal</OutlinedSelectItem>
                        </OutlinedSelectContent>
                      </OutlinedSelect>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="cabinType" render={({
                field
              }) => <FormItem>
                      <OutlinedSelect onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <OutlinedSelectTrigger label="Cabin Type">
                            <OutlinedSelectValue />
                          </OutlinedSelectTrigger>
                        </FormControl>
                        <OutlinedSelectContent>
                          <OutlinedSelectItem value="economy">Economy</OutlinedSelectItem>
                          <OutlinedSelectItem value="premium">Premium Economy</OutlinedSelectItem>
                          <OutlinedSelectItem value="business">Business</OutlinedSelectItem>
                          <OutlinedSelectItem value="first">First</OutlinedSelectItem>
                        </OutlinedSelectContent>
                      </OutlinedSelect>
                      <FormMessage />
                    </FormItem>} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="caffeineHabits" render={({
                field
              }) => <FormItem>
                      <OutlinedSelect onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <OutlinedSelectTrigger label="Caffeine Habits">
                            <OutlinedSelectValue />
                          </OutlinedSelectTrigger>
                        </FormControl>
                        <OutlinedSelectContent>
                          <OutlinedSelectItem value="none">None</OutlinedSelectItem>
                          <OutlinedSelectItem value="light">Light (1 cup/day)</OutlinedSelectItem>
                          <OutlinedSelectItem value="moderate">Moderate (2-3 cups/day)</OutlinedSelectItem>
                          <OutlinedSelectItem value="heavy">Heavy (4+ cups/day)</OutlinedSelectItem>
                        </OutlinedSelectContent>
                      </OutlinedSelect>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="melatoninOptIn" render={({
                field
              }) => <FormItem className="flex-row gap-2 self-center flex items-center justify-start">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <Label className="text-sm text-foreground">Suggest Melatonin</Label>
                      <FormMessage />
                    </FormItem>} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="title-large flex items-center justify-between">
                Flight Itinerary
                <Button type="button" variant="outline" size="sm" onClick={addLeg}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Flight
                </Button>
              </CardTitle>
              <CardDescription className="body-medium">
                Add all flight segments for your trip
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-0">
              {legs.map((leg, index) => <div key={index} className="space-y-5 overflow-hidden">
                  {index > 0 && <hr className="border-border my-6" />}
                  <div className="flex items-center justify-between">
                    <h4 className="title-small">Flight {index + 1}</h4>
                    {legs.length > 1 && <Button type="button" variant="ghost" size="sm" onClick={() => removeLeg(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>}
                  </div>
                  <hr className="border-border" />

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Origin */}
                    <div className="space-y-4 min-w-0">
                      <OutlinedSelect value={leg.originCity} onValueChange={value => handleCityChange(index, 'origin', value)}>
                        <OutlinedSelectTrigger label="Origin City">
                          <OutlinedSelectValue placeholder="Select Origin City" />
                        </OutlinedSelectTrigger>
                        <OutlinedSelectContent>
                          {uniqueCities.map(airport => <OutlinedSelectItem key={`${airport.city}-${airport.iataCode}`} value={airport.city}>
                              {airport.city}
                            </OutlinedSelectItem>)}
                        </OutlinedSelectContent>
                      </OutlinedSelect>
                      <OutlinedSelect value={leg.originTZ} onValueChange={value => updateLeg(index, 'originTZ', value)}>
                        <OutlinedSelectTrigger label="Origin Time Zone">
                          <OutlinedSelectValue placeholder="Select Time Zone" />
                        </OutlinedSelectTrigger>
                        <OutlinedSelectContent>
                          {commonTimezones.map(tz => <OutlinedSelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </OutlinedSelectItem>)}
                        </OutlinedSelectContent>
                      </OutlinedSelect>
                    </div>

                    {/* Destination */}
                    <div className="space-y-4 min-w-0">
                      <OutlinedSelect value={leg.destCity} onValueChange={value => handleCityChange(index, 'dest', value)}>
                        <OutlinedSelectTrigger label="Destination City">
                          <OutlinedSelectValue placeholder="Select Destination City" />
                        </OutlinedSelectTrigger>
                        <OutlinedSelectContent>
                          {uniqueCities.map(airport => <OutlinedSelectItem key={`${airport.city}-${airport.iataCode}`} value={airport.city}>
                              {airport.city}
                            </OutlinedSelectItem>)}
                        </OutlinedSelectContent>
                      </OutlinedSelect>
                      <OutlinedSelect value={leg.destTZ} onValueChange={value => updateLeg(index, 'destTZ', value)}>
                        <OutlinedSelectTrigger label="Destination Time Zone">
                          <OutlinedSelectValue placeholder="Select Time Zone" />
                        </OutlinedSelectTrigger>
                        <OutlinedSelectContent>
                          {commonTimezones.map(tz => <OutlinedSelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </OutlinedSelectItem>)}
                        </OutlinedSelectContent>
                      </OutlinedSelect>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <OutlinedTextField label="Departure" type="datetime-local" value={leg.departLocal} onChange={e => updateLeg(index, 'departLocal', e.target.value)} error={!!legErrors[index]} className="w-full" />
                    </div>
                    <div className="min-w-0">
                      <OutlinedTextField label="Arrival" type="datetime-local" value={leg.arriveLocal} onChange={e => updateLeg(index, 'arriveLocal', e.target.value)} error={!!legErrors[index]} className="w-full" />
                    </div>
                  </div>
                  {legErrors[index] && <p className="text-sm text-destructive">{legErrors[index]}</p>}
                </div>)}
            </CardContent>
          </Card>

          {/* Spacer for fixed buttons */}
          <div className="h-20" />
        </form>
      </Form>
      
      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex justify-end gap-4 z-50">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 sm:flex-none sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" form="trip-form" disabled={Object.keys(legErrors).length > 0} className="flex-1 sm:flex-none sm:w-auto">
          Create my plan
        </Button>
      </div>
    </div>;
};