'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LoyaltyData {
  total_points: number;
  level: { name: string; discount: number };
}

const LEVEL_CONFIG: Record<string, { icon: string; color: string }> = {
  bronze: { icon: '🥉', color: 'text-amber-700' },
  argent: { icon: '🥈', color: 'text-gray-500' },
  or: { icon: '🥇', color: 'text-yellow-600' },
  platine: { icon: '💎', color: 'text-blue-600' },
};

export default function LoyaltyBadge() {
  const router = useRouter();
  const [data, setData] = useState<LoyaltyData | null>(null);

  useEffect(() => {
    fetchLoyalty();
  }, []);

  async function fetchLoyalty() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/loyalty/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) setData(await res.json());
    } catch {}
  }

  if (!data) return null;

  const cfg = LEVEL_CONFIG[data.level.name] || LEVEL_CONFIG.bronze;

  return (
    <button
      onClick={() => router.push('/loyalty')}
      className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50 transition-colors"
    >
      <span className="text-lg">{cfg.icon}</span>
      <div className="text-left">
        <p className={`text-xs font-bold uppercase ${cfg.color}`}>{data.level.name}</p>
        <p className="text-xs text-gray-500">{data.total_points} pts</p>
      </div>
    </button>
  );
}
