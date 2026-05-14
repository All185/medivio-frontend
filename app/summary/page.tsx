'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface SummaryResult {
  diagnosis_summary: string
  recommendations: string
  suggested_prescription: string
  follow_up: string
  full_summary: string
}

export default function SummaryPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<SummaryResult | null>(null)
  const [form, setForm] = useState({
    consultation_notes: '',
    patient_symptoms: '',
    consultation_duration: 30,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await api.post('/summary/generate', form)
      setResult(res.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || t('auth.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Medivio" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            <span className="text-lg font-extrabold text-[#0B1F4B] hidden sm:block">Medivio</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm text-gray-500 hover:text-blue-600 transition font-medium"
            >
              {t('summary.back')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">🤖 {t('summary.title')}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('summary.subtitle')}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {!result ? (
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📝 {t('summary.notes')}
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.consultation_notes}
                  onChange={(e) => setForm({ ...form, consultation_notes: e.target.value })}
                  className="input-field"
                  placeholder={t('summary.notesPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🩺 {t('summary.symptoms')}
                </label>
                <textarea
                  rows={3}
                  value={form.patient_symptoms}
                  onChange={(e) => setForm({ ...form, patient_symptoms: e.target.value })}
                  className="input-field"
                  placeholder={t('summary.symptomsPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ⏱️ {t('summary.duration')} : <span className="text-blue-600 font-bold">{form.consultation_duration} min</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={form.consultation_duration}
                  onChange={(e) => setForm({ ...form, consultation_duration: parseInt(e.target.value) })}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5 min</span>
                  <span>60 min</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⟳</span> {t('summary.generating')}
                  </span>
                ) : `🤖 ${t('summary.generateButton')}`}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">🔬</div>
                <p className="font-semibold text-gray-700">{t('summary.diagnosisSummary')}</p>
              </div>
              <p className="text-gray-800 leading-relaxed">{result.diagnosis_summary}</p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">✅</div>
                <p className="font-semibold text-gray-700">{t('summary.recommendations')}</p>
              </div>
              <p className="text-gray-800 leading-relaxed">{result.recommendations}</p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">💊</div>
                <p className="font-semibold text-gray-700">{t('summary.prescription')}</p>
              </div>
              <p className="text-gray-800 leading-relaxed">{result.suggested_prescription}</p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">📅</div>
                <p className="font-semibold text-gray-700">{t('summary.followUp')}</p>
              </div>
              <p className="text-gray-800 leading-relaxed">{result.follow_up}</p>
            </div>

            <div className="card p-6 bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">📄</div>
                <p className="font-semibold text-gray-700">{t('summary.fullSummary')}</p>
              </div>
              <p className="text-gray-800 leading-relaxed">{result.full_summary}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                {t('summary.newConsultation')}
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 btn-primary py-3"
              >
                {t('analytics.back')}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}