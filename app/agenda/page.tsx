'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface Slot {
  day_of_week: number
  start_time: string
  end_time: string
  is_available: boolean
}

export default function AgendaPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const DAYS = [
    t('agenda.days.0'),
    t('agenda.days.1'),
    t('agenda.days.2'),
    t('agenda.days.3'),
    t('agenda.days.4'),
    t('agenda.days.5'),
    t('agenda.days.6'),
  ]

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slots, setSlots] = useState<Slot[]>(
    DAYS.map((_, i) => ({
      day_of_week: i,
      start_time: '09:00',
      end_time: '17:00',
      is_available: i < 5,
    }))
  )

  useEffect(() => {
    fetchAvailability()
  }, [])

  const fetchAvailability = async () => {
    try {
      const res = await api.get('/agenda/my-availability')
      if (res.data && res.data.length > 0) {
        const newSlots = DAYS.map((_, i) => {
          const existing = res.data.find((s: Slot) => s.day_of_week === i)
          return existing || {
            day_of_week: i,
            start_time: '09:00',
            end_time: '17:00',
            is_available: i < 5,
          }
        })
        setSlots(newSlots)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggle = (index: number) => {
    const newSlots = [...slots]
    newSlots[index].is_available = !newSlots[index].is_available
    setSlots(newSlots)
  }

  const handleTimeChange = (index: number, field: 'start_time' | 'end_time', value: string) => {
    const newSlots = [...slots]
    newSlots[index][field] = value
    setSlots(newSlots)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await api.post('/agenda/availability', { slots })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error(err)
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
              {t('appointments.back')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">📅 {t('agenda.title')}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('agenda.subtitle')}</p>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-xl mb-5 text-sm flex items-center gap-2">
            ✅ {t('agenda.saved')}
          </div>
        )}

        <div className="card p-6 space-y-4">
          {DAYS.map((day, index) => (
            <div key={index} className={`flex items-center gap-4 p-4 rounded-xl transition ${slots[index].is_available ? 'bg-blue-50' : 'bg-gray-50'}`}>
              <div className="w-28">
                <p className="font-semibold text-gray-800 text-sm">{day}</p>
              </div>

              <button
                onClick={() => handleToggle(index)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${slots[index].is_available ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${slots[index].is_available ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>

              {slots[index].is_available ? (
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="time"
                    value={slots[index].start_time}
                    onChange={(e) => handleTimeChange(index, 'start_time', e.target.value)}
                    className="input-field w-32 text-sm"
                  />
                  <span className="text-gray-400">→</span>
                  <input
                    type="time"
                    value={slots[index].end_time}
                    onChange={(e) => handleTimeChange(index, 'end_time', e.target.value)}
                    className="input-field w-32 text-sm"
                  />
                </div>
              ) : (
                <p className="text-gray-400 text-sm flex-1">{t('agenda.notAvailable')}</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary w-full py-3 text-base mt-6"
        >
          {loading ? `⟳ ${t('agenda.saving')}` : `💾 ${t('agenda.saveButton')}`}
        </button>
      </main>
    </div>
  )
}