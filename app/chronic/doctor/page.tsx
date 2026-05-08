'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface PatientOverview {
  patient_id: string;
  latest_record: {
    recorded_at: string;
    blood_pressure_systolic: number | null;
    blood_pressure_diastolic: number | null;
    heart_rate: number | null;
    oxygen_saturation: number | null;
    blood_glucose: number | null;
    weight: number | null;
    temperature: number | null;
  } | null;
  unread_alerts: number;
}

export default function ChronicDoctorPage() {
  const { t, locale } = useLanguage();
  const [patients, setPatients] = useState<PatientOverview[]>([]);
  const [loading, setLoading] = useState(true);

  const localeMap: Record<string, string> = {
    fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ar: 'ar-SA',
  };
  const dateLocale = localeMap[locale] || 'fr-FR';

  useEffect(() => { fetchOverview(); }, []);

  async function fetchOverview() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/chronic/doctor/overview', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) setPatients(await res.json());
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(alerts: number) {
    if (alerts === 0) return 'bg-green-50 border-green-200';
    if (alerts <= 2) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  }

  function getStatusIcon(alerts: number) {
    if (alerts === 0) return '✅';
    if (alerts <= 2) return '⚠️';
    return '🚨';
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
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">{t('chronic.back')}</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('chronic.doctor_title')}</h1>
          <p className="text-gray-500 mt-1">{t('chronic.doctor_subtitle')}</p>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12">{t('chronic.loading')}</p>
        ) : patients.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">👥</div>
            <p className="text-gray-500">{t('chronic.no_patients')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {patients.map(p => (
              <div key={p.patient_id} className={`rounded-2xl border-2 p-6 ${getStatusColor(p.unread_alerts)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getStatusIcon(p.unread_alerts)}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{t('chronic.patient')} {p.patient_id.substring(0, 8)}...</p>
                      {p.unread_alerts > 0 && (
                        <span className="text-xs font-bold text-red-600">{p.unread_alerts} {t('chronic.unread_alerts')}</span>
                      )}
                    </div>
                  </div>
                  {p.latest_record && (
                    <p className="text-xs text-gray-400">{new Date(p.latest_record.recorded_at).toLocaleString(dateLocale)}</p>
                  )}
                </div>

                {p.latest_record ? (
                  <div className="grid grid-cols-3 gap-3">
                    {p.latest_record.blood_pressure_systolic && p.latest_record.blood_pressure_diastolic && (
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">❤️ {t('chronic.blood_pressure')}</p>
                        <p className="font-bold text-sm text-gray-900">{p.latest_record.blood_pressure_systolic}/{p.latest_record.blood_pressure_diastolic}</p>
                      </div>
                    )}
                    {p.latest_record.heart_rate && (
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">💓 {t('chronic.heart_rate')}</p>
                        <p className="font-bold text-sm text-gray-900">{p.latest_record.heart_rate} bpm</p>
                      </div>
                    )}
                    {p.latest_record.oxygen_saturation && (
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">🫁 SpO2</p>
                        <p className="font-bold text-sm text-gray-900">{p.latest_record.oxygen_saturation}%</p>
                      </div>
                    )}
                    {p.latest_record.blood_glucose && (
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">🩸 {t('chronic.blood_glucose')}</p>
                        <p className="font-bold text-sm text-gray-900">{p.latest_record.blood_glucose} mg/dL</p>
                      </div>
                    )}
                    {p.latest_record.weight && (
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">⚖️ {t('chronic.weight')}</p>
                        <p className="font-bold text-sm text-gray-900">{p.latest_record.weight} kg</p>
                      </div>
                    )}
                    {p.latest_record.temperature && (
                      <div className="bg-white rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">🌡️ {t('chronic.temperature')}</p>
                        <p className="font-bold text-sm text-gray-900">{p.latest_record.temperature}°C</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center">{t('chronic.no_records_yet')}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
