'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface TriageResult {
  summary:         string
  urgency_level:   string
  recommendations: string
}

export default function TriagePage() {
  const router = useRouter()
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
      setError(err.response?.data?.detail || 'Une erreur est survenue')
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
      case 'high':   return '🔴 Urgence élevée'
      case 'medium': return '🟡 Urgence modérée'
      case 'low':    return '🟢 Urgence faible'
      default:       return level
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Medivio</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-gray-500 hover:underline"
        >
          ← Retour au tableau de bord
        </button>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Triage IA
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Décrivez vos symptômes avant la consultation. L'IA préparera un résumé pour votre médecin.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Résultat IA */}
        {result && (
          <div className={`border rounded-2xl p-6 mb-6 ${urgencyColor(result.urgency_level)}`}>
            <h3 className="font-bold text-lg mb-3">
              {urgencyLabel(result.urgency_level)}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-sm">Résumé clinique</p>
                <p className="text-sm mt-1">{result.summary}</p>
              </div>
              <div>
                <p className="font-medium text-sm">Recommandations</p>
                <p className="text-sm mt-1">{result.recommendations}</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Retour au tableau de bord
            </button>
          </div>
        )}

        {/* Formulaire */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID du rendez-vous
                </label>
                <input
                  type="text"
                  required
                  value={form.appointment_id}
                  onChange={(e) => setForm({ ...form, appointment_id: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="UUID du rendez-vous"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Décrivez vos symptômes
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.symptoms}
                  onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Fièvre, maux de tête, fatigue..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Depuis combien de temps ?
                </label>
                <input
                  type="text"
                  required
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 3 jours, 1 semaine..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sévérité : {form.severity}/10
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={form.severity}
                  onChange={(e) => setForm({ ...form, severity: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Légère</span>
                  <span>Sévère</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Antécédents médicaux (optionnel)
                </label>
                <textarea
                  rows={2}
                  value={form.medical_history}
                  onChange={(e) => setForm({ ...form, medical_history: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Diabète, hypertension..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Analyse en cours...' : 'Analyser mes symptômes'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}