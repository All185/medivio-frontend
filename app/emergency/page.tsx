'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type Level = 'critical' | 'urgent' | 'standard' | null;

interface Result {
  level: Level;
  recommendation: string;
  call_samu: boolean;
}

export default function EmergencyPage() {
  const { t } = useLanguage();
  const [symptoms, setSymptoms] = useState('');
  const [pain, setPain] = useState(5);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const levelConfig = {
    critical: { color: 'bg-red-600', label: t('emergency.level_critical'), border: 'border-red-600' },
    urgent: { color: 'bg-orange-500', label: t('emergency.level_urgent'), border: 'border-orange-500' },
    standard: { color: 'bg-green-500', label: t('emergency.level_standard'), border: 'border-green-500' },
  };

  async function handleSubmit() {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await fetch('/api/emergency/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ symptoms, pain_level: pain, patient_id: user.id || 'unknown' }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setResult(data);
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
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">{t('emergency.back')}</Link>
        </div>
      </header>
      <div className="flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t('emergency.title')}</h1>
            <p className="text-gray-500 mt-1">{t('emergency.subtitle')}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {!result ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('emergency.symptoms_label')}</label>
                  <textarea className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]" placeholder={t('emergency.symptoms_placeholder')} value={symptoms} onChange={e => setSymptoms(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('emergency.pain_label')} : <span className="font-bold text-blue-600">{pain}/10</span></label>
                  <input type="range" min={1} max={10} value={pain} onChange={e => setPain(Number(e.target.value))} className="w-full accent-blue-600" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{t('emergency.pain_mild')}</span>
                    <span>{t('emergency.pain_severe')}</span>
                  </div>
                </div>
                <button onClick={handleSubmit} disabled={loading || !symptoms.trim()} className="btn-primary w-full py-3 text-sm">
                  {loading ? t('emergency.analyzing') : t('emergency.submit')}
                </button>
                <p className="text-xs text-center text-gray-400">{t('emergency.disclaimer')}</p>
              </div>
            ) : (
              <div className="space-y-5">
                {result.level && (
                  <div className={`rounded-xl border-2 ${levelConfig[result.level].border} p-5 text-center`}>
                    <div className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold mb-3 ${levelConfig[result.level].color}`}>{levelConfig[result.level].label}</div>
                    <p className="text-gray-700 text-sm">{result.recommendation}</p>
                  </div>
                )}
                {result.call_samu && (
                  <button onClick={() => window.location.href = 'tel:15'} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-colors">{t('emergency.call_samu')}</button>
                )}
                <button onClick={() => setResult(null)} className="w-full border border-gray-300 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">{t('emergency.new_analysis')}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
