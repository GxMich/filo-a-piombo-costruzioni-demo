import { useEffect, useState } from 'react';
import { officeStatus } from '../hours.js';

// Parte da null: l'HTML pre-generato non conosce l'ora del visitatore.
export function useOfficeStatus() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const tick = () => setStatus(officeStatus());
    tick();
    const timer = window.setInterval(tick, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return status;
}

export function StatusBadge({ status, className = '' }) {
  return (
    <span className={`status ${status?.open ? 'is-open' : ''} ${status ? '' : 'is-pending'} ${className}`}>
      <span className="status-dot" aria-hidden="true" />
      {status ? status.label : 'Orari: lun–ven 8:00–17:30'}
    </span>
  );
}
