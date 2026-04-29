'use client'

import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

function WaitingRoomContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const appointmentId = searchParams.get('id')

  const [step, setStep] = useState<'form' | 'waiting'>('form')
  const [waitTime, setWaitTime] = useState(0)
  const [form, setForm] = useState({
    current_symptoms: '',
    temperature: '',
    blood_pressure: '',
    notes: '',
  })

  const healthTips = [
    { icon: '💧', text: 'Buvez suffisamment d\'eau avant la consultation' },
    { icon: '📋', text: 'Préparez la liste de vos médicaments actuels' },
    { icon: '📱', text: 'Assurez-vous d\'être dans un endroit calme et bien éclairé' },
    { icon: '🩺', text: 'Notez vos symptômes et depuis combien de temps' },
    { icon: '📝', text: 'Préparez vos questions pour le médecin' },
  ]

  useEffect(() => {
    if (step === 'waiting') {
      const interval = setInterval(() => {
        setWaitTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [step])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('waiting')
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
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {step === 'form' ? (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏥</div>
              <h2 className="text-2xl font-bold text-gray-900">Salle d'attente virtuelle</h2>
              <p className="text-gray-500 text-sm mt-2">Préparez votre consultation en remplissant ce formulaire</p>
            </div>

            {/* Conseils santé */}
            <div className="card p-5 mb-6 bg-blue-50 border border-blue-100">
              <h3 className="font-semibold text-blue-700 mb-3">💡 Conseils avant votre consultation</h3>
              <div className="space-y-2">
                {healthTips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-lg">{tip.icon}</span>
                    <p className="text-sm text-blue-600">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 mb-4">📋 Informations pré-consultation</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Symptômes actuels
                  </label>
                  <textarea
                    rows={3}
                    value={form.current_symptoms}
                    onChange={(e) => setForm({ ...form, current_symptoms: e.target.value })}
                    className="input-field"
                    placeholder="Décrivez vos symptômes actuels..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🌡️ Température (°C)
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
                      💓 Tension artérielle
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
                    📝 Notes supplémentaires
                  </label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="input-field"
                    placeholder="Allergies, médicaments en cours, questions pour le médecin..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3 text-base">
                  ✅ Je suis prêt(e) — Rejoindre la salle d'attente
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in text-center">
            <div className="card p-8 mb-6">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre médecin arrive bientôt</h2>
              <p className="text-gray-500 text-sm mb-6">Restez sur cette page. La consultation démarrera automatiquement.</p>

              {/* Timer */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <p className="text-sm text-blue-500 mb-1">Temps d'attente</p>
                <p className="text-4xl font-bold text-blue-600">{formatTime(waitTime)}</p>
              </div>

              {/* Résumé du formulaire */}
              {form.current_symptoms && (
                <div className="card p-4 text-left mb-4 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-700 mb-2">📋 Votre fiche pré-consultation</p>
                  {form.current_symptoms && (
                    <p className="text-sm text-gray-600">🩺 {form.current_symptoms}</p>
                  )}
                  {form.temperature && (
                    <p className="text-sm text-gray-600 mt-1">🌡️ Température : {form.temperature}°C</p>
                  )}
                  {form.blood_pressure && (
                    <p className="text-sm text-gray-600 mt-1">💓 Tension : {form.blood_pressure}</p>
                  )}
                  {form.notes && (
                    <p className="text-sm text-gray-600 mt-1">📝 {form.notes}</p>
                  )}
                </div>
              )}

              {/* Bouton rejoindre consultation */}
              {appointmentId && (
                <button
                  onClick={() => router.push(`/video/${appointmentId}`)}
                  className="btn-primary w-full py-3 text-base"
                >
                  🎥 Rejoindre la consultation vidéo
                </button>
              )}

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                ← Retour au tableau de bord
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