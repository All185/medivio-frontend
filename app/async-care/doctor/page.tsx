'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface AsyncCase {
  id: string;
  patient_id: string;
  specialty: string;
  chief_complaint: string;
  triage_level: string;
  ai_summary: string;
  status: string;
  created_at: string;
}

export default function AsyncCareDoctorPage() {
  const { t, locale } = useLanguage();
  const [cases, setCases] = useState<AsyncCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<AsyncCase | null>(null);
  const [response, setResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const localeMap: Record<string, string> = {
    fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ar: 'ar-SA',
  };
  const dateLocale = localeMap[locale] || 'fr-FR';

  const triageConfig: Record<string, { color: string; bg: string; label: string }> = {
    async: { color: 'text-green-600', bg: 'bg-green-50', label: t('async.triage_async') },
    video: { color: 'text-orange-600', bg: 'bg-orange-50', label: t('async.triage_video') },
    emergency: { color: 'text-red-600', bg: 'bg-red-50', label: t('async.triage_emergency') },
  };

  useEffect(() => { fetchCases(); }, []);

  async function fetchCases() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/async-care/cases/doctor', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) setCases(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function handleRespond(caseId: string) {
    if (!response.trim()) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`/api/async-care/cases/${caseId}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ response }),
      });
      if (res.ok) {
        setSelectedCase(null);
        setResponse('');
        fetchCases();
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEscalate(caseId: string) {
    const token = localStorage.getItem('access_token');
    await fetch(`/api/async-care/cases/${caseId}/escalate`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    fetchCases();
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

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('async.doctor_title')}</h1>
          <p className="text-gray-500 mt-1">{t('async.doctor_subtitle')}</p>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12">{t('async.loading')}</p>
        ) : cases.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500">{t('async.no_pending_cases')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.map(c => (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${triageConfig[c.triage_level]?.bg} ${triageConfig[c.triage_level]?.color}`}>
                          {triageConfig[c.triage_level]?.label}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString(dateLocale)}</span>
                      </div>
                      <p className="font-bold text-gray-900 mb-1">{c.chief_complaint}</p>
                      <p className="text-sm text-blue-600">{c.specialty}</p>
                    </div>
                  </div>

                  {c.ai_summary && (
                    <div className="bg-blue-50 rounded-xl p-3 mb-4">
                      <p className="text-xs font-semibold text-blue-600 mb-1">🤖 {t('async.ai_summary')}</p>
                      <p className="text-sm text-blue-800">{c.ai_summary}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => setSelectedCase(selectedCase?.id === c.id ? null : c)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold transition-colors">
                      {selectedCase?.id === c.id ? t('async.cancel') : t('async.respond')}
                    </button>
                    <button onClick={() => handleEscalate(c.id)} className="border border-gray-300 px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      📹 {t('async.escalate')}
                    </button>
                  </div>
                </div>

                {selectedCase?.id === c.id && (
                  <div className="border-t border-gray-100 p-6">
                    <textarea className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px] mb-3" placeholder={t('async.response_placeholder')} value={response} onChange={e => setResponse(e.target.value)} />
                    <button onClick={() => handleRespond(c.id)} disabled={submitting || !response.trim()} className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
                      {submitting ? t('async.submitting') : t('async.send_response')}
                    </button>
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
