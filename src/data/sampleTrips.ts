import { Trip } from '@/types/trip';

export const sampleTrips: Trip[] = [
  {
    id: 'example-a-eastward',
    name: 'New York to Tokyo (Eastward Long-haul)',
    legs: [
      {
        id: 'jfk-hnd',
        originTZ: 'America/New_York',
        destTZ: 'Asia/Tokyo',
        originCode: 'JFK',
        destCode: 'HND',
        originCity: 'New York',
        destCity: 'Tokyo',
        departLocal: '2024-10-10T15:00',
        arriveLocal: '2024-10-11T19:00'
      }
    ],
    usualSleepStart: '23:00',
    usualSleepEnd: '07:00',
    melatoninOptIn: true,
    sensitivity: 'medium',
    caffeineHabits: 'moderate',
    cabinType: 'business'
  }
];