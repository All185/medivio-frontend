'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface PrescriptionItem {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export default function NewPrescriptionPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [patientId, setPatientId] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PrescriptionItem[]>([
    { medication: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);

  function addItem() {
    setItems([...items, { medication: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof PrescriptionItem, value: string) {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  }

  async function handleSubmit() {
    if (!patientId.trim() || items.some(i => !i.medication || !i.dosage)) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/prescriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ patient_id: patientId, items, notes }),
      });
      if (res.ok) {
        router.push('/prescriptions/doctor');
      }
    } finally {
      setLoading(false);
    }
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
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">{t('prescription.back')}</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('prescription.new_title')}</h1>
          <p className="text-gray-500 mt-1">{t('prescription.new_subtitle')}</p>
        </div>

        <div className="space-y-6">
          {/* Patient ID */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('prescription.patient_id')}</label>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('prescription.patient_id_placeholder')}
              value={patientId}
              onChange={e => setPatientId(e.target.value)}
            />
          </div>

          {/* Médicaments */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{t('prescription.medications')}</h2>
              <button onClick={addItem} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                + {t('prescription.add_medication')}
              </button>
            </div>

            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{t('prescription.medication')} {index + 1}</span>
                    {items.length > 1 && (
                      <button onClick={() => removeItem(index)} className="text-xs text-red-500 hover:text-red-700">
                        {t('prescription.remove')}
                      </button>
                    )}
                  </div>
                  <input
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('prescription.medication_name')}
                    value={item.medication}
                    onChange={e => updateItem(index, 'medication', e.target.value)}
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t('prescription.dosage')}
                      value={item.dosage}
                      onChange={e => updateItem(index, 'dosage', e.target.value)}
                    />
                    <input
                      className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t('prescription.frequency')}
                      value={item.frequency}
                      onChange={e => updateItem(index, 'frequency', e.target.value)}
                    />
                    <input
                      className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t('prescription.duration')}
                      value={item.duration}
                      onChange={e => updateItem(index, 'duration', e.target.value)}
                    />
                  </div>
                  <input
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('prescription.instructions')}
                    value={item.instructions}
                    onChange={e => updateItem(index, 'instructions', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('prescription.notes')}</label>
            <textarea
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[80px]"
              placeholder={t('prescription.notes_placeholder')}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !patientId.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? t('prescription.creating') : t('prescription.create')}
          </button>
        </div>
      </div>
    </div>
  );
}
