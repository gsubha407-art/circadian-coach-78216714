# Smart Jet Lag Planner

## Overview
A React-based web application that helps travelers beat jet lag by creating personalized optimization plans based on their travel details and personal habits.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: TanStack React Query
- **Charts**: Recharts

## Project Structure
```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── CustomTripForm.tsx
│   ├── OptimizationPlan.tsx
│   └── TripSelector.tsx
├── data/
│   ├── airports.ts   # Airport data
│   └── sampleTrips.ts
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── circadianOptimizer.ts  # Jet lag optimization logic
│   ├── savedTrips.ts
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── types/
│   └── trip.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Running the Application
The application runs on port 5000:
```bash
npm run dev
```

## Key Features
- Personalized sleep schedule optimization
- Multi-leg journey analysis with timezone handling
- Jet lag sensitivity adjustments
- Custom trip planning with date-fns-tz for timezone conversions
