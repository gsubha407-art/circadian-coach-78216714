export interface Airport {
  city: string;
  timezone: string;
  iataCode: string;
  country: string;
}

// Curated list of major international airports from OurAirports dataset
// Organized by region for better maintainability
export const airports: Airport[] = [
  // North America - United States
  { city: 'New York (JFK)', timezone: 'America/New_York', iataCode: 'JFK', country: 'US' },
  { city: 'New York (LGA)', timezone: 'America/New_York', iataCode: 'LGA', country: 'US' },
  { city: 'New York (EWR)', timezone: 'America/New_York', iataCode: 'EWR', country: 'US' },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', iataCode: 'LAX', country: 'US' },
  { city: 'San Francisco', timezone: 'America/Los_Angeles', iataCode: 'SFO', country: 'US' },
  { city: 'Chicago (ORD)', timezone: 'America/Chicago', iataCode: 'ORD', country: 'US' },
  { city: 'Chicago (MDW)', timezone: 'America/Chicago', iataCode: 'MDW', country: 'US' },
  { city: 'Miami', timezone: 'America/New_York', iataCode: 'MIA', country: 'US' },
  { city: 'Dallas', timezone: 'America/Chicago', iataCode: 'DFW', country: 'US' },
  { city: 'Denver', timezone: 'America/Denver', iataCode: 'DEN', country: 'US' },
  { city: 'Seattle', timezone: 'America/Los_Angeles', iataCode: 'SEA', country: 'US' },
  { city: 'Boston', timezone: 'America/New_York', iataCode: 'BOS', country: 'US' },
  { city: 'Washington DC (IAD)', timezone: 'America/New_York', iataCode: 'IAD', country: 'US' },
  { city: 'Washington DC (DCA)', timezone: 'America/New_York', iataCode: 'DCA', country: 'US' },
  { city: 'Atlanta', timezone: 'America/New_York', iataCode: 'ATL', country: 'US' },
  { city: 'Houston', timezone: 'America/Chicago', iataCode: 'IAH', country: 'US' },
  { city: 'Phoenix', timezone: 'America/Phoenix', iataCode: 'PHX', country: 'US' },
  { city: 'Philadelphia', timezone: 'America/New_York', iataCode: 'PHL', country: 'US' },
  { city: 'Las Vegas', timezone: 'America/Los_Angeles', iataCode: 'LAS', country: 'US' },
  { city: 'Orlando', timezone: 'America/New_York', iataCode: 'MCO', country: 'US' },
  { city: 'San Diego', timezone: 'America/Los_Angeles', iataCode: 'SAN', country: 'US' },
  { city: 'Minneapolis', timezone: 'America/Chicago', iataCode: 'MSP', country: 'US' },
  { city: 'Detroit', timezone: 'America/Detroit', iataCode: 'DTW', country: 'US' },
  { city: 'Portland', timezone: 'America/Los_Angeles', iataCode: 'PDX', country: 'US' },
  { city: 'Austin', timezone: 'America/Chicago', iataCode: 'AUS', country: 'US' },
  { city: 'Nashville', timezone: 'America/Chicago', iataCode: 'BNA', country: 'US' },
  { city: 'Salt Lake City', timezone: 'America/Denver', iataCode: 'SLC', country: 'US' },
  { city: 'Honolulu', timezone: 'Pacific/Honolulu', iataCode: 'HNL', country: 'US' },
  { city: 'Anchorage', timezone: 'America/Anchorage', iataCode: 'ANC', country: 'US' },

  // North America - Canada
  { city: 'Toronto', timezone: 'America/Toronto', iataCode: 'YYZ', country: 'CA' },
  { city: 'Vancouver', timezone: 'America/Vancouver', iataCode: 'YVR', country: 'CA' },
  { city: 'Montreal', timezone: 'America/Toronto', iataCode: 'YUL', country: 'CA' },
  { city: 'Calgary', timezone: 'America/Edmonton', iataCode: 'YYC', country: 'CA' },
  { city: 'Ottawa', timezone: 'America/Toronto', iataCode: 'YOW', country: 'CA' },

  // North America - Mexico
  { city: 'Mexico City', timezone: 'America/Mexico_City', iataCode: 'MEX', country: 'MX' },
  { city: 'Cancún', timezone: 'America/Cancun', iataCode: 'CUN', country: 'MX' },
  { city: 'Guadalajara', timezone: 'America/Mexico_City', iataCode: 'GDL', country: 'MX' },
  { city: 'Monterrey', timezone: 'America/Monterrey', iataCode: 'MTY', country: 'MX' },

  // South America
  { city: 'São Paulo', timezone: 'America/Sao_Paulo', iataCode: 'GRU', country: 'BR' },
  { city: 'Rio de Janeiro', timezone: 'America/Sao_Paulo', iataCode: 'GIG', country: 'BR' },
  { city: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', iataCode: 'EZE', country: 'AR' },
  { city: 'Bogotá', timezone: 'America/Bogota', iataCode: 'BOG', country: 'CO' },
  { city: 'Lima', timezone: 'America/Lima', iataCode: 'LIM', country: 'PE' },
  { city: 'Santiago', timezone: 'America/Santiago', iataCode: 'SCL', country: 'CL' },

  // Europe - United Kingdom
  { city: 'London (LHR)', timezone: 'Europe/London', iataCode: 'LHR', country: 'GB' },
  { city: 'London (LGW)', timezone: 'Europe/London', iataCode: 'LGW', country: 'GB' },
  { city: 'London (STN)', timezone: 'Europe/London', iataCode: 'STN', country: 'GB' },
  { city: 'Manchester', timezone: 'Europe/London', iataCode: 'MAN', country: 'GB' },
  { city: 'Edinburgh', timezone: 'Europe/London', iataCode: 'EDI', country: 'GB' },

  // Europe - Western Europe
  { city: 'Paris (CDG)', timezone: 'Europe/Paris', iataCode: 'CDG', country: 'FR' },
  { city: 'Paris (ORY)', timezone: 'Europe/Paris', iataCode: 'ORY', country: 'FR' },
  { city: 'Frankfurt', timezone: 'Europe/Berlin', iataCode: 'FRA', country: 'DE' },
  { city: 'Munich', timezone: 'Europe/Berlin', iataCode: 'MUC', country: 'DE' },
  { city: 'Berlin', timezone: 'Europe/Berlin', iataCode: 'BER', country: 'DE' },
  { city: 'Amsterdam', timezone: 'Europe/Amsterdam', iataCode: 'AMS', country: 'NL' },
  { city: 'Brussels', timezone: 'Europe/Brussels', iataCode: 'BRU', country: 'BE' },
  { city: 'Zurich', timezone: 'Europe/Zurich', iataCode: 'ZRH', country: 'CH' },
  { city: 'Geneva', timezone: 'Europe/Zurich', iataCode: 'GVA', country: 'CH' },
  { city: 'Vienna', timezone: 'Europe/Vienna', iataCode: 'VIE', country: 'AT' },

  // Europe - Southern Europe
  { city: 'Madrid', timezone: 'Europe/Madrid', iataCode: 'MAD', country: 'ES' },
  { city: 'Barcelona', timezone: 'Europe/Madrid', iataCode: 'BCN', country: 'ES' },
  { city: 'Rome (FCO)', timezone: 'Europe/Rome', iataCode: 'FCO', country: 'IT' },
  { city: 'Milan (MXP)', timezone: 'Europe/Rome', iataCode: 'MXP', country: 'IT' },
  { city: 'Venice', timezone: 'Europe/Rome', iataCode: 'VCE', country: 'IT' },
  { city: 'Athens', timezone: 'Europe/Athens', iataCode: 'ATH', country: 'GR' },
  { city: 'Lisbon', timezone: 'Europe/Lisbon', iataCode: 'LIS', country: 'PT' },

  // Europe - Northern Europe
  { city: 'Stockholm', timezone: 'Europe/Stockholm', iataCode: 'ARN', country: 'SE' },
  { city: 'Copenhagen', timezone: 'Europe/Copenhagen', iataCode: 'CPH', country: 'DK' },
  { city: 'Oslo', timezone: 'Europe/Oslo', iataCode: 'OSL', country: 'NO' },
  { city: 'Helsinki', timezone: 'Europe/Helsinki', iataCode: 'HEL', country: 'FI' },

  // Europe - Eastern Europe
  { city: 'Moscow', timezone: 'Europe/Moscow', iataCode: 'SVO', country: 'RU' },
  { city: 'St Petersburg', timezone: 'Europe/Moscow', iataCode: 'LED', country: 'RU' },
  { city: 'Istanbul', timezone: 'Europe/Istanbul', iataCode: 'IST', country: 'TR' },
  { city: 'Warsaw', timezone: 'Europe/Warsaw', iataCode: 'WAW', country: 'PL' },
  { city: 'Prague', timezone: 'Europe/Prague', iataCode: 'PRG', country: 'CZ' },
  { city: 'Budapest', timezone: 'Europe/Budapest', iataCode: 'BUD', country: 'HU' },

  // Middle East
  { city: 'Dubai', timezone: 'Asia/Dubai', iataCode: 'DXB', country: 'AE' },
  { city: 'Abu Dhabi', timezone: 'Asia/Dubai', iataCode: 'AUH', country: 'AE' },
  { city: 'Doha', timezone: 'Asia/Qatar', iataCode: 'DOH', country: 'QA' },
  { city: 'Tel Aviv', timezone: 'Asia/Jerusalem', iataCode: 'TLV', country: 'IL' },
  { city: 'Riyadh', timezone: 'Asia/Riyadh', iataCode: 'RUH', country: 'SA' },
  { city: 'Jeddah', timezone: 'Asia/Riyadh', iataCode: 'JED', country: 'SA' },

  // Africa
  { city: 'Cairo', timezone: 'Africa/Cairo', iataCode: 'CAI', country: 'EG' },
  { city: 'Johannesburg', timezone: 'Africa/Johannesburg', iataCode: 'JNB', country: 'ZA' },
  { city: 'Cape Town', timezone: 'Africa/Johannesburg', iataCode: 'CPT', country: 'ZA' },
  { city: 'Lagos', timezone: 'Africa/Lagos', iataCode: 'LOS', country: 'NG' },
  { city: 'Nairobi', timezone: 'Africa/Nairobi', iataCode: 'NBO', country: 'KE' },
  { city: 'Casablanca', timezone: 'Africa/Casablanca', iataCode: 'CMN', country: 'MA' },
  { city: 'Addis Ababa', timezone: 'Africa/Addis_Ababa', iataCode: 'ADD', country: 'ET' },

  // Asia - East Asia
  { city: 'Tokyo (NRT)', timezone: 'Asia/Tokyo', iataCode: 'NRT', country: 'JP' },
  { city: 'Tokyo (HND)', timezone: 'Asia/Tokyo', iataCode: 'HND', country: 'JP' },
  { city: 'Osaka', timezone: 'Asia/Tokyo', iataCode: 'KIX', country: 'JP' },
  { city: 'Beijing', timezone: 'Asia/Shanghai', iataCode: 'PEK', country: 'CN' },
  { city: 'Shanghai (PVG)', timezone: 'Asia/Shanghai', iataCode: 'PVG', country: 'CN' },
  { city: 'Hong Kong', timezone: 'Asia/Hong_Kong', iataCode: 'HKG', country: 'HK' },
  { city: 'Seoul (ICN)', timezone: 'Asia/Seoul', iataCode: 'ICN', country: 'KR' },
  { city: 'Taipei', timezone: 'Asia/Taipei', iataCode: 'TPE', country: 'TW' },
  { city: 'Guangzhou', timezone: 'Asia/Shanghai', iataCode: 'CAN', country: 'CN' },
  { city: 'Shenzhen', timezone: 'Asia/Shanghai', iataCode: 'SZX', country: 'CN' },

  // Asia - Southeast Asia
  { city: 'Singapore', timezone: 'Asia/Singapore', iataCode: 'SIN', country: 'SG' },
  { city: 'Bangkok', timezone: 'Asia/Bangkok', iataCode: 'BKK', country: 'TH' },
  { city: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur', iataCode: 'KUL', country: 'MY' },
  { city: 'Jakarta', timezone: 'Asia/Jakarta', iataCode: 'CGK', country: 'ID' },
  { city: 'Manila', timezone: 'Asia/Manila', iataCode: 'MNL', country: 'PH' },
  { city: 'Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh', iataCode: 'SGN', country: 'VN' },
  { city: 'Hanoi', timezone: 'Asia/Ho_Chi_Minh', iataCode: 'HAN', country: 'VN' },
  { city: 'Bali', timezone: 'Asia/Makassar', iataCode: 'DPS', country: 'ID' },

  // Asia - South Asia
  { city: 'Mumbai', timezone: 'Asia/Kolkata', iataCode: 'BOM', country: 'IN' },
  { city: 'Delhi', timezone: 'Asia/Kolkata', iataCode: 'DEL', country: 'IN' },
  { city: 'Bangalore', timezone: 'Asia/Kolkata', iataCode: 'BLR', country: 'IN' },
  { city: 'Chennai', timezone: 'Asia/Kolkata', iataCode: 'MAA', country: 'IN' },
  { city: 'Hyderabad', timezone: 'Asia/Kolkata', iataCode: 'HYD', country: 'IN' },
  { city: 'Colombo', timezone: 'Asia/Colombo', iataCode: 'CMB', country: 'LK' },
  { city: 'Karachi', timezone: 'Asia/Karachi', iataCode: 'KHI', country: 'PK' },
  { city: 'Dhaka', timezone: 'Asia/Dhaka', iataCode: 'DAC', country: 'BD' },

  // Oceania
  { city: 'Sydney', timezone: 'Australia/Sydney', iataCode: 'SYD', country: 'AU' },
  { city: 'Melbourne', timezone: 'Australia/Melbourne', iataCode: 'MEL', country: 'AU' },
  { city: 'Brisbane', timezone: 'Australia/Brisbane', iataCode: 'BNE', country: 'AU' },
  { city: 'Perth', timezone: 'Australia/Perth', iataCode: 'PER', country: 'AU' },
  { city: 'Auckland', timezone: 'Pacific/Auckland', iataCode: 'AKL', country: 'NZ' },
  { city: 'Wellington', timezone: 'Pacific/Auckland', iataCode: 'WLG', country: 'NZ' },
  { city: 'Christchurch', timezone: 'Pacific/Auckland', iataCode: 'CHC', country: 'NZ' },
];
