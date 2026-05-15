'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface AsyncCase {
  id: string;
  specialty: string;
  chief_complaint: string;
  triage_level: string;
  status: string;
  doctor_response: string | null;
  created_at: string;
  answered_at: string | null;
}

export default function AsyncCarePage() {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [cases, setCases] = useState<AsyncCase[]>([]);
  const [loading, setLoading] = useState(true);

  const localeMap: Record<string, string> = {
    fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ar: 'ar-SA',
  };
  const dateLocale = localeMap[locale] || 'fr-FR';

  const statusConfig: Record<string, { color: string; bg: string; label: string; icon: string }> = {
    pending: { color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', label: t('async.status_pending'), icon: '⏳' },
    in_review: { color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', label: t('async.status_in_review'), icon: '👨‍⚕️' },
    answered: { color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: t('async.status_answered'), icon: '✅' },
    escalated: { color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200', label: t('async.status_escalated'), icon: '📹' },
    closed: { color: 'text-gray-500', bg: 'bg-gray-50 border-gray-200', label: t('async.status_closed'), icon: '🔒' },
  };

  const triageConfig: Record<string, { color: string; label: string }> = {
    async: { color: 'text-green-600', label: t('async.triage_async') },
    video: { color: 'text-orange-600', label: t('async.triage_video') },
    emergency: { color: 'text-red-600', label: t('async.triage_emergency') },
  };

  useEffect(() => { fetchCases(); }, []);

  async function fetchCases() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/async-care/cases/patient', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) setCases(await res.json());
    } finally {
      setLoading(false);
    }
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
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">{t('async.back')}</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('async.title')}</h1>
            <p className="text-gray-500 mt-1">{t('async.subtitle')}</p>
          </div>
          <button onClick={() => router.push('/async-care/new')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
            + {t('async.new_case')}
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12">{t('async.loading')}</p>
        ) : cases.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500">{t('async.no_cases')}</p>
            <button onClick={() => router.push('/async-care/new')} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl text-sm transition-colors">
              {t('async.start_case')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.map(c => (
              <div key={c.id} onClick={() => router.push(`/async-care/${c.id}`)} className={`rounded-2xl border-2 p-6 cursor-pointer hover:shadow-md transition-all ${statusConfig[c.status]?.bg}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{statusConfig[c.status]?.icon}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statusConfig[c.status]?.color}`}>
                        {statusConfig[c.status]?.label}
                      </span>
                      <span className={`text-xs font-medium ${triageConfig[c.triage_level]?.color}`}>
                        {triageConfig[c.triage_level]?.label}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">{c.chief_complaint}</p>
                    <p className="text-sm text-blue-600">{c.specialty}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(c.created_at).toLocaleString(dateLocale)}</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
                {c.doctor_response && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">👨‍⚕️ {t('async.doctor_response')}</p>
                    <p className="text-sm text-gray-700">{c.doctor_response.substring(0, 100)}...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
