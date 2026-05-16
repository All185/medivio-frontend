'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface WaitingEntry {
  id: string
  patient_id: string
  appointment_id: number | null
  symptoms: string | null
  pain_level: number
  medications: string | null
  joined_at: string
  status: string
}

export default function DoctorWaitingRoom() {
  const router = useRouter()
  const { t } = useLanguage()
  const [entries, setEntries] = useState<WaitingEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState<string | null>(null)

  const fetchWaiting = async () => {
    try {
      const res = await api.get('/waiting/list')
      setEntries(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWaiting()
    const interval = setInterval(fetchWaiting, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleAccept = async (entry: WaitingEntry) => {
    setAccepting(entry.id)
    try {
      await api.patch(`/waiting/${entry.id}/status`, { status: 'in_consultation' })
      const appointmentId = res.data?.appointment_id || entry.appointment_id
      if (appointmentId) {
        router.push(`/video/${appointmentId}`)
      } else {
        fetchWaiting()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setAccepting(null)
    }
  }

  const formatWaitTime = (joinedAt: string) => {
    const diff = Math.floor((Date.now() - new Date(joinedAt).getTime()) / 1000)
    const mins = Math.floor(diff / 60)
    const secs = diff % 60
    return `${mins}min ${secs}s`
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
              onClick={() => router.push('/dashboard')}
              className="text-sm text-gray-500 hover:text-blue-600 transition font-medium"
            >
              Retour au tableau de bord
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🏥 Salle d'attente</h2>
            <p className="text-sm text-gray-400 mt-1">Patients en attente de consultation vidéo</p>
          </div>
          <button
            onClick={fetchWaiting}
            className="text-sm text-gray-500 hover:text-blue-600 transition flex items-center gap-1"
          >
            🔄 Actualiser
          </button>
        </div>

        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-pulse text-gray-400">Chargement...</div>
          </div>
        ) : entries.length === 0 ? (
          <div className="card p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-gray-500">Aucun patient en attente pour l'instant.</p>
            <p className="text-xs text-gray-400 mt-2">Actualisation automatique toutes les 10 secondes</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Patient #{entry.patient_id.slice(0, 8)}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ⏱ En attente depuis {formatWaitTime(entry.joined_at)}
                      </p>
                      {entry.symptoms && (
                        <p className="text-sm text-gray-500 mt-1 bg-gray-50 px-3 py-1 rounded-lg">
                          🩺 {entry.symptoms.slice(0, 100)}
                        </p>
                      )}
                      {entry.pain_level && (
                        <p className="text-xs text-gray-400 mt-1">
                          Douleur : {entry.pain_level}/10
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccept(entry)}
                    disabled={accepting === entry.id}
                    className="btn-primary-doctor px-4 py-2 text-sm flex-shrink-0"
                  >
                    {accepting === entry.id ? '⏳ Connexion...' : '🎥 Accepter'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
