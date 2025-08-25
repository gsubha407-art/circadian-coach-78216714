import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptimizationPlan as OptimizationPlanType, ActivityBlock } from '@/types/trip';
import { ArrowLeft, Download, Share2, Clock, Moon, Sun, Coffee, Power, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptimizationPlanProps {
  plan: OptimizationPlanType;
  onBack: () => void;
}

export const OptimizationPlan = ({ plan, onBack }: OptimizationPlanProps) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sleep': return <Moon className="h-4 w-4" />;
      case 'melatonin': return <div className="h-4 w-4 rounded-full bg-melatonin" />;
      case 'light-seek': return <Sun className="h-4 w-4" />;
      case 'light-avoid': return <Lightbulb className="h-4 w-4" />;
      case 'caffeine-cutoff': return <Coffee className="h-4 w-4" />;
      case 'nap': return <Power className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sleep': return 'bg-sleep text-sleep-foreground';
      case 'melatonin': return 'bg-melatonin text-melatonin-foreground';
      case 'light-seek': return 'bg-light-seek text-light-seek-foreground';
      case 'light-avoid': return 'bg-light-avoid text-light-avoid-foreground';
      case 'caffeine-cutoff': return 'bg-caffeine text-caffeine-foreground';
      case 'nap': return 'bg-nap text-nap-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'advance': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'delay': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'minimal': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Trips
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Plan
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Your Circadian Optimization Plan</CardTitle>
              <CardDescription className="text-lg mt-2">
                Personalized jet lag minimization strategy
              </CardDescription>
            </div>
            <Badge className={getStrategyColor(plan.shiftStrategy)} variant="secondary">
              {plan.shiftStrategy} strategy
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{Math.abs(plan.totalTimeZoneDifference)}h</div>
              <div className="text-sm text-muted-foreground">Time difference</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{plan.days.length}</div>
              <div className="text-sm text-muted-foreground">Total plan days</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{plan.keyActions.length}</div>
              <div className="text-sm text-muted-foreground">Key actions</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Key Actions:</h4>
            <div className="space-y-2">
              {plan.keyActions.map((action, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {action}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {plan.days.map((day, index) => (
          <Button
            key={index}
            variant={selectedDay === index ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDay(index)}
            className="whitespace-nowrap"
          >
            {new Date(day.date).toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric' 
            })}
          </Button>
        ))}
      </div>

      {/* Selected day details */}
      {plan.days[selectedDay] && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {new Date(plan.days[selectedDay].date).toLocaleDateString(undefined, { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </CardTitle>
            <CardDescription>{plan.days[selectedDay].summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {plan.days[selectedDay].activities.length > 0 ? (
                plan.days[selectedDay].activities.map((activity, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg transition-all hover:shadow-timeline",
                      getActivityColor(activity.type)
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {getActivityIcon(activity.type)}
                      <div className="font-medium capitalize">{activity.type.replace('-', ' ')}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3" />
                      {formatTime(activity.startTime)}
                      {activity.endTime && activity.endTime !== activity.startTime && (
                        <span>- {formatTime(activity.endTime)}</span>
                      )}
                    </div>
                    <div className="flex-1 text-sm opacity-90">
                      {activity.description}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No specific activities for this day
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Timeline Overview</CardTitle>
          <CardDescription>Color-coded blocks show your optimization schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plan.days.slice(0, 7).map((day, dayIndex) => (
              <div key={dayIndex} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {new Date(day.date).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {day.activities.length} activities
                  </div>
                </div>
                <div className="flex gap-1 h-8">
                  {Array.from({ length: 24 }, (_, hour) => {
                    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                    const activity = day.activities.find(act => 
                      act.startTime <= timeStr && 
                      (act.endTime > timeStr || act.endTime === '00:00')
                    );
                    
                    return (
                      <div
                        key={hour}
                        className={cn(
                          "flex-1 h-full border border-border/20",
                          activity ? getActivityColor(activity.type) : 'bg-secondary/20'
                        )}
                        title={activity ? `${activity.type}: ${activity.description}` : `${hour}:00`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};