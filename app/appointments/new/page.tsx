'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export default function NewAppointmentPage() {
  const router = useRouter()
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
      setError(err.response?.data?.detail || 'Une erreur est survenue')
    } finally {
      setLoading(false)
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

      {/* Contenu */}
      <main className="max-w-lg mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Nouveau rendez-vous
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID du médecin
              </label>
              <input
                type="text"
                required
                value={form.doctor_id}
                onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="UUID du médecin"
              />
              <p className="text-xs text-gray-400 mt-1">
                Entrez l'identifiant unique du médecin
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date et heure
              </label>
              <input
                type="datetime-local"
                required
                value={form.scheduled_at}
                onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Création en cours...' : 'Confirmer le rendez-vous'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}