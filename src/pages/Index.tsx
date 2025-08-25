import { useState } from 'react';
import { Trip, OptimizationPlan as OptimizationPlanType } from '@/types/trip';
import { TripSelector } from '@/components/TripSelector';
import { OptimizationPlan } from '@/components/OptimizationPlan';
import { CircadianOptimizer } from '@/lib/circadianOptimizer';

const Index = () => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [optimizationPlan, setOptimizationPlan] = useState<OptimizationPlanType | null>(null);

  const handleTripSelect = (trip: Trip) => {
    setSelectedTrip(trip);
    const optimizer = new CircadianOptimizer(trip);
    const plan = optimizer.generateOptimizationPlan();
    setOptimizationPlan(plan);
  };

  const handleBack = () => {
    setSelectedTrip(null);
    setOptimizationPlan(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {optimizationPlan ? (
          <OptimizationPlan plan={optimizationPlan} onBack={handleBack} />
        ) : (
          <TripSelector onTripSelect={handleTripSelect} />
        )}
      </div>
    </div>
  );
};

export default Index;
