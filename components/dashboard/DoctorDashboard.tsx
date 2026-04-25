'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'

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

  const statusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'pending':   return 'bg-yellow-100 text-yellow-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      case 'completed': return 'bg-blue-100 text-blue-700'
      default:          return 'bg-gray-100 text-gray-700'
    }
  }

  const statusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return t('status.confirmed')
      case 'pending':   return t('status.pending')
      case 'cancelled': return t('status.cancelled')
      case 'completed': return t('status.completed')
      default:          return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Medivio</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Dr. {user?.full_name || t('auth.doctor')}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            {t('nav.logout')}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {t('dashboard.consultations')}
        </h2>

        {loading ? (
          <p className="text-gray-500">{t('auth.loading')}</p>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-500">{t('dashboard.noConsultations')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">
                      {new Date(apt.scheduled_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Patient ID : {apt.patient_id.slice(0, 8)}...
                    </p>
                    {apt.notes && (
                      <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg">
                        {apt.notes}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor(apt.status)}`}>
                    {statusLabel(apt.status)}
                  </span>
                </div>

                {apt.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleConfirm(apt.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                    >
                      {t('dashboard.confirm')}
                    </button>
                    <button
                      onClick={() => router.push(`/video/${apt.id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      {t('dashboard.startConsultation')}
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