'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface LoyaltyLevel {
  name: string;
  min: number;
  discount: number;
}

interface HistoryItem {
  id: string;
  action: string;
  points: number;
  created_at: string;
}

interface LoyaltyData {
  total_points: number;
  level: LoyaltyLevel;
  history: HistoryItem[];
  next_level: LoyaltyLevel | null;
  points_to_next: number;
}

const LEVEL_CONFIG: Record<string, { color: string; bg: string; icon: string; border: string }> = {
  bronze: { color: 'text-amber-700', bg: 'bg-amber-50', icon: '🥉', border: 'border-amber-300' },
  argent: { color: 'text-gray-500', bg: 'bg-gray-50', icon: '🥈', border: 'border-gray-300' },
  or: { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: '🥇', border: 'border-yellow-300' },
  platine: { color: 'text-blue-600', bg: 'bg-blue-50', icon: '💎', border: 'border-blue-300' },
};

const ACTION_LABELS: Record<string, string> = {
  consultation: 'Consultation effectuee',
  profile_completed: 'Profil complete',
  review_left: 'Avis laisse',
  referral: 'Parrainage',
  daily_login: 'Connexion quotidienne',
};

export default function LoyaltyPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<LoyaltyData | null>(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  }

  const levelCfg = data ? LEVEL_CONFIG[data.level.name] || LEVEL_CONFIG.bronze : LEVEL_CONFIG.bronze;

  const progressPercent = data && data.next_level
    ? Math.round(((data.total_points - data.level.min) / (data.next_level.min - data.level.min)) * 100)
    : 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">{t('loyalty.back')}</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('loyalty.title')}</h1>
          <p className="text-gray-500 mt-1">{t('loyalty.subtitle')}</p>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12">{t('loyalty.loading')}</p>
        ) : !data ? (
          <p className="text-gray-400 text-center py-12">{t('loyalty.error')}</p>
        ) : (
          <div className="space-y-6">
            {/* Carte niveau */}
            <div className={`rounded-2xl border-2 ${levelCfg.border} ${levelCfg.bg} p-8 text-center`}>
              <div className="text-6xl mb-3">{levelCfg.icon}</div>
              <div className={`text-2xl font-bold uppercase mb-1 ${levelCfg.color}`}>
                {t(`loyalty.level_${data.level.name}`)}
              </div>
              <div className="text-4xl font-extrabold text-gray-900 my-4">
                {data.total_points} <span className="text-lg font-medium text-gray-500">{t('loyalty.points')}</span>
              </div>
              {data.level.discount > 0 && (
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${levelCfg.color} ${levelCfg.bg} border ${levelCfg.border}`}>
                  -{data.level.discount}% {t('loyalty.discount')}
                </div>
              )}
            </div>

            {/* Barre de progression */}
            {data.next_level && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{t(`loyalty.level_${data.level.name}`)}</span>
                  <span>{t(`loyalty.level_${data.next_level.name}`)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {data.points_to_next} {t('loyalty.points_to_next')} {t(`loyalty.level_${data.next_level.name}`)}
                </p>
              </div>
            )}

            {/* Avantages */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">{t('loyalty.how_to_earn')}</h2>
              <div className="space-y-3">
                {[
                  { action: 'consultation', points: 100, icon: '🩺' },
                  { action: 'profile_completed', points: 50, icon: '👤' },
                  { action: 'review_left', points: 30, icon: '⭐' },
                  { action: 'referral', points: 200, icon: '👥' },
                  { action: 'daily_login', points: 10, icon: '📅' },
                ].map(item => (
                  <div key={item.action} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm text-gray-700">{t(`loyalty.action_${item.action}`)}</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">+{item.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historique */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">{t('loyalty.history')}</h2>
              {data.history.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">{t('loyalty.no_history')}</p>
              ) : (
                <div className="space-y-2">
                  {data.history.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{t(`loyalty.action_${item.action}`)}</p>
                        <p className="text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">+{item.points} pts</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
