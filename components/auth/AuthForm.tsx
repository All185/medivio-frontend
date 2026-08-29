'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import MedivioLogo from '@/components/MedivioLogo'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'patient',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'register') {
        const res = await api.post('/auth/register', form)
        localStorage.setItem('access_token', res.data.token.access_token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
      } else {
        const res = await api.post('/auth/login', {
          email: form.email,
          password: form.password,
        })
        localStorage.setItem('access_token', res.data.token.access_token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
      }
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.detail || t('auth.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md animate-fade-in">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <MedivioLogo size={72} />
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B1F4B] tracking-tight">Medivio</h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === 'login' ? t('auth.login') : t('auth.register')}
          </p>
        </div>

        {/* Card */}
        <div className="card p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('auth.fullName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    className="input-field"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('auth.role')}
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="input-field"
                  >
                    <option value="patient">{t('auth.patient')}</option>
                    <option value="doctor">{t('auth.doctor')}</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                placeholder="jean@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base"
            >
              {loading ? t('auth.loading') : mode === 'login' ? t('auth.loginButton') : t('auth.registerButton')}
            </button>
          </form>

          {mode === 'login' && (
            <p className="text-center mt-4">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                {t('forgotPassword.link')}
              </a>
            </p>
          )}

          <div className="border-t border-gray-100 mt-5 pt-5">
            <p className="text-center text-sm text-gray-500">
              {mode === 'login' ? (
                <>{t('auth.noAccount')}{' '}
                  <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">{t('auth.registerButton')}</a>
                </>
              ) : (
                <>{t('auth.hasAccount')}{' '}
                  <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">{t('auth.loginButton')}</a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}