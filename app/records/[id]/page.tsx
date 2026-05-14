'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface Record {
  id:             string
  appointment_id: string
  patient_id:     string
  doctor_id:      string
  diagnosis:      string
  prescription:   string | null
  notes:          string | null
  created_at:     string
}

export default function RecordDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { t } = useLanguage()
  const [record, setRecord] = useState<Record | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecord()
  }, [])

  const fetchRecord = async () => {
    try {
      const res = await api.get(`/records/${params.id}`)
      setRecord(res.data)
    } catch (err: any) {
      setError(t('auth.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Medivio" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            <span className="text-lg font-extrabold text-[#0B1F4B] hidden sm:block">Medivio</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => router.push('/records')}
              className="text-sm text-gray-500 hover:text-blue-600 transition font-medium"
            >
              {t('records.back')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-pulse text-gray-400">{t('auth.loading')}</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl">
            ⚠️ {error}
          </div>
        ) : record && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{t('records.title')}</h2>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(record.created_at).toLocaleDateString('fr-FR', {
                  weekday: 'long', year: 'numeric',
                  month: 'long', day: 'numeric',
                })}
              </p>
            </div>

            <div className="space-y-4">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">🔬</div>
                  <p className="font-semibold text-gray-700">{t('records.diagnosis')}</p>
                </div>
                <p className="text-gray-800 leading-relaxed">{record.diagnosis}</p>
              </div>

              {record.prescription && (
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">💊</div>
                    <p className="font-semibold text-gray-700">{t('records.prescription')}</p>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{record.prescription}</p>
                </div>
              )}

              {record.notes && (
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">📝</div>
                    <p className="font-semibold text-gray-700">{t('records.notes')}</p>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{record.notes}</p>
                </div>
              )}

              <div className="card p-4 bg-gray-50">
                <p className="text-xs text-gray-400 space-y-1">
                  <span className="block">ID dossier : {record.id}</span>
                  <span className="block">Patient : {record.patient_id}</span>
                  <span className="block">Médecin : {record.doctor_id}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}