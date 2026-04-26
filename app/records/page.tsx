'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function RecordsPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      const res = await api.get('/records/')
      setRecords(res.data)
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
            <span className="text-xl font-extrabold text-[#0B1F4B]">Medivio</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm text-gray-500 hover:text-blue-600 transition font-medium"
            >
              {t('appointments.back')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('records.title')}</h2>
          <p className="text-gray-500 text-sm mt-1">Historique de vos consultations médicales</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-pulse text-gray-400">{t('auth.loading')}</div>
          </div>
        ) : records.length === 0 ? (
          <div className="card p-10 text-center animate-fade-in">
            <div className="text-5xl mb-4">📂</div>
            <p className="text-gray-500">{t('records.noRecords')}</p>
          </div>
        ) : (
          <div className="space-y-3 animate-fade-in">
            {records.map((record) => (
              <div
                key={record.id}
                onClick={() => router.push(`/records/${record.id}`)}
                className="card p-5 cursor-pointer hover:scale-[1.01] transition-transform"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      📋
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {new Date(record.created_at).toLocaleDateString('fr-FR', {
                          weekday: 'long', year: 'numeric',
                          month: 'long', day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        {record.diagnosis.slice(0, 80)}{record.diagnosis.length > 80 ? '...' : ''}
                      </p>
                    </div>
                  </div>
                  <span className="text-blue-600 text-sm font-medium">{t('records.see')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}