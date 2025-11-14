import { Trip, OptimizationPlan } from '@/types/trip';

export interface SavedTrip {
  trip: Trip;
  plan: OptimizationPlan;
  savedAt: string;
}

const STORAGE_KEY = 'saved_trips';

export const getSavedTrips = (): SavedTrip[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved trips:', error);
    return [];
  }
};

export const saveTrip = (trip: Trip, plan: OptimizationPlan): void => {
  try {
    const savedTrips = getSavedTrips();
    
    // Check if trip already exists and update it
    const existingIndex = savedTrips.findIndex(st => st.trip.id === trip.id);
    
    const savedTrip: SavedTrip = {
      trip,
      plan,
      savedAt: new Date().toISOString(),
    };
    
    if (existingIndex >= 0) {
      savedTrips[existingIndex] = savedTrip;
    } else {
      savedTrips.push(savedTrip);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTrips));
  } catch (error) {
    console.error('Error saving trip:', error);
    throw error;
  }
};

export const deleteSavedTrip = (tripId: string): void => {
  try {
    const savedTrips = getSavedTrips();
    const filtered = savedTrips.filter(st => st.trip.id !== tripId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting saved trip:', error);
    throw error;
  }
};

export const isTripSaved = (tripId: string): boolean => {
  const savedTrips = getSavedTrips();
  return savedTrips.some(st => st.trip.id === tripId);
};
