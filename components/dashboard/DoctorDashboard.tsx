'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import EmergencyBanner from '@/components/EmergencyBanner';
interface Appointment {
  id: string
  patient_id: string
  scheduled_at: string
  status: string
  notes: string | null
}

export default function DoctorDashboard() {
  const router = useRouter()
  const { t } = useLanguage()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/appointments/')
      setAppointments(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const handleConfirm = async (id: string) => {
    try {
      await api.patch(`/appointments/${id}`, { status: 'confirmed' })
      fetchAppointments()
    } catch (err) {
      console.error(err)
    }
  }

  const statusBadge = (status: string) => {
    const classes: Record<string, string> = {
      confirmed: 'badge badge-confirmed',
      pending:   'badge badge-pending',
      cancelled: 'badge badge-cancelled',
      completed: 'badge badge-completed',
    }
    return classes[status] || 'badge'
  }

  const statusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmed: t('status.confirmed'),
      pending:   t('status.pending'),
      cancelled: t('status.cancelled'),
      completed: t('status.completed'),
    }
    return labels[status] || status
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-bold">
                  {user?.full_name?.charAt(0)?.toUpperCase() || 'D'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                Dr. {user?.full_name || t('auth.doctor')}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-500 transition font-medium"
            >
              {t('nav.logout')}
            </button>
          </div>
        </div>
      </header>
      <EmergencyBanner />
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 text-white">
          <p className="text-indigo-100 text-sm mb-1">{t('dashboard.hello')} 👨‍⚕️</p>
          <h2 className="text-2xl font-bold mb-1">Dr. {user?.full_name || t('auth.doctor')}</h2>
          <p className="text-indigo-100 text-sm">{t('dashboard.consultations')}</p>
        </div>

{/* Bouton analytique */}
<div className="flex justify-end mb-4">
  <button
    onClick={() => router.push('/analytics')}
    className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
    >
    📊 {t('analytics.title')}
  </button>
  <button
  onClick={() => router.push('/agenda')}
  className="btn-primary text-sm px-4 py-2 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
>
📅 {t('agenda.button')}
</button>
<button
  onClick={() => router.push('/emergency/list')}
  className="btn-primary text-sm px-4 py-2 flex items-center gap-2 bg-red-600 hover:bg-red-700"
>
  🚨 {t('emergency.title')}
</button>
</div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total', value: appointments.length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: t('status.pending'), value: appointments.filter(a => a.status === 'pending').length, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: t('status.confirmed'), value: appointments.filter(a => a.status === 'confirmed').length, color: 'text-green-600', bg: 'bg-green-50' },
          ].map((stat, i) => (
            <div key={i} className={`card p-4 text-center ${stat.bg}`}>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Liste consultations */}
        <div className="flex justify-between items-center mb-6">
  <h3 className="text-lg font-bold text-gray-900">{t('dashboard.consultations')}</h3>
  <button
    onClick={() => router.push('/summary')}
    className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
  >
  🤖 {t('summary.title')}
  </button>
</div>

        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-pulse text-gray-400">{t('auth.loading')}</div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="card p-10 text-center animate-fade-in">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500">{t('dashboard.noConsultations')}</p>
          </div>
        ) : (
          <div className="space-y-3 animate-fade-in">
            {appointments.map((apt) => (
              <div key={apt.id} className="card p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {new Date(apt.scheduled_at).toLocaleDateString('fr-FR', {
                          weekday: 'long', year: 'numeric',
                          month: 'long', day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Patient ID : {apt.patient_id.slice(0, 8)}...
                      </p>
                      {apt.notes && (
                        <p className="text-sm text-gray-500 mt-1 bg-gray-50 px-3 py-1 rounded-lg">
                          {apt.notes.slice(0, 80)}...
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={statusBadge(apt.status)}>
                    {statusLabel(apt.status)}
                  </span>
                </div>

                {apt.status === 'pending' && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                    <button
                      onClick={() => handleConfirm(apt.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition"
                    >
                      ✓ {t('dashboard.confirm')}
                    </button>
                    <button
                      onClick={() => router.push(`/video/${apt.id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
                    >
                      🎥 {t('dashboard.startConsultation')}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}