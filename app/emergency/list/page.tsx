'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Emergency {
  id: string;
  symptoms: string;
  pain_level: number;
  level: string;
  recommendation: string;
  handled: boolean;
  created_at: string;
}

export default function EmergencyListPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);

  const levelConfig: Record<string, { color: string; bg: string; label: string }> = {
    critical: { color: 'text-red-600', bg: 'bg-red-50 border-red-200', label: 'CRITIQUE' },
    urgent: { color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200', label: 'URGENT' },
    standard: { color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: 'STANDARD' },
  };

  useEffect(() => {
    fetchEmergencies();
    const interval = setInterval(fetchEmergencies, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchEmergencies() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/emergency/active', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) setEmergencies(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkHandled(id: string) {
    const token = localStorage.getItem('access_token');
    await fetch(`/api/emergency/${id}/handled`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    fetchEmergencies();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
  <div className="flex items-center gap-2">
    <Image src="/logo.png" alt="Medivio" width={36} height={36} />
    <span className="font-bold text-gray-900 text-lg">Medivio</span>
  </div>
  <div className="flex items-center gap-4">
    <LanguageSwitcher />
    <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
      Retour au tableau de bord
    </Link>
  </div>
</header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Urgences en attente</h1>
          <p className="text-gray-500 mt-1">Liste des urgences patients non traitees.</p>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12">Chargement...</p>
        ) : emergencies.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-gray-500">Aucune urgence en attente.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {emergencies.map(e => (
              <div key={e.id} className={`rounded-2xl border p-6 ${levelConfig[e.level]?.bg || 'bg-white border-gray-200'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${levelConfig[e.level]?.color || ''}`}>
                        {levelConfig[e.level]?.label || e.level}
                      </span>
                      <span className="text-xs text-gray-400">
                        Douleur : {e.pain_level}/10
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(e.created_at).toLocaleString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Symptomes :</span> {e.symptoms}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Recommandation :</span> {e.recommendation}</p>
                  </div>
                  <button
                    onClick={() => handleMarkHandled(e.id)}
                    className="text-xs bg-white border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 whitespace-nowrap"
                  >
                    Marquer traite
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
