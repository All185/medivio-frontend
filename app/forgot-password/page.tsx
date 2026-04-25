'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://medivio-frontend.vercel.app/reset-password',
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-end p-4">
        <LanguageSwitcher />
      </div>

      <div className="flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

          {success ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('forgotPassword.successTitle')}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {t('forgotPassword.successMessage')}
              </p>
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {t('forgotPassword.backToLogin')}
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                {t('forgotPassword.title')}
              </h1>
              <p className="text-gray-500 text-sm mb-6 text-center">
                {t('forgotPassword.subtitle')}
              </p>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('forgotPassword.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="jean@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? t('forgotPassword.sending') : t('forgotPassword.sendButton')}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-4">
                <a href="/login" className="text-blue-600 hover:underline">
                  {t('forgotPassword.backToLogin')}
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}