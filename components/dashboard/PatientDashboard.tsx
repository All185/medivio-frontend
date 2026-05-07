'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import LoyaltyBadge from '@/components/LoyaltyBadge';
interface Appointment {
  id: string
  doctor_id: string
  scheduled_at: string
  status: string
  notes: string | null
}

export default function PatientDashboard() {
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
            <LoyaltyBadge />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-bold">
                  {user?.full_name?.charAt(0)?.toUpperCase() || 'P'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {user?.full_name || t('auth.patient')}
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

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
          <p className="text-blue-100 text-sm mb-1">{t('dashboard.hello')} 👋</p>
          <h2 className="text-2xl font-bold mb-1">{user?.full_name || t('auth.patient')}</h2>
          <p className="text-blue-100 text-sm">{t('dashboard.appointments')}</p>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '📅', label: t('dashboard.newAppointment'), action: () => router.push('/appointments/new'), color: 'bg-blue-50 text-blue-600' },
            { icon: '🤖', label: t('triage.title'), action: () => router.push('/triage'), color: 'bg-purple-50 text-purple-600' },
            { icon: '📋', label: t('records.title'), action: () => router.push('/records'), color: 'bg-green-50 text-green-600' },
            { icon: '⏳', label: t('waiting.button'), action: () => router.push('/waiting'), color: 'bg-orange-50 text-orange-600' },
            { icon: '🚨', label: t('emergency.title'), action: () => router.push('/emergency'), color: 'bg-red-50 text-red-600' },
            { icon: '🎁', label: t('loyalty.title'), action: () => router.push('/loyalty'), color: 'bg-purple-50 text-purple-600' },
            { icon: '📋', label: t('prescription.my_prescriptions'), action: () => router.push('/prescriptions'), color: 'bg-green-50 text-green-600' },
            { icon: '🧾', label: t('billing.my_invoices'), action: () => router.push('/billing'), color: 'bg-yellow-50 text-yellow-600' },
            { icon: '👴', label: t('senior.dashboard'), action: () => router.push('/senior'), color: 'bg-blue-50 text-blue-800' },
            { icon: '👨‍👩‍👧', label: t('senior.family_title'), action: () => router.push('/senior/family'), color: 'bg-purple-50 text-purple-600' },
            { icon: '🏥', label: t('marketplace.title'), action: () => router.push('/marketplace'), color: 'bg-indigo-50 text-indigo-600' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className={`card p-4 text-center cursor-pointer hover:scale-105 transition-transform ${item.color}`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-xs font-semibold">{item.label}</p>
            </button>
          ))}
        </div>

        {/* Liste des rendez-vous */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">{t('dashboard.appointments')}</h3>
          <button
            onClick={() => router.push('/appointments/new')}
            className="btn-primary text-sm px-4 py-2"
          >
            {t('dashboard.newAppointment')}
          </button>
        </div>

        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-pulse text-gray-400">{t('auth.loading')}</div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="card p-10 text-center animate-fade-in">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500 mb-4">{t('dashboard.noAppointments')}</p>
            <button
              onClick={() => router.push('/appointments/new')}
              className="btn-primary"
            >
              {t('dashboard.takeAppointment')}
            </button>
          </div>
        ) : (
          <div className="space-y-3 animate-fade-in">
            {appointments.map((apt) => (
              <div key={apt.id} className="card p-5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    📅
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {new Date(apt.scheduled_at).toLocaleDateString('fr-FR', {
                        weekday: 'long', year: 'numeric',
                        month: 'long', day: 'numeric',
                      })}
                    </p>
                    {apt.notes && (
                      <p className="text-sm text-gray-400 mt-0.5">{apt.notes.slice(0, 60)}...</p>
                    )}
                  </div>
                </div>
                <span className={statusBadge(apt.status)}>
                  {statusLabel(apt.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}