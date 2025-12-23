import { useState } from 'react';
import { Trip, OptimizationPlan as OptimizationPlanType } from '@/types/trip';
import { TripSelector } from '@/components/TripSelector';
import { OptimizationPlan } from '@/components/OptimizationPlan';
import { CircadianOptimizer } from '@/lib/circadianOptimizer';
const Index = () => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [optimizationPlan, setOptimizationPlan] = useState<OptimizationPlanType | null>(null);
  const handleTripSelect = (trip: Trip, existingPlan?: OptimizationPlanType) => {
    setSelectedTrip(trip);
    if (existingPlan) {
      setOptimizationPlan(existingPlan);
    } else {
      const optimizer = new CircadianOptimizer(trip);
      const plan = optimizer.generateOptimizationPlan();
      setOptimizationPlan(plan);
    }
  };
  const handleBack = () => {
    setSelectedTrip(null);
    setOptimizationPlan(null);
  };
  return <div className="min-h-screen bg-background">
      {optimizationPlan && selectedTrip ? <OptimizationPlan plan={optimizationPlan} trip={selectedTrip} onBack={handleBack} /> : <TripSelector onTripSelect={handleTripSelect} />}
    </div>;
};
export default Index;