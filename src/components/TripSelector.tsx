import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trip, OptimizationPlan as OptimizationPlanType } from '@/types/trip';
import { Plane, Clock, MapPin, Users, Bookmark, Trash2 } from 'lucide-react';
import { CustomTripForm } from './CustomTripForm';
import { CircadianOptimizer } from '@/lib/circadianOptimizer';
import { getSavedTrips, deleteSavedTrip, SavedTrip } from '@/lib/savedTrips';
import { useToast } from '@/hooks/use-toast';
interface TripSelectorProps {
  onTripSelect: (trip: Trip, existingPlan?: OptimizationPlanType) => void;
}
export const TripSelector = ({
  onTripSelect
}: TripSelectorProps) => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(getSavedTrips());
  const {
    toast
  } = useToast();
  const handleTripClick = (trip: Trip, plan?: OptimizationPlanType) => {
    setSelectedTrip(trip.id);
    onTripSelect(trip, plan);
  };
  const handleCustomTripCreate = (trip: Trip) => {
    onTripSelect(trip);
  };
  const handleDeleteSavedTrip = (tripId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      deleteSavedTrip(tripId);
      setSavedTrips(getSavedTrips());
      toast({
        title: "Trip deleted",
        description: "Saved trip has been removed."
      });
    } catch (error) {
      toast({
        title: "Error deleting trip",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  // Helper functions defined before useMemo
  const getNextAction = (plan: any): {
    text: string;
    show: boolean;
  } => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM

    if (!plan.days || plan.days.length === 0) {
      return {
        text: "",
        show: false
      };
    }
    const firstPlanDate = plan.days[0].date;
    const lastPlanDate = plan.days[plan.days.length - 1].date;

    // Plan dates have passed - don't show recommendation
    if (currentDate > lastPlanDate) {
      return {
        text: "",
        show: false
      };
    }

    // Plan hasn't started yet - show first day's activities
    if (currentDate < firstPlanDate) {
      const firstDay = plan.days[0];
      if (firstDay.activities && firstDay.activities.length > 0) {
        const firstActivity = firstDay.activities[0];
        return {
          text: `Plan starts ${firstPlanDate}: ${firstActivity.description} at ${firstActivity.startTime}`,
          show: true
        };
      }
      return {
        text: "Your plan will begin soon",
        show: true
      };
    }

    // Plan is ongoing - find today's plan
    const todayPlan = plan.days.find((day: any) => day.date === currentDate);
    if (!todayPlan) {
      return {
        text: "Check your plan for today",
        show: true
      };
    }

    // Find current or next activity
    for (const activity of todayPlan.activities) {
      if (currentTime < activity.endTime) {
        if (currentTime >= activity.startTime) {
          return {
            text: `Now: ${activity.description}`,
            show: true
          };
        } else {
          return {
            text: `Next: ${activity.description} at ${activity.startTime}`,
            show: true
          };
        }
      }
    }
    return {
      text: "Check your plan for tomorrow",
      show: true
    };
  };
  const getRouteString = (trip: Trip): string => {
    if (trip.legs.length === 1) {
      return `${trip.legs[0].originCity} → ${trip.legs[0].destCity}`;
    }
    const cities = [trip.legs[0].originCity, ...trip.legs.map(leg => leg.destCity)];
    return cities.join(' → ');
  };
  if (showCustomForm) {
    return <CustomTripForm onBack={() => setShowCustomForm(false)} onTripCreate={handleCustomTripCreate} />;
  }
  const getSensitivityColor = (sensitivity: string) => {
    switch (sensitivity) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  return <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-primary">A calmer way through jet lag</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Thoughtful timing for sleep, light, and rest, to ease jet lag as you travel</p>
        <div className="flex justify-center">
          <Button variant="default" size="lg" onClick={() => setShowCustomForm(true)} className="shadow-glow">CreateM4yPlan<Plane className="h-5 w-5 mr-2" />
            Create Your Trip Plan
          </Button>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-5xl mx-auto py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Personalized Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Input your usual sleep schedule and caffeine habits so the plan is tailored specifically to you.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Detailed Trip Modeling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analyzes multi-leg journeys, incorporating time zones of your cities with local departure and arrival times.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Jet Lag Sensitivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Adjust the plan based on your personal sensitivity to jet lag for optimal results.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                <Badge className="h-6 w-6 flex items-center justify-center bg-melatonin text-white">M</Badge>
              </div>
              <CardTitle className="text-lg">Melatonin Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Opt-in for guidance on using melatonin supplement as part of your adjustment strategy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                <Plane className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Cabin Context</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Considers your cabin type to factor in onboard sleep quality and amenities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Complex Journeys</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Easily model complex trips like long-haul flights, managing significant time shifts.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg font-semibold text-primary">
            Start your next journey feeling refreshed—not fatigued.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
        {/* Saved Trips Section */}
        {savedTrips.length > 0 && <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Your Saved Trips</h2>
            </div>
            {savedTrips.map(({
          trip,
          plan,
          savedAt
        }) => {
          const recommendation = getNextAction(plan);
          return <Card key={trip.id} className={`cursor-pointer transition-all duration-200 hover:shadow-card ${selectedTrip === trip.id ? 'ring-2 ring-primary shadow-glow' : ''}`} onClick={() => handleTripClick(trip, plan)}>
                  <CardHeader>
                    <div className="space-y-4">
                      {/* Trip Name */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-2xl">{trip.name}</CardTitle>
                          <Badge variant="outline" className="text-primary border-primary">
                            <Bookmark className="h-3 w-3 mr-1" />
                            Saved
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col gap-2">
                            <Badge className={getSensitivityColor(trip.sensitivity)}>
                              {trip.sensitivity} sensitivity
                            </Badge>
                            {trip.melatoninOptIn && <Badge variant="outline" className="text-melatonin border-melatonin">
                                Melatonin
                              </Badge>}
                          </div>
                          <Button variant="ghost" size="sm" onClick={e => handleDeleteSavedTrip(trip.id, e)} className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Route */}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{getRouteString(trip)}</span>
                      </div>

                      {/* Next Action */}
                      {recommendation.show && <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
                                Current Recommendation
                              </div>
                              <div className="text-sm font-medium text-foreground">
                                {recommendation.text}
                              </div>
                            </div>
                          </div>
                        </div>}
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
                      <Button variant={selectedTrip === trip.id ? "default" : "outline"} size="sm">
                        {selectedTrip === trip.id ? "Selected" : "View Plan"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>;
        })}
          </div>}

      </div>
    </div>;
};