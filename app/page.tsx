'use client';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';

export default function RootPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();

  const FEATURES = useMemo(() => [
    { icon: '🧬', title: t('landing.feature_triage_title'), desc: t('landing.feature_triage_desc') },
    { icon: '🎥', title: t('landing.feature_video_title'), desc: t('landing.feature_video_desc') },
    { icon: '📋', title: t('landing.feature_async_title'), desc: t('landing.feature_async_desc') },
    { icon: '💊', title: t('landing.feature_prescription_title'), desc: t('landing.feature_prescription_desc') },
    { icon: '❤️', title: t('landing.feature_chronic_title'), desc: t('landing.feature_chronic_desc') },
    { icon: '👴', title: t('landing.feature_senior_title'), desc: t('landing.feature_senior_desc') },
  ], [locale]);

  const STATS = useMemo(() => [
    { value: '15+', label: t('landing.stats_modules') },
    { value: '5', label: t('landing.stats_languages') },
    { value: '24/7', label: t('landing.stats_availability') },
    { value: '100%', label: t('landing.stats_secure') },
  ], [locale]);

  const WHY = useMemo(() => [
    { icon: '🧠', title: t('landing.why_ai_title'), desc: t('landing.why_ai_desc') },
    { icon: '👴', title: t('landing.why_senior_title'), desc: t('landing.why_senior_desc') },
    { icon: '��', title: t('landing.why_multilingual_title'), desc: t('landing.why_multilingual_desc') },
  ], [locale]);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <LanguageSwitcher />
      </header>

      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            {t('landing.badge')}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t('landing.hero_title')} <span className="text-blue-600">{t('landing.hero_highlight')}</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            {t('landing.hero_desc')}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button onClick={() => router.push('/register')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg shadow-blue-200">
              {t('landing.start_free')}
            </button>
            <button onClick={() => router.push('/login')} className="border-2 border-gray-200 hover:border-blue-300 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg transition-colors">
              {t('landing.login')}
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-white border-y border-gray-100">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('landing.features_title')}</h2>
            <p className="text-gray-500 text-lg">{t('landing.features_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={`${locale}-${i}`} className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('landing.why_title')}</h2>
            <p className="text-gray-500 text-lg">{t('landing.why_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY.map((item, i) => (
              <div key={`${locale}-${i}`} className="bg-gradient-to-b from-blue-50 to-white rounded-2xl border border-blue-100 p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('landing.doctor_title')}</h2>
          <p className="text-blue-100 text-lg mb-8">{t('landing.doctor_desc')}</p>
          <button onClick={() => router.push('/register')} className="bg-white hover:bg-gray-50 text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            {t('landing.doctor_cta')}
          </button>
        </div>
      </section>

      <footer className="py-8 px-6 bg-gray-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/logo.png" alt="Medivio" style={{ width: 28, height: 28, objectFit: "contain" }} />
          <span className="font-bold text-white">Medivio</span>
        </div>
        <p className="text-gray-400 text-sm">{t('landing.footer_rights')}</p>
        <div className="flex items-center justify-center gap-6 mt-4">
          <button onClick={() => router.push('/legal')} className="text-gray-400 hover:text-white text-xs transition-colors">{t('landing.footer_legal')}</button>
          <button onClick={() => router.push('/privacy')} className="text-gray-400 hover:text-white text-xs transition-colors">{t('landing.footer_privacy')}</button>
          <button onClick={() => router.push('/pricing')} className="text-gray-400 hover:text-white text-xs transition-colors">{t('landing.footer_pricing')}</button>
        </div>
      </footer>
    </div>
  );
}
