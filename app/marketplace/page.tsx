'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Specialist {
  id: string;
  full_name: string;
  specialty: string;
  sub_specialty: string;
  bio: string;
  languages: string[];
  consultation_price: number;
  years_experience: number;
  city: string;
  country: string;
  average_rating: number;
  total_reviews: number;
  is_verified: boolean;
  is_claimed: boolean;
}

const SPECIALTIES = [
  'Cardiologie', 'Dermatologie', 'Neurologie', 'Psychiatrie',
  'Pediatrie', 'Gynecologie', 'Ophtalmologie', 'ORL',
  'Orthopédie', 'Gastro-enterologie', 'Endocrinologie',
  'Pneumologie', 'Rhumatologie', 'Urologie', 'Medecine generale'
];

export default function MarketplacePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => { fetchSpecialists(); }, [specialty, city]);

  async function fetchSpecialists() {
    setLoading(true);
    try {
      let url = '/api/marketplace/specialists';
      const params = new URLSearchParams();
      if (specialty) params.append('specialty', specialty);
      if (city) params.append('city', city);
      if (params.toString()) url += `?${params.toString()}`;
      const res = await fetch(url);
      if (res.ok) setSpecialists(await res.json());
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
          <span className="font-bold text-gray-900 text-lg hidden sm:block">Medivio</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">{t('marketplace.back')}</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('marketplace.title')}</h1>
          <p className="text-gray-500 mt-1">{t('marketplace.subtitle')}</p>
        </div>

        {/* Bouton matching IA */}
        <button onClick={() => router.push('/marketplace/match')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl mb-8 flex items-center justify-center gap-3 transition-colors">
          <span className="text-2xl">🤖</span>
          <span className="text-lg">{t('marketplace.ai_match')}</span>
        </button>

        {/* Filtres */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <select className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={specialty} onChange={e => setSpecialty(e.target.value)}>
            <option value="">{t('marketplace.all_specialties')}</option>
            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('marketplace.city_placeholder')} value={city} onChange={e => setCity(e.target.value)} />
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12">{t('marketplace.loading')}</p>
        ) : specialists.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">👨‍⚕️</div>
            <p className="text-gray-500">{t('marketplace.no_specialists')}</p>
            <button onClick={() => router.push('/marketplace/match')} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl text-sm transition-colors">
              {t('marketplace.try_ai_match')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {specialists.map(s => (
              <div key={s.id} onClick={() => router.push(`/marketplace/${s.id}`)} className="bg-white rounded-2xl border border-gray-200 p-6 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 flex-shrink-0">
                    {s.full_name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">Dr. {s.full_name}</h3>
                      {s.is_verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ {t('marketplace.verified')}</span>}
                    </div>
                    <p className="text-sm text-blue-600 font-medium mb-1">{s.specialty}</p>
                    {s.sub_specialty && <p className="text-xs text-gray-500 mb-2">{s.sub_specialty}</p>}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {s.city && <span>📍 {s.city}</span>}
                      {s.years_experience && <span>🎓 {s.years_experience} ans</span>}
                      {s.consultation_price && <span>💶 {s.consultation_price}€</span>}
                    </div>
                    {s.total_reviews > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-500 text-sm">{renderStars(s.average_rating)}</span>
                        <span className="text-xs text-gray-400">({s.total_reviews} avis)</span>
                      </div>
                    )}
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
