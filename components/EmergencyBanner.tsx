'use client';
import { useEffect, useState } from 'react';

interface Alert {
  id: string;
  level: string;
  handled: boolean;
  created_at: string;
}

export default function EmergencyBanner() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchAlerts() {
    try {
      const res = await fetch('/api/emergency/active');
      if (res.ok) setAlerts(await res.json());
    } catch {}
  }

  if (alerts.length === 0) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <span className="text-xl">🚨</span>
        <span className="font-semibold text-sm">
          {alerts.length} urgence{alerts.length > 1 ? 's' : ''} en attente
        </span>
        <div className="flex gap-2 flex-wrap ml-2">
          {alerts.map(a => (
            <span key={a.id} className="bg-red-800 px-2 py-0.5 rounded-full text-xs uppercase">
              {a.level}
            </span>
          ))}
        </div>
        <a href="/emergency/list" className="ml-auto text-xs underline whitespace-nowrap">
          Voir tout
        </a>
      </div>
    </div>
  );
}