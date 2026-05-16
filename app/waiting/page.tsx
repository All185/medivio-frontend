'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import api from '@/lib/api'

function WaitingRoomContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const appointmentId = searchParams.get('id')

  const [step, setStep] = useState<'form' | 'waiting'>('form')
  const [waitTime, setWaitTime] = useState(0)
  const [entryId, setEntryId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const isInWaitingRoom = useRef(false)
  const [form, setForm] = useState({
    current_symptoms: '',
    temperature: '',
    blood_pressure: '',
    notes: '',
  })

  const healthTips = [
    { icon: '💧', text: t('waiting.tip1') },
    { icon: '📋', text: t('waiting.tip2') },
    { icon: '📱', text: t('waiting.tip3') },
    { icon: '🩺', text: t('waiting.tip4') },
    { icon: '📝', text: t('waiting.tip5') },
  ]

  useEffect(() => {
    if (step === 'waiting') {
      const interval = setInterval(() => {
        setWaitTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [step])

  // Vérifie si le médecin a accepté
  useEffect(() => {
    if (step !== 'waiting' || !entryId || !appointmentId) return
    const interval = setInterval(async () => {
      try {
        const res = await api.get('/waiting/list')
        const entry = res.data.find((e: any) => e.id === entryId)
        if (entry?.status === 'in_consultation') {
          clearInterval(interval)
          router.push(`/video/${appointmentId}`)
        }
      } catch (err) {
        console.error(err)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [step, entryId, appointmentId])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/waiting/join', {
        appointment_id: appointmentId ? parseInt(appointmentId) : null,
        symptoms: form.current_symptoms,
        pain_level: 5,
        medications: form.notes,
      })
      setEntryId(res.data.id)
      isInWaitingRoom.current = true
      setStep('waiting')
    } catch (err) {
      console.error(err)
      setStep('waiting')
    } finally {
      setLoading(false)
    }
  }

  const handleLeave = async () => {
    console.log('handleLeave appelé, isInWaitingRoom:', isInWaitingRoom.current, 'step:', step)
    if (isInWaitingRoom.current) {
      isInWaitingRoom.current = false
      try {
        await api.delete('/waiting/leave')
      } catch (err) {
        console.error(err)
      }
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Medivio" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            <span className="text-lg font-extrabold text-[#0B1F4B] hidden sm:block">Medivio</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleLeave}
              className="text-sm text-gray-500 hover:text-blue-600 transition font-medium"
            >
              Retour au tableau de bord
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {step === 'form' ? (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <img
                src="/logo.png"
                alt="Medivio"
                style={{ width: 80, height: 80, objectFit: 'contain', margin: '0 auto 16px' }}
              />
              <h2 className="text-2xl font-bold text-gray-900">{t('waiting.title')}</h2>
              <p className="text-gray-500 text-sm mt-2">{t('waiting.subtitle')}</p>
            </div>

            <div className="card p-5 mb-6 bg-blue-50 border border-blue-100">
              <h3 className="font-semibold text-blue-700 mb-3">💡 {t('waiting.tips')}</h3>
              <div className="space-y-2">
                {healthTips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-lg">{tip.icon}</span>
                    <p className="text-sm text-blue-600">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-gray-900 mb-4">📋 {t('waiting.form')}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('waiting.symptoms')}
                  </label>
                  <textarea
                    rows={3}
                    value={form.current_symptoms}
                    onChange={(e) => setForm({ ...form, current_symptoms: e.target.value })}
                    className="input-field"
                    placeholder={t('waiting.symptomsPlaceholder')}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🌡️ {t('waiting.temperature')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={form.temperature}
                      onChange={(e) => setForm({ ...form, temperature: e.target.value })}
                      className="input-field"
                      placeholder="37.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      💓 {t('waiting.bloodPressure')}
                    </label>
                    <input
                      type="text"
                      value={form.blood_pressure}
                      onChange={(e) => setForm({ ...form, blood_pressure: e.target.value })}
                      className="input-field"
                      placeholder="120/80"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 {t('waiting.notes')}
                  </label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="input-field"
                    placeholder={t('waiting.notesPlaceholder')}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                  {loading ? '⏳ Connexion...' : `✅ ${t('waiting.ready')}`}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in text-center">
            <div className="card p-8 mb-6">
              <img
                src="/logo.png"
                alt="Medivio"
                style={{ width: 80, height: 80, objectFit: 'contain', margin: '0 auto 16px' }}
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('waiting.doctorComing')}</h2>
              <p className="text-gray-500 text-sm mb-6">{t('waiting.stayOnPage')}</p>

              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <p className="text-sm text-blue-500 mb-1">{t('waiting.waitTime')}</p>
                <p className="text-4xl font-bold text-blue-600">{formatTime(waitTime)}</p>
              </div>

              {form.current_symptoms && (
                <div className="card p-4 text-left mb-4 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-700 mb-2">📋 {t('waiting.preSummary')}</p>
                  {form.current_symptoms && (
                    <p className="text-sm text-gray-600">🩺 {form.current_symptoms}</p>
                  )}
                  {form.temperature && (
                    <p className="text-sm text-gray-600 mt-1">🌡️ {form.temperature}°C</p>
                  )}
                  {form.blood_pressure && (
                    <p className="text-sm text-gray-600 mt-1">💓 {form.blood_pressure}</p>
                  )}
                  {form.notes && (
                    <p className="text-sm text-gray-600 mt-1">📝 {form.notes}</p>
                  )}
                </div>
              )}

              <p className="text-xs text-gray-400 mb-4">
                🔄 Le médecin vous rejoindra automatiquement...
              </p>

              <button
                onClick={handleLeave}
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                {t('waiting.back')}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function WaitingRoomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <WaitingRoomContent />
    </Suspense>
  )
}