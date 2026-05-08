'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface VitalRecord {
  id: string;
  recorded_at: string;
  source: string;
  blood_pressure_systolic: number | null;
  blood_pressure_diastolic: number | null;
  heart_rate: number | null;
  oxygen_saturation: number | null;
  blood_glucose: number | null;
  weight: number | null;
  temperature: number | null;
  notes: string | null;
}

interface Alert {
  id: string;
  alert_type: string;
  severity: string;
  message: string;
  created_at: string;
}

export default function ChronicPage() {
  const { t, locale } = useLanguage();
  const [records, setRecords] = useState<VitalRecord[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newAlerts, setNewAlerts] = useState<Alert[]>([]);

  const localeMap: Record<string, string> = {
    fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ar: 'ar-SA',
  };
  const dateLocale = localeMap[locale] || 'fr-FR';

  const [form, setForm] = useState({
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    heart_rate: '',
    oxygen_saturation: '',
    blood_glucose: '',
    weight: '',
    temperature: '',
    notes: '',
  });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem('access_token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const [vitalsRes, alertsRes] = await Promise.all([
        fetch('/api/chronic/vitals', { headers }),
        fetch('/api/chronic/alerts', { headers }),
      ]);
      if (vitalsRes.ok) setRecords(await vitalsRes.json());
      if (alertsRes.ok) setAlerts(await alertsRes.json());
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('access_token');
      const body: Record<string, any> = {};
      Object.entries(form).forEach(([k, v]) => {
        if (v !== '') body[k] = k === 'notes' ? v : parseFloat(v);
      });
      const res = await fetch('/api/chronic/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        setNewAlerts(data.alerts);
        setForm({ blood_pressure_systolic: '', blood_pressure_diastolic: '', heart_rate: '', oxygen_saturation: '', blood_glucose: '', weight: '', temperature: '', notes: '' });
        setShowForm(false);
        fetchData();
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReadAlert(id: string) {
    const token = localStorage.getItem('access_token');
    await fetch(`/api/chronic/alerts/${id}/read`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` } });
    setAlerts(prev => prev.filter(a => a.id !== id));
  }

  const severityConfig: Record<string, { color: string; bg: string; icon: string }> = {
    info: { color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', icon: 'ℹ️' },
    warning: { color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', icon: '⚠️' },
    critical: { color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: '🚨' },
  };

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

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('chronic.title')}</h1>
            <p className="text-gray-500 mt-1">{t('chronic.subtitle')}</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
            + {t('chronic.add_record')}
          </button>
        </div>

        {/* Alertes actives */}
        {alerts.length > 0 && (
          <div className="space-y-3 mb-6">
            {alerts.map(alert => (
              <div key={alert.id} className={`rounded-2xl border-2 p-4 flex items-start justify-between gap-4 ${severityConfig[alert.severity]?.bg}`}>
                <div className="flex items-start gap-3">
                  <span className="text-xl">{severityConfig[alert.severity]?.icon}</span>
                  <p className={`text-sm font-medium ${severityConfig[alert.severity]?.color}`}>{alert.message}</p>
                </div>
                <button onClick={() => handleReadAlert(alert.id)} className="text-xs text-gray-400 hover:text-gray-600 whitespace-nowrap">✓</button>
              </div>
            ))}
          </div>
        )}

        {/* Nouvelles alertes après saisie */}
        {newAlerts.length > 0 && (
          <div className="space-y-3 mb-6">
            {newAlerts.map((alert, i) => (
              <div key={i} className={`rounded-2xl border-2 p-4 ${severityConfig[alert.severity]?.bg}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{severityConfig[alert.severity]?.icon}</span>
                  <p className={`text-sm font-medium ${severityConfig[alert.severity]?.color}`}>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Formulaire saisie */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-4">{t('chronic.new_record')}</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('chronic.bp_systolic')}</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="120" value={form.blood_pressure_systolic} onChange={e => setForm({...form, blood_pressure_systolic: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('chronic.bp_diastolic')}</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="80" value={form.blood_pressure_diastolic} onChange={e => setForm({...form, blood_pressure_diastolic: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('chronic.heart_rate')}</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="70" value={form.heart_rate} onChange={e => setForm({...form, heart_rate: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('chronic.oxygen_saturation')}</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="98" value={form.oxygen_saturation} onChange={e => setForm({...form, oxygen_saturation: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('chronic.blood_glucose')}</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="100" value={form.blood_glucose} onChange={e => setForm({...form, blood_glucose: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('chronic.weight')}</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="70" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('chronic.temperature')}</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="37.0" value={form.temperature} onChange={e => setForm({...form, temperature: e.target.value})} />
              </div>
            </div>
            <textarea className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3" placeholder={t('chronic.notes_placeholder')} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} />
            <button onClick={handleSubmit} disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
              {submitting ? t('chronic.saving') : t('chronic.save_record')}
            </button>
          </div>
        )}

        {/* Historique */}
        {loading ? (
          <p className="text-gray-400 text-center py-12">{t('chronic.loading')}</p>
        ) : records.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">❤️</div>
            <p className="text-gray-500">{t('chronic.no_records')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map(r => (
              <div key={r.id} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">{new Date(r.recorded_at).toLocaleString(dateLocale)}</p>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{r.source}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {r.blood_pressure_systolic && r.blood_pressure_diastolic && (
                    <div className="bg-red-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">❤️ {t('chronic.blood_pressure')}</p>
                      <p className="font-bold text-gray-900">{r.blood_pressure_systolic}/{r.blood_pressure_diastolic} mmHg</p>
                    </div>
                  )}
                  {r.heart_rate && (
                    <div className="bg-pink-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">💓 {t('chronic.heart_rate')}</p>
                      <p className="font-bold text-gray-900">{r.heart_rate} bpm</p>
                    </div>
                  )}
                  {r.oxygen_saturation && (
                    <div className="bg-blue-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">🫁 {t('chronic.oxygen_saturation')}</p>
                      <p className="font-bold text-gray-900">{r.oxygen_saturation}%</p>
                    </div>
                  )}
                  {r.blood_glucose && (
                    <div className="bg-yellow-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">🩸 {t('chronic.blood_glucose')}</p>
                      <p className="font-bold text-gray-900">{r.blood_glucose} mg/dL</p>
                    </div>
                  )}
                  {r.weight && (
                    <div className="bg-green-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">⚖️ {t('chronic.weight')}</p>
                      <p className="font-bold text-gray-900">{r.weight} kg</p>
                    </div>
                  )}
                  {r.temperature && (
                    <div className="bg-orange-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">🌡️ {t('chronic.temperature')}</p>
                      <p className="font-bold text-gray-900">{r.temperature}°C</p>
                    </div>
                  )}
                </div>
                {r.notes && <p className="text-sm text-gray-500 mt-3 italic">{r.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
