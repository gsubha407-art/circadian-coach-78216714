import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptimizationPlan as OptimizationPlanType, ActivityBlock, Trip } from '@/types/trip';
import { ArrowLeft, Download, Clock, Moon, Sun, Coffee, Power, Lightbulb, Save, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cn } from '@/lib/utils';
import { saveTrip, isTripSaved } from '@/lib/savedTrips';
import { useToast } from '@/hooks/use-toast';
interface OptimizationPlanProps {
  plan: OptimizationPlanType;
  trip: Trip;
  onBack: () => void;
}
export const OptimizationPlan = ({
  plan,
  trip,
  onBack
}: OptimizationPlanProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [saved, setSaved] = useState(isTripSaved(trip.id));
  const {
    toast
  } = useToast();
  const handleSaveTrip = () => {
    try {
      saveTrip(trip, plan);
      setSaved(true);
      toast({
        title: "Trip saved!",
        description: "You can now access this trip from the main page."
      });
    } catch (error) {
      toast({
        title: "Error saving trip",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sleep':
        return <Moon className="h-4 w-4" />;
      case 'melatonin':
        return <div className="h-4 w-4 rounded-full bg-melatonin" />;
      case 'light-seek':
        return <Sun className="h-4 w-4" />;
      case 'light-avoid':
        return <Lightbulb className="h-4 w-4" />;
      case 'caffeine-cutoff':
        return <Coffee className="h-4 w-4" />;
      case 'nap':
        return <Power className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sleep':
        return 'bg-sleep text-sleep-foreground';
      case 'melatonin':
        return 'bg-melatonin text-melatonin-foreground';
      case 'light-seek':
        return 'bg-light-seek text-light-seek-foreground';
      case 'light-avoid':
        return 'bg-light-avoid text-light-avoid-foreground';
      case 'caffeine-cutoff':
        return 'bg-caffeine text-caffeine-foreground';
      case 'nap':
        return 'bg-nap text-nap-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
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
      case 'advance':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'delay':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'minimal':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  const handleExportPDF = async () => {
    try {
      const element = document.getElementById('pdf-export-content');
      if (!element) return;

      // A4 dimensions in pixels at 96 DPI (standard screen)
      const a4WidthPx = 794; // 210mm at 96 DPI

      // Create a wrapper with padding for PDF export
      const wrapper = document.createElement('div');
      wrapper.style.padding = '60px 40px';
      wrapper.style.backgroundColor = '#ffffff';
      wrapper.style.position = 'absolute';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      wrapper.style.width = `${a4WidthPx - 80}px`; // Account for 40px padding on each side
      wrapper.style.color = '#000000';

      // Clone the content
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.backgroundColor = '#ffffff';
      clone.style.color = '#000000';
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Clean up
      document.body.removeChild(wrapper);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${trip.name || 'trip'}-optimization-plan.pdf`);
      toast({
        title: "PDF exported!",
        description: "Your optimization plan has been downloaded."
      });
    } catch (error) {
      toast({
        title: "Error exporting PDF",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };
  return <div>
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background border-b border-border px-4">
        <div className="flex h-full items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant={saved ? "default" : "outline"} size="sm" onClick={handleSaveTrip} disabled={saved}>
              {saved ? <>
                  <Check className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Saved</span>
                  <span className="sm:hidden">Saved</span>
                </> : <>
                  <Save className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Save Trip</span>
                  <span className="sm:hidden">Save</span>
                </>}
            </Button>
            <Button size="sm" onClick={handleExportPDF}>
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content starts: 56px header + 40px gap */}
      <main className="pt-10 pb-10 max-w-[1080px] mx-auto px-0">
        {/* PDF Export Content - starts here */}
        <div id="pdf-export-content" className="space-y-10 bg-background">
          {/* Page Title */}
          <div className="space-y-1">
            <h1 className="headline-small text-3xl font-bold">Here's Your Plan to Adjust Faster</h1>
            <p className="title-small text-muted-foreground text-lg font-normal">
              A simple, personalised plan to help your body adjust smoothly
            </p>
          </div>

      {/* Summary */}
      <Card className="bg-gradient-card border-0">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center gap-md">
            <CardTitle className="title-large font-bold text-lg">Plan Overview</CardTitle>
            <Badge className={getStrategyColor(plan.shiftStrategy)} variant="secondary">
              {plan.shiftStrategy.charAt(0).toUpperCase() + plan.shiftStrategy.slice(1)} strategy
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
              <div className="title-large text-primary">{Math.abs(plan.totalTimeZoneDifference)}h</div>
              <div className="body-medium text-muted-foreground">Time difference</div>
            </div>
            <div className="text-center p-4 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
              <div className="title-large text-primary">{plan.days.length}</div>
              <div className="body-medium text-muted-foreground">Total plan days</div>
            </div>
            <div className="text-center p-4 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
              <div className="title-large text-primary">{plan.keyActions.length}</div>
              <div className="body-medium text-muted-foreground">Key actions</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="title-small text-base font-bold">Key Actions:</h4>
            <div className="space-y-2">
              {plan.keyActions.map((action, index) => <div key={index} className="flex items-center gap-2 body-medium">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {action}
                </div>)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Day selector section */}
      <div className="space-y-2">
        <h2 className="title-large text-lg font-bold">Daily Schedule</h2>
        <p className="body-medium text-muted-foreground text-base font-normal">
          Your plan focuses on key adjustment days: pre-travel preparation and post-arrival adaptation. Days without activities are skipped to keep your schedule focused.
        </p>
      </div>

      {/* Date tabs and Selected day details */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto">
          {plan.days.map((day, index) => <Button key={index} variant={selectedDay === index ? "default" : "outline"} size="sm" onClick={() => setSelectedDay(index)} className="whitespace-nowrap">
              {new Date(day.date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}
            </Button>)}
        </div>

        {/* Selected day details */}
        {plan.days[selectedDay] && <Card>
          <CardHeader>
            <CardTitle className="title-large flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {new Date(plan.days[selectedDay].date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
            </CardTitle>
            <p className="body-medium text-muted-foreground">{plan.days[selectedDay].summary}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {plan.days[selectedDay].activities.length > 0 ? plan.days[selectedDay].activities.map((activity, index) => <div key={index} className={cn("flex items-center gap-4 p-4 rounded-lg transition-all hover:shadow-timeline", getActivityColor(activity.type))}>
                    <div className="flex items-center gap-2 min-w-0">
                      {getActivityIcon(activity.type)}
                      <div className="title-small capitalize">{activity.type.replace('-', ' ')}</div>
                    </div>
                    <div className="flex items-center gap-2 body-medium">
                      <Clock className="h-3 w-3" />
                      {formatTime(activity.startTime)}
                      {activity.endTime && activity.endTime !== activity.startTime && <span>- {formatTime(activity.endTime)}</span>}
                    </div>
                    <div className="flex-1 body-medium opacity-90">
                      {activity.description}
                    </div>
                  </div>) : <div className="text-center py-8 body-medium text-muted-foreground">
                  No specific activities for this day
                </div>}
            </div>
          </CardContent>
        </Card>}
      </div>
    </div>
  </main>
  </div>;
};