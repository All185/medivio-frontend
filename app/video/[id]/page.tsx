'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import api from '@/lib/api'

export default function VideoRoomPage() {
  const router = useRouter()
  const params = useParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const startCall = async () => {
      try {
        // Récupérer la salle Daily.co depuis le backend
        const res = await api.post('/video/room', {
          appointment_id: params.id,
        })

        const { room_url, token } = res.data

        // Charger Daily.co dynamiquement
        const DailyIframe = (await import('@daily-co/daily-js')).default

        if (containerRef.current) {
          const callFrame = DailyIframe.createFrame(containerRef.current, {
            iframeStyle: {
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '12px',
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          })

          await callFrame.join({ url: room_url, token })

          callFrame.on('left-meeting', () => {
            router.push('/dashboard')
          })
        }
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Erreur de connexion à la salle vidéo')
      } finally {
        setLoading(false)
      }
    }

    startCall()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Medivio — Consultation</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Quitter
        </button>
      </header>

      {/* Salle vidéo */}
      <main className="flex-1 p-4">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-white text-lg">Connexion à la salle...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="bg-red-900 text-red-200 p-6 rounded-2xl text-center">
              <p className="font-medium mb-2">Erreur</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => router.push('/dashboard')}
                className="mt-4 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Retour au tableau de bord
              </button>
            </div>
          </div>
        )}

        <div
          ref={containerRef}
          className="w-full h-full rounded-2xl overflow-hidden"
          style={{ minHeight: '600px' }}
        />
      </main>
    </div>
  )
}