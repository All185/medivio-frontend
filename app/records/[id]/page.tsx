'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
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

export default function RecordDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [record, setRecord] = useState<Record | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecord()
  }, [])

  const fetchRecord = async () => {
    try {
      const res = await api.get(`/records/${params.id}`)
      setRecord(res.data)
    } catch (err: any) {
      setError('Dossier introuvable')
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
          onClick={() => router.push('/records')}
          className="text-sm text-gray-500 hover:underline"
        >
          ← Retour aux dossiers
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl">
            {error}
          </div>
        ) : record && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Dossier médical
            </h2>

            <div className="space-y-4">
              {/* Date */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500 mb-1">Date</p>
                <p className="text-gray-800">
                  {new Date(record.created_at).toLocaleDateString('fr-FR', {
                    weekday: 'long', year: 'numeric',
                    month: 'long', day: 'numeric'
                  })}
                </p>
              </div>

              {/* Diagnostic */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500 mb-1">Diagnostic</p>
                <p className="text-gray-800">{record.diagnosis}</p>
              </div>

              {/* Prescription */}
              {record.prescription && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <p className="text-sm font-medium text-gray-500 mb-1">Prescription</p>
                  <p className="text-gray-800">{record.prescription}</p>
                </div>
              )}

              {/* Notes */}
              {record.notes && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <p className="text-sm font-medium text-gray-500 mb-1">Notes</p>
                  <p className="text-gray-800">{record.notes}</p>
                </div>
              )}

              {/* IDs */}
              <div className="bg-gray-100 rounded-2xl p-4 text-xs text-gray-400 space-y-1">
                <p>ID dossier : {record.id}</p>
                <p>ID rendez-vous : {record.appointment_id}</p>
                <p>ID patient : {record.patient_id}</p>
                <p>ID médecin : {record.doctor_id}</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}