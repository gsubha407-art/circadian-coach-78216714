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
  },
  {
    id: 'example-b-westward',
    name: 'Paris to San Francisco to Honolulu (Westward Multi-city)',
    legs: [
      {
        id: 'cdg-sfo',
        originTZ: 'Europe/Paris',
        destTZ: 'America/Los_Angeles',
        originCode: 'CDG',
        destCode: 'SFO',
        originCity: 'Paris',
        destCity: 'San Francisco',
        departLocal: '2024-11-03T11:30',
        arriveLocal: '2024-11-03T14:30'
      },
      {
        id: 'sfo-hnl',
        originTZ: 'America/Los_Angeles',
        destTZ: 'Pacific/Honolulu',
        originCode: 'SFO',
        destCode: 'HNL',
        originCity: 'San Francisco',
        destCity: 'Honolulu',
        departLocal: '2024-11-03T19:30',
        arriveLocal: '2024-11-03T23:30'
      }
    ],
    usualSleepStart: '23:00',
    usualSleepEnd: '07:00',
    melatoninOptIn: false,
    sensitivity: 'high',
    caffeineHabits: 'light',
    cabinType: 'economy'
  },
  {
    id: 'example-c-short',
    name: 'Mumbai to Dubai (Short Hop)',
    legs: [
      {
        id: 'bom-dxb',
        originTZ: 'Asia/Kolkata',
        destTZ: 'Asia/Dubai',
        originCode: 'BOM',
        destCode: 'DXB',
        originCity: 'Mumbai',
        destCity: 'Dubai',
        departLocal: '2024-12-05T08:30',
        arriveLocal: '2024-12-05T10:00'
      }
    ],
    usualSleepStart: '23:00',
    usualSleepEnd: '07:00',
    melatoninOptIn: false,
    sensitivity: 'low',
    caffeineHabits: 'moderate',
    cabinType: 'economy'
  }
];