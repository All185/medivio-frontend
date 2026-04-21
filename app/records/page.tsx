'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface Record {
  id:             string
  appointment_id: string
  patient_id:     string
  doctor_id:      string
  diagnosis:      string
  prescription:   string | null
  notes:          string | null
  created_at:     string
}

export default function RecordsPage() {
  const router = useRouter()
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      const res = await api.get('/records/')
      setRecords(res.data)
    } catch (err: any) {
      setError('Erreur lors du chargement des dossiers')
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

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Dossiers médicaux
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : records.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-500">Aucun dossier médical pour l'instant.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                onClick={() => router.push(`/records/${record.id}`)}
                className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">
                      {new Date(record.created_at).toLocaleDateString('fr-FR', {
                        weekday: 'long', year: 'numeric',
                        month: 'long', day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {record.diagnosis.slice(0, 100)}
                      {record.diagnosis.length > 100 ? '...' : ''}
                    </p>
                  </div>
                  <span className="text-blue-600 text-sm">Voir →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}