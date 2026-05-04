'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import QRCode from 'qrcode';

interface PrescriptionItem {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Prescription {
  id: string;
  token: string;
  status: string;
  notes: string;
  created_at: string;
  expires_at: string;
  prescription_items: PrescriptionItem[];
}

export default function PatientPrescriptionsPage() {
  const { t, locale } = useLanguage();
const localeMap: Record<string, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-BR',
  ar: 'ar-SA',
};
const dateLocale = localeMap[locale] || 'fr-FR';
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  async function fetchPrescriptions() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/prescriptions/patient', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPrescriptions(data);
        generateQRCodes(data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function generateQRCodes(data: Prescription[]) {
    const codes: Record<string, string> = {};
    for (const p of data) {
      const url = `${window.location.origin}/prescriptions/verify/${p.token}`;
      codes[p.id] = await QRCode.toDataURL(url, { width: 200, margin: 2 });
    }
    setQrCodes(codes);
  }

  const statusConfig: Record<string, { color: string; label: string }> = {
    active: { color: 'bg-green-100 text-green-700', label: t('prescription.status_active') },
    dispensed: { color: 'bg-blue-100 text-blue-700', label: t('prescription.status_dispensed') },
    expired: { color: 'bg-gray-100 text-gray-500', label: t('prescription.status_expired') },
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
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">{t('prescription.back')}</Link>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('prescription.my_prescriptions')}</h1>
          <p className="text-gray-500 mt-1">{t('prescription.my_prescriptions_subtitle')}</p>
        </div>
        {loading ? (
          <p className="text-gray-400 text-center py-12">{t('prescription.loading')}</p>
        ) : prescriptions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500">{t('prescription.no_prescriptions')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {prescriptions.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusConfig[p.status]?.color}`}>
                          {statusConfig[p.status]?.label}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(p.created_at).toLocaleDateString(dateLocale)}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{p.prescription_items.length} {t('prescription.medications_count')}</p>
                    </div>
                    <span className="text-gray-400">{expanded === p.id ? '▲' : '▼'}</span>
                  </div>
                </div>
                {expanded === p.id && (
                  <div className="border-t border-gray-100 p-6 space-y-4">
                    {qrCodes[p.id] && (
                      <div className="flex flex-col items-center gap-3 py-4">
                        <img src={qrCodes[p.id]} alt="QR Code" className="rounded-xl" />
                        <p className="text-xs text-gray-400 text-center">{t('prescription.qr_hint')}</p>
                        <a href={qrCodes[p.id]} download={`ordonnance-${p.id}.png`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          {t('prescription.download_qr')}
                        </a>
                      </div>
                    )}
                    <div className="space-y-3">
                      {p.prescription_items.map(item => (
                        <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                          <p className="font-semibold text-gray-900">{item.medication}</p>
                          <p className="text-sm text-gray-600 mt-1">{item.dosage} - {item.frequency} - {item.duration}</p>
                          {item.instructions && <p className="text-xs text-gray-400 mt-1">{item.instructions}</p>}
                        </div>
                      ))}
                    </div>
                    {p.notes && (
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-sm text-blue-700">{p.notes}</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 text-center">{t('prescription.expires')} : {new Date(p.expires_at).toLocaleDateString(dateLocale)}</p>
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
