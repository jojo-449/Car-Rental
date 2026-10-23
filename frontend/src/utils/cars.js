import { assetUrl } from '../api/client';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=700&q=80';

const tagFor = (car) => {
  const cat = (car.category?.name || '').toLowerCase();
  if (cat.includes('fast')) return { label: 'Supercar', type: 'tag-supercar' };
  if (cat.includes('sport')) return { label: 'Sport', type: 'tag-sport' };
  return { label: car.category?.name || car.fuel_type, type: 'tag-neutral' };
};

// shape an API car for the card components
export const adaptCar = (car) => ({
  id: car.id,
  name: car.title,
  brand: car.brand?.name || '',
  category: car.category?.name || '',
  price: car.price_per_day,
  image: assetUrl(car.image_url) || FALLBACK_IMAGE,
  tags: [
    tagFor(car),
    car.transmission?.toLowerCase() === 'manual'
      ? { label: 'Manual', type: 'tag-manual' }
      : { label: car.transmission || 'Automatic', type: 'tag-auto' },
  ],
  raw: car,
});

export const formatMoney = (n) =>
  `$${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : '';

export const FEATURES = [
  ['air_conditioner', 'Air Conditioner'],
  ['power_door_locks', 'Power Door Locks'],
  ['anti_lock_braking', 'AntiLock Braking System'],
  ['brake_assist', 'Brake Assist'],
  ['power_steering', 'Power Steering'],
  ['driver_airbag', 'Driver Airbag'],
  ['passenger_airbag', 'Passenger Airbag'],
  ['power_windows', 'Power Windows'],
  ['cd_player', 'CD Player'],
  ['central_locking', 'Central Locking'],
  ['crash_sensor', 'Crash Sensor'],
  ['leather_seats', 'Leather Seats'],
];
