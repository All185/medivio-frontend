'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function NewAppointmentPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    doctor_id: '',
    scheduled_at: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await api.post('/appointments/', {
        doctor_id:    form.doctor_id,
        scheduled_at: new Date(form.scheduled_at).toISOString(),
      })
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.detail || t('auth.error'))
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

      <main className="max-w-lg mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('appointments.new')}</h2>
          <p className="text-gray-500 text-sm mt-1">Remplissez les informations pour prendre votre rendez-vous</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('appointments.doctorId')}
              </label>
              <input
                type="text"
                required
                value={form.doctor_id}
                onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
                className="input-field"
                placeholder={t('appointments.doctorPlaceholder')}
              />
              <p className="text-xs text-gray-400 mt-1">
                {t('appointments.doctorHint')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('appointments.dateTime')}
              </label>
              <input
                type="datetime-local"
                required
                value={form.scheduled_at}
                onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base"
            >
              {loading ? t('appointments.creating') : t('appointments.confirmButton')}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}