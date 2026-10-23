import React, { useCallback } from 'react';
import { adminApi } from '../api';
import { PageHeader, useLoader } from './ui';
import { formatMoney } from '../utils/cars';

export default function Dashboard() {
  const fetcher = useCallback(() => adminApi.dashboard(), []);
  const { data, error } = useLoader(fetcher);
  const stats = data && [
    ['Registered Users', data.total_users],
    ['Vehicles', data.total_cars],
    ['Brands', data.total_brands],
    ['Total Bookings', data.total_bookings],
    ['Subscribers', data.total_subscribers],
    ['Contact Queries', data.total_queries],
    ['Revenue', formatMoney(data.total_revenue)],
  ];
  return (
    <>
      <PageHeader title="Dashboard" sub="Overview of the FAST CARS platform" />
      {error && <p className="admin-error">{error}</p>}
      {!data && !error && <p>Loading…</p>}
      {data && (
        <>
          <div className="admin-stats">
            {stats.map(([label, value]) => (
              <div className="admin-stat" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="admin-card">
            <h3 style={{ marginTop: 0 }}>Bookings by status</h3>
            <div className="admin-stats" style={{ marginBottom: 0 }}>
              {Object.entries(data.bookings_by_status).map(([k, v]) => (
                <div className="admin-stat" key={k}>
                  <span style={{ textTransform: 'capitalize' }}>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
