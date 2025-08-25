import { format, addDays, parseISO, differenceInHours } from 'date-fns';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { Trip, PlanDay, ActivityBlock, OptimizationPlan } from '@/types/trip';

export class CircadianOptimizer {
  private trip: Trip;
  private timeZoneDifference: number;
  private shiftStrategy: 'advance' | 'delay' | 'minimal';

  constructor(trip: Trip) {
    this.trip = trip;
    this.timeZoneDifference = this.calculateTimeZoneDifference();
    this.shiftStrategy = this.determineShiftStrategy();
  }

  generateOptimizationPlan(): OptimizationPlan {
    const days = this.generateDayByDayPlan();
    const keyActions = this.generateKeyActions();

    return {
      tripId: this.trip.id,
      totalTimeZoneDifference: this.timeZoneDifference,
      shiftStrategy: this.shiftStrategy,
      keyActions,
      days,
      generatedAt: new Date().toISOString()
    };
  }

  private calculateTimeZoneDifference(): number {
    // Use the final destination for primary calculation
    const finalLeg = this.trip.legs[this.trip.legs.length - 1];
    const originTZ = this.trip.legs[0].originTZ;
    const destTZ = finalLeg.destTZ;

    // Calculate the time difference at the time of travel
    const departureTime = parseISO(this.trip.legs[0].departLocal);
    const originTime = fromZonedTime(departureTime, originTZ);
    const destTime = toZonedTime(originTime, destTZ);
    
    return differenceInHours(destTime, departureTime);
  }

  private determineShiftStrategy(): 'advance' | 'delay' | 'minimal' {
    const absTimeDiff = Math.abs(this.timeZoneDifference);
    
    // Short trips (< 3 hours difference) get minimal adjustment
    if (absTimeDiff < 3) {
      return 'minimal';
    }

    // Eastward travel (positive difference) = advance schedule
    // Westward travel (negative difference) = delay schedule
    return this.timeZoneDifference > 0 ? 'advance' : 'delay';
  }

  private getSensitivityMultiplier(): number {
    switch (this.trip.sensitivity) {
      case 'low': return 1.5; // Slower adjustment
      case 'medium': return 1.0; // Standard adjustment
      case 'high': return 0.7; // Faster adjustment
      default: return 1.0;
    }
  }

  private getDailyShiftMinutes(): number {
    const baseShift = this.shiftStrategy === 'minimal' ? 30 : 60; // Base shift in minutes
    const sensitivityMultiplier = this.getSensitivityMultiplier();
    return Math.round(baseShift * sensitivityMultiplier);
  }

  private generateDayByDayPlan(): PlanDay[] {
    const days: PlanDay[] = [];
    const dailyShiftMinutes = this.getDailyShiftMinutes();
    const totalShiftDays = this.shiftStrategy === 'minimal' ? 1 : 
      Math.min(Math.ceil(Math.abs(this.timeZoneDifference * 60) / dailyShiftMinutes), 7);

    // Pre-travel days
    for (let i = totalShiftDays; i >= 1; i--) {
      const dayDate = format(addDays(parseISO(this.trip.legs[0].departLocal), -i), 'yyyy-MM-dd');
      const activities = this.generatePreTravelActivities(i, dailyShiftMinutes);
      
      days.push({
        date: dayDate,
        dateLocal: dayDate,
        timeZone: this.trip.legs[0].originTZ,
        activities,
        summary: `Pre-travel day ${totalShiftDays - i + 1}: ${this.shiftStrategy} schedule by ${dailyShiftMinutes} minutes`
      });
    }

    // Travel day(s)
    for (const leg of this.trip.legs) {
      const travelDate = format(parseISO(leg.departLocal), 'yyyy-MM-dd');
      const activities = this.generateTravelDayActivities(leg);
      
      days.push({
        date: travelDate,
        dateLocal: travelDate,
        timeZone: leg.destTZ,
        activities,
        summary: `Travel day: ${leg.originCity} to ${leg.destCity}`
      });
    }

    // Post-arrival days
    const finalDestination = this.trip.legs[this.trip.legs.length - 1];
    for (let i = 1; i <= 3; i++) {
      const dayDate = format(addDays(parseISO(finalDestination.arriveLocal), i), 'yyyy-MM-dd');
      const activities = this.generatePostArrivalActivities(i);
      
      days.push({
        date: dayDate,
        dateLocal: dayDate,
        timeZone: finalDestination.destTZ,
        activities,
        summary: `Post-arrival day ${i}: Maintain destination schedule`
      });
    }

    return days;
  }

