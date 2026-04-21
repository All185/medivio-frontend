'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface Appointment {
  id: string
  doctor_id: string
  scheduled_at: string
  status: string
  notes: string | null
}

export default function PatientDashboard() {
  const router = useRouter()
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

  const statusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'pending':   return 'bg-yellow-100 text-yellow-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      case 'completed': return 'bg-blue-100 text-blue-700'
      default:          return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Medivio</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Bonjour, {user?.full_name || 'Patient'}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mes rendez-vous</h2>
          <button
            onClick={() => router.push('/appointments/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Nouveau rendez-vous
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-500 mb-4">Aucun rendez-vous pour l'instant.</p>
            <button
              onClick={() => router.push('/appointments/new')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Prendre un rendez-vous
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">
                    {new Date(apt.scheduled_at).toLocaleDateString('fr-FR', {
                      weekday: 'long', year: 'numeric',
                      month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                  {apt.notes && (
                    <p className="text-sm text-gray-500 mt-1">{apt.notes}</p>
                  )}
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor(apt.status)}`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}