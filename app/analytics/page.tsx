'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface Stats {
  total: number
  confirmed: number
  completed: number
  cancelled: number
  pending: number
  this_month: number
  this_week: number
  completion_rate: number
  cancellation_rate: number
}

export default function AnalyticsPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await api.get('/analytics/doctor/stats')
      setStats(res.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || t('auth.error'))
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
              {t('analytics.back')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">📊 {t('analytics.title')}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('analytics.subtitle')}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-pulse text-gray-400">{t('auth.loading')}</div>
          </div>
        ) : stats && (
          <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: t('analytics.total'), value: stats.total, icon: '📅', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
                { label: t('analytics.thisWeek'), value: stats.this_week, icon: '📆', color: 'bg-purple-50 text-purple-600', border: 'border-purple-100' },
                { label: t('analytics.thisMonth'), value: stats.this_month, icon: '🗓️', color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' },
                { label: t('analytics.completed'), value: stats.completed, icon: '✅', color: 'bg-green-50 text-green-600', border: 'border-green-100' },
              ].map((stat, i) => (
                <div key={i} className={`card p-5 ${stat.color} border ${stat.border}`}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs font-medium mt-1 opacity-70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card p-6">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-gray-700">{t('analytics.completionRate')}</p>
                  <span className="text-2xl font-bold text-green-600">{stats.completion_rate}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full transition-all" style={{ width: `${stats.completion_rate}%` }} />
                </div>
              </div>

              <div className="card p-6">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-gray-700">{t('analytics.cancellationRate')}</p>
                  <span className="text-2xl font-bold text-red-500">{stats.cancellation_rate}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-red-400 h-3 rounded-full transition-all" style={{ width: `${stats.cancellation_rate}%` }} />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-gray-900 mb-4">{t('analytics.byStatus')}</h3>
              <div className="space-y-3">
                {[
                  { label: t('analytics.pending'), value: stats.pending, color: 'bg-yellow-400' },
                  { label: t('analytics.confirmed'), value: stats.confirmed, color: 'bg-blue-500' },
                  { label: t('analytics.completed'), value: stats.completed, color: 'bg-green-500' },
                  { label: t('analytics.cancelled'), value: stats.cancelled, color: 'bg-red-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <p className="text-sm text-gray-600 w-24">{item.label}</p>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full transition-all`}
                        style={{ width: `${stats.total > 0 ? (item.value / stats.total * 100) : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-8">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/summary')}
                className="card p-5 text-left hover:scale-[1.02] transition-transform bg-purple-50 border border-purple-100"
              >
                <div className="text-2xl mb-2">🤖</div>
                <p className="font-semibold text-purple-700">{t('summary.title')}</p>
                <p className="text-xs text-purple-500 mt-1">{t('analytics.generateSummary')}</p>
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="card p-5 text-left hover:scale-[1.02] transition-transform bg-blue-50 border border-blue-100"
              >
                <div className="text-2xl mb-2">📅</div>
                <p className="font-semibold text-blue-700">{t('dashboard.consultations')}</p>
                <p className="text-xs text-blue-500 mt-1">{t('analytics.viewConsultations')}</p>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}