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
<div className="rounded-2xl p-6 mb-6 flex items-center justify-between"
  style={{ background: 'var(--color-bg-card, #F8F9FB)', border: '1px solid #E5E7EB' }}>
  <div>
    <p className="text-sm text-gray-400 mb-1">
      {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
    </p>
    <h2 className="text-2xl font-bold text-gray-900 mb-1">
      Dr. {user?.full_name || t('auth.doctor')}
    </h2>
    <p className="text-sm text-gray-400">{t('dashboard.consultations')}</p>
  </div>
  <div className="flex items-center gap-8">
    <div className="text-center">
      <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
      <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">Aujourd'hui</p>
      <div className="w-2 h-2 rounded-full bg-blue-500 mx-auto mt-1.5" />
    </div>
    <div className="text-center">
      <p className="text-2xl font-bold text-gray-900">
        {appointments.filter(a => a.status === 'pending').length}
      </p>
      <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">En attente</p>
      <div className="w-2 h-2 rounded-full bg-amber-400 mx-auto mt-1.5" />
    </div>
    <div className="text-center">
      <p className="text-2xl font-bold text-gray-900">
        {appointments.filter(a => a.status === 'confirmed').length}
      </p>
      <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">Confirmés</p>
      <div className="w-2 h-2 rounded-full bg-green-500 mx-auto mt-1.5" />
    </div>
  </div>
</div>

  {/* Grille modules — Actions rapides */}
  <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">Actions rapides</p>
        <div className="grid grid-cols-4 gap-3 mb-4">
        {[
  {
    icon: '🚨',
    title: t('emergency.title'),
    badge: appointments.filter(a => a.status === 'pending').length > 0 ? `${appointments.filter(a => a.status === 'pending').length} actif` : null,
    badgeColor: 'bg-red-50 text-red-700',
    border: 'border-red-200',
    bg: 'bg-red-50',
    route: '/emergency/list',
  },
  {
    icon: '⏳',
    title: "File d'attente",
    badge: appointments.filter(a => a.status === 'pending').length > 0 ? `${appointments.filter(a => a.status === 'pending').length} en attente` : null,
    badgeColor: 'bg-amber-50 text-amber-700',
    border: '',
    bg: 'bg-amber-50',
    route: '/async-care/doctor',
  },
  {
    icon: '🤖',
    title: t('summary.title'),
    badge: 'IA',
    badgeColor: 'bg-blue-50 text-blue-700',
    border: '',
    bg: 'bg-blue-50',
    route: '/summary',
  },
  {
    icon: '💬',
    title: t('async.doctor_title'),
    badge: null,
    badgeColor: '',
    border: '',
    bg: 'bg-teal-50',
    route: '/async-care/doctor',
  },
].map((item, i) => (
            <button
              key={i}
              onClick={() => router.push(item.route)}
              className={`card p-4 text-left flex flex-col gap-2 hover:shadow-md transition-shadow ${item.border ? `border ${item.border}` : ''}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${item.bg}`}>
                {item.icon}
              </div>
              <p className="text-sm font-medium text-gray-800 leading-tight">{item.title}</p>
              {item.badge && (
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grille modules — Outils médecin */}
        <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3 mt-6">Outils médecin</p>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { icon: '📅', title: t('agenda.button'),           bg: 'bg-blue-50',   route: '/agenda' },
            { icon: '📋', title: t('prescription.doctor_title'), bg: 'bg-green-50',  route: '/prescriptions/doctor' },
            { icon: '🧾', title: t('billing.doctor_title'),    bg: 'bg-amber-50',  route: '/billing/doctor' },
            { icon: '📊', title: t('analytics.title'),         bg: 'bg-purple-50', route: '/analytics' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => router.push(item.route)}
              className="card p-4 text-left flex flex-col gap-2 hover:shadow-md transition-shadow"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${item.bg}`}>
                {item.icon}
              </div>
              <p className="text-sm font-medium text-gray-800 leading-tight">{item.title}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: '🏪', title: t('marketplace.title'), bg: 'bg-teal-50', route: '/marketplace' },
            { icon: '❤️', title: t('chronic.doctor_title'), bg: 'bg-red-50', route: '/chronic/doctor' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => router.push(item.route)}
              className="card p-4 text-left flex flex-col gap-2 hover:shadow-md transition-shadow"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${item.bg}`}>
                {item.icon}
              </div>
              <p className="text-sm font-medium text-gray-800 leading-tight">{item.title}</p>
            </button>
          ))}
        </div>

        {/* Liste consultations */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">{t('dashboard.consultations')}</h3>
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