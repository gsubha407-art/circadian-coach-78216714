import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trip } from '@/types/trip';
import { sampleTrips } from '@/data/sampleTrips';
import { Plane, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { CustomTripForm } from './CustomTripForm';
import { CircadianOptimizer } from '@/lib/circadianOptimizer';

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

  // Helper functions defined before useMemo
  const getNextAction = (plan: any): string => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM

    // Find today's plan
    const todayPlan = plan.days.find((day: any) => day.date === currentDate);
    
    if (!todayPlan) {
      return "Start your plan soon";
    }

    // Find current or next activity
    for (const activity of todayPlan.activities) {
      if (currentTime < activity.endTime) {
        if (currentTime >= activity.startTime) {
          return `Now: ${activity.description}`;
        } else {
          return `Next: ${activity.description} at ${activity.startTime}`;
        }
      }
    }

    return "Check your plan for tomorrow";
  };

  const getRouteString = (trip: Trip): string => {
    if (trip.legs.length === 1) {
      return `${trip.legs[0].originCity} → ${trip.legs[0].destCity}`;
    }
    const cities = [trip.legs[0].originCity, ...trip.legs.map(leg => leg.destCity)];
    return cities.join(' → ');
  };

  // Generate plans and next actions for all trips
  const tripsWithNextActions = useMemo(() => {
    return sampleTrips.map(trip => {
      const optimizer = new CircadianOptimizer(trip);
      const plan = optimizer.generateOptimizationPlan();
      const nextAction = getNextAction(plan);
      return { trip, nextAction };
    });
  }, []);

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
        <div>
          <Button variant="outline" size="lg" onClick={() => setShowCustomForm(true)}>
            <Plane className="h-4 w-4 mr-2" />
            Create Custom Trip
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
        {tripsWithNextActions.map(({ trip, nextAction }) => (
          <Card 
            key={trip.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
              selectedTrip === trip.id ? 'ring-2 ring-primary shadow-glow' : ''
            }`}
            onClick={() => handleTripClick(trip)}
          >
            <CardHeader>
              <div className="space-y-4">
                {/* Trip Name */}
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl">{trip.name}</CardTitle>
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

                {/* Route */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{getRouteString(trip)}</span>
                </div>

                {/* Next Action - Highlighted */}
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
                        Current Recommendation
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {nextAction}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Sleep: {trip.usualSleepStart} - {trip.usualSleepEnd}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};