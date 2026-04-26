'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface TriageResult {
  summary:         string
  urgency_level:   string
  recommendations: string
}

export default function TriagePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<TriageResult | null>(null)
  const [form, setForm] = useState({
    appointment_id:  '',
    symptoms:        '',
    duration:        '',
    severity:        5,
    medical_history: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await api.post('/triage/', form)
      setResult(res.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || t('auth.error'))
    } finally {
      setLoading(false)
    }
  }

  const urgencyColor = (level: string) => {
    switch (level) {
      case 'high':   return 'bg-red-50 border-red-200 text-red-700'
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-700'
      case 'low':    return 'bg-green-50 border-green-200 text-green-700'
      default:       return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const urgencyLabel = (level: string) => {
    switch (level) {
      case 'high':   return `🔴 ${t('triage.urgencyHigh')}`
      case 'medium': return `🟡 ${t('triage.urgencyMedium')}`
      case 'low':    return `🟢 ${t('triage.urgencyLow')}`
      default:       return level
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
              {t('triage.back')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('triage.title')}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('triage.subtitle')}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {result && (
          <div className={`border rounded-2xl p-6 mb-6 animate-fade-in ${urgencyColor(result.urgency_level)}`}>
            <h3 className="font-bold text-lg mb-4">{urgencyLabel(result.urgency_level)}</h3>
            <div className="space-y-4">
              <div className="bg-white bg-opacity-60 rounded-xl p-4">
                <p className="font-semibold text-sm mb-1">{t('triage.summary')}</p>
                <p className="text-sm">{result.summary}</p>
              </div>
              <div className="bg-white bg-opacity-60 rounded-xl p-4">
                <p className="font-semibold text-sm mb-1">{t('triage.recommendations')}</p>
                <p className="text-sm">{result.recommendations}</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="btn-primary w-full mt-4"
            >
              {t('video.backToDashboard')}
            </button>
          </div>
        )}

        {!result && (
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('triage.appointmentId')}
                </label>
                <input
                  type="text"
                  required
                  value={form.appointment_id}
                  onChange={(e) => setForm({ ...form, appointment_id: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('triage.symptoms')}
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.symptoms}
                  onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
                  className="input-field"
                  placeholder={t('triage.symptomsPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('triage.duration')}
                </label>
                <input
                  type="text"
                  required
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="input-field"
                  placeholder={t('triage.durationPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('triage.severity')} : <span className="text-blue-600 font-bold">{form.severity}/10</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={form.severity}
                  onChange={(e) => setForm({ ...form, severity: parseInt(e.target.value) })}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{t('triage.mild')}</span>
                  <span>{t('triage.severe')}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('triage.history')}
                </label>
                <textarea
                  rows={2}
                  value={form.medical_history}
                  onChange={(e) => setForm({ ...form, medical_history: e.target.value })}
                  className="input-field"
                  placeholder={t('triage.historyPlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⟳</span> {t('triage.analyzing')}
                  </span>
                ) : t('triage.analyzeButton')}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}