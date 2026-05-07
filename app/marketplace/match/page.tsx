'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Specialist {
  id: string;
  full_name: string;
  specialty: string;
  city: string;
  consultation_price: number;
  average_rating: number;
  total_reviews: number;
  is_verified: boolean;
}

interface MatchResult {
  specialty: string;
  urgency: string;
  reason: string;
  specialists: Specialist[];
}

export default function MarketplaceMatchPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  const urgencyConfig: Record<string, { color: string; label: string; bg: string }> = {
    low: { color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: t('marketplace.urgency_low') },
    medium: { color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', label: t('marketplace.urgency_medium') },
    high: { color: 'text-red-600', bg: 'bg-red-50 border-red-200', label: t('marketplace.urgency_high') },
  };

  async function handleMatch() {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/marketplace/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ symptoms }),
      });
      if (res.ok) setResult(await res.json());
    } finally {
      setLoading(false);
    }
  }

  function renderStars(rating: number) {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
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
          <Link href="/marketplace" className="text-sm text-gray-500 hover:text-gray-700">{t('marketplace.back_list')}</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('marketplace.match_title')}</h1>
          <p className="text-gray-500 mt-1">{t('marketplace.match_subtitle')}</p>
        </div>

        {!result ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
            <div className="text-center text-6xl mb-2">🤖</div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('marketplace.symptoms_label')}</label>
              <textarea className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]" placeholder={t('marketplace.symptoms_placeholder')} value={symptoms} onChange={e => setSymptoms(e.target.value)} />
            </div>
            <button onClick={handleMatch} disabled={loading || !symptoms.trim()} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
              {loading ? t('marketplace.analyzing') : t('marketplace.find_specialist')}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Résultat IA */}
            <div className={`rounded-2xl border-2 p-6 ${urgencyConfig[result.urgency]?.bg}`}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900">{t('marketplace.recommended_specialty')}</h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${urgencyConfig[result.urgency]?.color}`}>
                  {urgencyConfig[result.urgency]?.label}
                </span>
              </div>
              <p className="text-xl font-bold text-blue-600 mb-2">{result.specialty}</p>
              <p className="text-sm text-gray-600">{result.reason}</p>
              {result.urgency === 'high' && (
                <Link href="/emergency" className="block mt-4 text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-sm font-semibold transition-colors">
                  {t('marketplace.go_emergency')}
                </Link>
              )}
            </div>

            {/* Spécialistes recommandés */}
            {result.specialists.length > 0 ? (
              <div>
                <h2 className="font-bold text-gray-900 mb-4">{t('marketplace.available_specialists')}</h2>
                <div className="space-y-4">
                  {result.specialists.map(s => (
                    <div key={s.id} onClick={() => router.push(`/marketplace/${s.id}`)} className="bg-white rounded-2xl border border-gray-200 p-5 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl font-bold text-blue-600">
                          {s.full_name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">Dr. {s.full_name}</p>
                            {s.is_verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓</span>}
                          </div>
                          <p className="text-sm text-blue-600">{s.specialty}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                            {s.city && <span>📍 {s.city}</span>}
                            {s.consultation_price && <span>💶 {s.consultation_price}€</span>}
                            {s.total_reviews > 0 && <span className="text-yellow-500">{renderStars(s.average_rating)}</span>}
                          </div>
                        </div>
                        <span className="text-gray-400">›</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <p className="text-gray-500">{t('marketplace.no_specialists_match')}</p>
              </div>
            )}

            <button onClick={() => setResult(null)} className="w-full border border-gray-300 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              {t('marketplace.new_search')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
