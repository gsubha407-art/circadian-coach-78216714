import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trip } from '@/types/trip';
import { sampleTrips } from '@/data/sampleTrips';
import { Plane, Clock, MapPin, Users } from 'lucide-react';
import { CustomTripForm } from './CustomTripForm';

interface TripSelectorProps {
  onTripSelect: (trip: Trip) => void;
}

export const TripSelector = ({ onTripSelect }: TripSelectorProps) => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip.id);
    onTripSelect(trip);
  };

  const handleCustomTripCreate = (trip: Trip) => {
    onTripSelect(trip);
  };

  if (showCustomForm) {
    return (
      <CustomTripForm
        onBack={() => setShowCustomForm(false)}
        onTripCreate={handleCustomTripCreate}
      />
    );
  }

  const getSensitivityColor = (sensitivity: string) => {
    switch (sensitivity) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Time Zone Sleep Optimizer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Minimize jet lag with personalized circadian shift plans. Select a sample trip below to see the optimization in action.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
        {sampleTrips.map((trip) => (
          <Card 
            key={trip.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
              selectedTrip === trip.id ? 'ring-2 ring-primary shadow-glow' : ''
            }`}
            onClick={() => handleTripClick(trip)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{trip.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {trip.legs.length === 1 
                      ? `${trip.legs[0].originCity} → ${trip.legs[0].destCity}`
                      : `${trip.legs[0].originCity} → ${trip.legs[trip.legs.length - 1].destCity} (${trip.legs.length} legs)`
                    }
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getSensitivityColor(trip.sensitivity)}>
                    {trip.sensitivity} sensitivity
                  </Badge>
                  {trip.melatoninOptIn && (
                    <Badge variant="outline" className="text-melatonin border-melatonin">
                      Melatonin
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Flight segments */}
                <div className="space-y-2">
                  {trip.legs.map((leg, index) => (
                    <div key={leg.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Plane className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{leg.originCode} → {leg.destCode}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(leg.departLocal).toLocaleDateString()} • 
                        {new Date(leg.departLocal).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trip details */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Sleep: {trip.usualSleepStart} - {trip.usualSleepEnd}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{trip.cabinType}</span>
                    </div>
                  </div>
                  <Button 
                    variant={selectedTrip === trip.id ? "default" : "outline"}
                    size="sm"
                  >
                    {selectedTrip === trip.id ? "Selected" : "View Plan"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg" onClick={() => setShowCustomForm(true)}>
          <Plane className="h-4 w-4 mr-2" />
          Create Custom Trip
        </Button>
      </div>
    </div>
  );
};