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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1080px] mx-auto px-5 sm:px-6 md:px-10 py-8">
        {optimizationPlan && selectedTrip ? (
          <OptimizationPlan plan={optimizationPlan} trip={selectedTrip} onBack={handleBack} />
        ) : (
          <TripSelector onTripSelect={handleTripSelect} />
        )}
      </div>
    </div>
  );
};

export default Index;
