'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import MedivioLogo from '@/components/MedivioLogo'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

export default function GetStartedPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Image src="/logo.png" alt="Medivio" width={32} height={32} style={{ objectFit: 'contain' }} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <LanguageSwitcher />
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-5">
            <MedivioLogo size={64} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {t('get_started.title')}
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            {t('get_started.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Carte Patient */}
          <button
            onClick={() => router.push('/register')}
            className="group bg-white border-2 border-gray-100 hover:border-teal-400 rounded-3xl p-8 text-left shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col gap-4"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl"
              style={{ background: 'linear-gradient(135deg, #009E88, #00C9A7)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                {t('get_started.patient_title')}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('get_started.patient_desc')}
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-teal-600 font-semibold text-sm">
              {t('get_started.patient_cta')}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </div>
          </button>

          {/* Carte Médecin / Structure */}
          <button
            onClick={() => router.push('/demande-acces')}
            className="group bg-white border-2 border-gray-100 hover:border-blue-500 rounded-3xl p-8 text-left shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col gap-4"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl"
              style={{ background: 'linear-gradient(135deg, #2B5EF8, #4F7FFF)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                {t('get_started.doctor_title')}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('get_started.doctor_desc')}
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-blue-600 font-semibold text-sm">
              {t('get_started.doctor_cta')}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>

        {/* Lien connexion */}
        <p className="mt-8 text-sm text-gray-500">
          {t('get_started.has_account')}{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:text-blue-700 font-semibold underline-offset-2 hover:underline"
          >
            {t('auth.loginButton')}
          </button>
        </p>
      </main>
    </div>
  )
}
