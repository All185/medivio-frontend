'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface AsyncCase {
  id: string;
  specialty: string;
  chief_complaint: string;
  symptoms: string[];
  questionnaire_answers: Record<string, string>;
  triage_level: string;
  triage_reason: string;
  ai_summary: string;
  status: string;
  doctor_response: string | null;
  created_at: string;
  answered_at: string | null;
  messages: { id: string; sender_role: string; message: string; created_at: string }[];
}

export default function AsyncCaseDetailPage() {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const { id } = useParams();
  const [caseData, setCaseData] = useState<AsyncCase | null>(null);
  const [loading, setLoading] = useState(true);

  const localeMap: Record<string, string> = {
    fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ar: 'ar-SA',
  };
  const dateLocale = localeMap[locale] || 'fr-FR';

  const triageConfig: Record<string, { color: string; bg: string; label: string }> = {
    async: { color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: t('async.triage_async') },
    video: { color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', label: t('async.triage_video') },
    emergency: { color: 'text-red-600', bg: 'bg-red-50 border-red-200', label: t('async.triage_emergency') },
  };

  useEffect(() => { fetchCase(); }, [id]);

  async function fetchCase() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`/api/async-care/cases/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) setCaseData(await res.json());
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-400">{t('async.loading')}</p></div>;
  if (!caseData) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">{t('async.not_found')}</p></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg hidden sm:block">Medivio</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button onClick={() => router.push('/async-care')} className="text-sm text-gray-500 hover:text-gray-700">{t('async.back')}</button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        {/* En-tete dossier */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{caseData.chief_complaint}</h1>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${triageConfig[caseData.triage_level]?.color} ${triageConfig[caseData.triage_level]?.bg}`}>
              {triageConfig[caseData.triage_level]?.label}
            </span>
          </div>
          <p className="text-sm text-blue-600 font-medium mb-2">{caseData.specialty}</p>
          <p className="text-xs text-gray-400">{new Date(caseData.created_at).toLocaleString(dateLocale)}</p>
          {caseData.triage_reason && (
            <div className="mt-4 bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">{t('async.triage_reason')}</p>
              <p className="text-sm text-gray-700">{caseData.triage_reason}</p>
            </div>
          )}
        </div>

        {/* Resume IA */}
        {caseData.ai_summary && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-xs font-semibold text-blue-600 mb-2">🤖 {t('async.ai_summary')}</p>
            <p className="text-sm text-blue-800">{caseData.ai_summary}</p>
          </div>
        )}

        {/* Symptomes */}
        {caseData.symptoms.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-3">{t('async.symptoms_label')}</h2>
            <div className="flex flex-wrap gap-2">
              {caseData.symptoms.map((s, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Questionnaire */}
        {Object.keys(caseData.questionnaire_answers).length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-3">{t('async.questionnaire')}</h2>
            <div className="space-y-3">
              {Object.entries(caseData.questionnaire_answers).filter(([, v]) => v).map(([q, a]) => (
                <div key={q} className="border-b border-gray-100 pb-2 last:border-0">
                  <p className="text-xs text-gray-500">{q}</p>
                  <p className="text-sm font-medium text-gray-900">{a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reponse medecin */}
        {caseData.doctor_response && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <p className="text-xs font-semibold text-green-600 mb-2">👨‍⚕️ {t('async.doctor_response')}</p>
            <p className="text-sm text-gray-800">{caseData.doctor_response}</p>
            {caseData.answered_at && (
              <p className="text-xs text-gray-400 mt-2">{new Date(caseData.answered_at).toLocaleString(dateLocale)}</p>
            )}
          </div>
        )}

        {caseData.triage_level === 'emergency' && (
          <button onClick={() => router.push('/emergency')} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-colors">
            🚨 {t('async.go_emergency')}
          </button>
        )}

        {caseData.triage_level === 'video' && (
          <button onClick={() => router.push('/appointments/new')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-colors">
            📹 {t('async.book_video')}
          </button>
        )}
      </div>
    </div>
  );
}