  private generatePreTravelActivities(dayNumber: number, shiftMinutes: number): ActivityBlock[] {
    const activities: ActivityBlock[] = [];
    const isAdvancing = this.shiftStrategy === 'advance';
    
    // Calculate shifted sleep times
    const totalShift = dayNumber * shiftMinutes;
    const sleepStart = this.adjustTime(this.trip.usualSleepStart, isAdvancing ? -totalShift : totalShift);
    const sleepEnd = this.adjustTime(this.trip.usualSleepEnd, isAdvancing ? -totalShift : totalShift);

    // Sleep block
    activities.push({
      type: 'sleep',
      startTime: sleepStart,
      endTime: sleepEnd,
      description: `Adjusted sleep schedule (${isAdvancing ? 'earlier' : 'later'} by ${totalShift} minutes)`,
      timeZone: this.trip.legs[0].originTZ
    });

    // Melatonin (if opted in)
    if (this.trip.melatoninOptIn && isAdvancing) {
      const melatoninTime = this.adjustTime(sleepStart, -180); // 3 hours before bed
      activities.push({
        type: 'melatonin',
        startTime: melatoninTime,
        endTime: this.adjustTime(melatoninTime, 30),
        description: 'Take melatonin (0.5-1mg) to advance sleep schedule',
        timeZone: this.trip.legs[0].originTZ
      });
    }

    // Light exposure
    if (isAdvancing) {
      activities.push({
        type: 'light-seek',
        startTime: sleepEnd,
        endTime: this.adjustTime(sleepEnd, 120),
        description: 'Seek bright morning light to advance circadian rhythm',
        timeZone: this.trip.legs[0].originTZ
      });
    } else {
      activities.push({
        type: 'light-seek',
        startTime: this.adjustTime(sleepStart, -180),
        endTime: this.adjustTime(sleepStart, -60),
        description: 'Seek late afternoon/evening light to delay circadian rhythm',
        timeZone: this.trip.legs[0].originTZ
      });
    }

    // Caffeine cutoff
    const caffeineHours = this.getCaffeineCutoffHours();
    activities.push({
      type: 'caffeine-cutoff',
      startTime: this.adjustTime(sleepStart, -caffeineHours * 60),
      endTime: sleepStart,
      description: `No caffeine after this time (${caffeineHours}h before bedtime)`,
      timeZone: this.trip.legs[0].originTZ
    });

    return activities.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  private generateTravelDayActivities(leg: any): ActivityBlock[] {
    const activities: ActivityBlock[] = [];

    // Avoid light during biological night at destination
    activities.push({
      type: 'light-avoid',
      startTime: '00:00',
      endTime: '06:00',
      description: 'Avoid bright light during destination biological night (wear eye mask/blue-light blockers)',
      timeZone: leg.destTZ
    });

    // Strategic nap window (if needed)
    if (this.trip.cabinType === 'economy') {
      activities.push({
        type: 'nap',
        startTime: '12:00',
        endTime: '15:00',
        description: 'Optional 20-30 minute nap if sleep deprived (not after 3 PM local)',
        timeZone: leg.destTZ
      });
    }

    // Caffeine guidance
    const caffeineHours = this.getCaffeineCutoffHours();
    activities.push({
      type: 'caffeine-cutoff',
      startTime: this.adjustTime('23:00', -caffeineHours * 60),
      endTime: '23:59',
      description: 'Moderate caffeine OK before this time to stay alert',
      timeZone: leg.destTZ
    });

    return activities.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  private generatePostArrivalActivities(dayNumber: number): ActivityBlock[] {
    const activities: ActivityBlock[] = [];
    const finalDestination = this.trip.legs[this.trip.legs.length - 1];

    // Target local sleep schedule
    activities.push({
      type: 'sleep',
      startTime: this.trip.usualSleepStart,
      endTime: this.trip.usualSleepEnd,
      description: 'Maintain destination sleep schedule',
      timeZone: finalDestination.destTZ
    });

    // Light exposure based on strategy
    if (this.shiftStrategy === 'advance') {
      activities.push({
        type: 'light-seek',
        startTime: '07:30',
        endTime: '09:30',
        description: 'Seek morning sunlight to reinforce advanced schedule',
        timeZone: finalDestination.destTZ
      });
    } else if (this.shiftStrategy === 'delay') {
      activities.push({
        type: 'light-seek',
        startTime: '16:00',
        endTime: '18:00',
        description: 'Seek late afternoon sunlight to reinforce delayed schedule',
        timeZone: finalDestination.destTZ
      });
    }

    // Melatonin (if opted in and helpful)
    if (this.trip.melatoninOptIn && dayNumber <= 2) {
      const melatoninTime = this.adjustTime(this.trip.usualSleepStart, -180);
      activities.push({
        type: 'melatonin',
        startTime: melatoninTime,
        endTime: this.adjustTime(melatoninTime, 30),
        description: `Melatonin to consolidate new schedule (day ${dayNumber}/3)`,
        timeZone: finalDestination.destTZ
      });
    }

    // Caffeine cutoff
    const caffeineHours = this.getCaffeineCutoffHours();
    activities.push({
      type: 'caffeine-cutoff',
      startTime: this.adjustTime(this.trip.usualSleepStart, -caffeineHours * 60),
      endTime: this.trip.usualSleepStart,
      description: `No caffeine after this time`,
      timeZone: finalDestination.destTZ
    });

    return activities.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  private generateKeyActions(): string[] {
    const actions: string[] = [];
    const absTimeDiff = Math.abs(this.timeZoneDifference);

    if (this.shiftStrategy === 'minimal') {
      actions.push('Minimal adjustment needed (< 3 hour difference)');
      actions.push('Stay hydrated and avoid heavy meals during travel');
      actions.push('Brief morning light exposure at destination');
    } else {
      actions.push(`${this.shiftStrategy === 'advance' ? 'Advance' : 'Delay'} sleep by ${this.getDailyShiftMinutes()} min/day`);
      
      if (this.trip.melatoninOptIn) {
        actions.push('Take melatonin 2-3 hours before target bedtime');
      }
      
      if (this.shiftStrategy === 'advance') {
        actions.push('Seek bright morning light, avoid evening light');
      } else {
        actions.push('Seek late afternoon light, avoid morning light');
      }
    }

    return actions;
  }

  private getCaffeineCutoffHours(): number {
    switch (this.trip.caffeineHabits) {
      case 'none': return 4;
      case 'light': return 6;
      case 'moderate': return 7;
      case 'heavy': return 8;
      default: return 6;
    }
  }

  private adjustTime(timeStr: string, minutesToAdd: number): string {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    
    // Handle day overflow/underflow
    const adjustedMinutes = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
    const newHours = Math.floor(adjustedMinutes / 60);
    const newMinutes = adjustedMinutes % 60;
    
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  }
}