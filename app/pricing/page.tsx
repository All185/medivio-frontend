'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function PricingPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/logo.png" alt="Medivio" width={32} height={32} style={{ objectFit: 'contain' }} />
          <span className="font-bold text-gray-900 text-lg hidden sm:block">Medivio</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button onClick={() => router.push('/register')} className="hidden sm:block text-sm text-white font-semibold px-4 py-2 rounded-xl bg-blue-600">
            {t('landing.start_free')}
          </button>
        </div>
      </header>

      <section className="pt-28 pb-16 px-4 sm:px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100">
            {t('pricing_page.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {t('pricing_page.hero_title')}<br />
            <span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t('pricing_page.hero_highlight')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto">
            {t('pricing_page.hero_desc')}
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105 bg-blue-600">
            {t('pricing_page.cta_pilot')}
          </button>
        </div>
      </section>

      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{t('pricing_page.included_title')}</h2>
            <p className="text-gray-500 text-lg">{t('pricing_page.included_desc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: t('pricing_page.f1_title'), desc: t('pricing_page.f1_desc') },
              { title: t('pricing_page.f2_title'), desc: t('pricing_page.f2_desc') },
              { title: t('pricing_page.f3_title'), desc: t('pricing_page.f3_desc') },
              { title: t('pricing_page.f4_title'), desc: t('pricing_page.f4_desc') },
              { title: t('pricing_page.f5_title'), desc: t('pricing_page.f5_desc') },
              { title: t('pricing_page.f6_title'), desc: t('pricing_page.f6_desc') },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{t('pricing_page.after_title')}</h2>
          <p className="text-gray-500 text-lg mb-8">{t('pricing_page.after_desc')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              t('pricing_page.plan1'),
              t('pricing_page.plan2'),
              t('pricing_page.plan3'),
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-sm text-center">
                <p className="text-sm font-semibold text-gray-700">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">{t('pricing_page.after_note')}</p>
        </div>
      </section>

      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">{t('pricing_page.b2b_title')}</h2>
            <p className="text-gray-500 mb-8">{t('pricing_page.b2b_desc')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                t('pricing_page.b2b1'),
                t('pricing_page.b2b2'),
                t('pricing_page.b2b3'),
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <span className="text-sm font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => router.push('/contact')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 bg-blue-600">
              {t('pricing_page.b2b_cta')}
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{t('pricing_page.cta_title')}</h2>
          <p className="text-blue-100 text-lg mb-8">{t('pricing_page.cta_desc')}</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            {t('pricing_page.cta_button')}
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
