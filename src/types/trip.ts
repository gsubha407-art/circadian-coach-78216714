export interface Leg {
  id: string;
  originTZ: string;
  destTZ: string;
  originCode: string;
  destCode: string;
  originCity: string;
  destCity: string;
  departLocal: string;
  arriveLocal: string;
}

export interface Trip {
  id: string;
  name: string;
  legs: Leg[];
  usualSleepStart: string; // HH:mm format
  usualSleepEnd: string; // HH:mm format
  melatoninOptIn: boolean;
  sensitivity: 'low' | 'medium' | 'high';
  caffeineHabits: 'none' | 'light' | 'moderate' | 'heavy';
  cabinType: 'economy' | 'premium' | 'business' | 'first';
}

export interface ActivityBlock {
  type: 'sleep' | 'melatonin' | 'light-seek' | 'light-avoid' | 'caffeine-cutoff' | 'nap';
  startTime: string;
  endTime: string;
  description: string;
  timeZone: string;
  localTime?: string;
}

export interface PlanDay {
  date: string;
  dateLocal: string;
  timeZone: string;
  activities: ActivityBlock[];
  summary: string;
}

export interface OptimizationPlan {
  tripId: string;
  totalTimeZoneDifference: number;
  shiftStrategy: 'advance' | 'delay' | 'minimal';
  keyActions: string[];
  days: PlanDay[];
  generatedAt: string;
}