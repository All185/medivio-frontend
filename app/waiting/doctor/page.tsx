'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
    // Chargement initial
    fetchWaiting()

    // Supabase Realtime — remplace le setInterval de 10s
    const channel = supabase
      .channel('waiting_room_doctor')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'waiting_room',
        },
        () => {
          // Toute modification sur la table → recharge la liste
          fetchWaiting()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const handleAccept = async (entry: WaitingEntry) => {
    setAccepting(entry.id)
    try {
      const res = await api.patch(`/waiting/${entry.id}/status`, { status: 'in_consultation' })
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
              {t('waiting.back')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <img src="/icons/hourglass_full-removebg-preview.png" alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />
              <h2 className="text-2xl font-bold text-gray-900">{t('waiting.doctor_title')}</h2>
            </div>
            <p className="text-sm text-gray-400 mt-1">{t('waiting.doctor_subtitle')}</p>
          </div>
          <button
            onClick={fetchWaiting}
            className="text-sm text-gray-500 hover:text-blue-600 transition flex items-center gap-1"
          >
            {t('waiting.doctor_refresh')}
          </button>
        </div>

        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-pulse text-gray-400">{t('waiting.loading')}</div>
          </div>
        ) : entries.length === 0 ? (
          <div className="card p-10 text-center">
            <img src="/icons/mailbox_full-removebg-preview.png" style={{width:64,height:64,objectFit:'contain',margin:'0 auto 16px'}}/>
            <p className="text-gray-500">{t('waiting.doctor_empty')}</p>
            <p className="text-xs text-gray-400 mt-2">{t('waiting.doctor_auto_refresh')}</p>
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
                        {t('waiting.doctor_patient')} #{entry.patient_id.slice(0, 8)}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t('waiting.doctor_waiting_since')} {formatWaitTime(entry.joined_at)}
                      </p>
                      {entry.symptoms && (
                        <p className="text-sm text-gray-500 mt-1 bg-gray-50 px-3 py-1 rounded-lg">
                          🩺 {entry.symptoms.slice(0, 100)}
                        </p>
                      )}
                      {entry.pain_level && (
                        <p className="text-xs text-gray-400 mt-1">
                          {t('waiting.doctor_pain')} : {entry.pain_level}/10
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccept(entry)}
                    disabled={accepting === entry.id}
                    className="btn-primary-doctor px-4 py-2 text-sm flex-shrink-0"
                  >
                    {accepting === entry.id ? t('waiting.doctor_connecting') : t('waiting.doctor_accept')}
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
