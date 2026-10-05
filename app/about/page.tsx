'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AboutPage() {
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
        </div>
      </header>

      <section className="pt-28 pb-16 px-4 sm:px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'linear-gradient(135deg, #2B5EF8, #009E88)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100">
            {t('about_page.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {t('about_page.hero_title')}<br />
            <span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t('about_page.hero_highlight')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {t('about_page.hero_desc')}
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">{t('about_page.section1_label')}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">{t('about_page.section1_title')}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t('about_page.section1_p1')}</p>
              <p className="text-gray-600 leading-relaxed">{t('about_page.section1_p2')}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100">
              <div className="space-y-4">
                {[
                  { value: t('about_page.stat1_value'), label: t('about_page.stat1_label') },
                  { value: t('about_page.stat2_value'), label: t('about_page.stat2_label') },
                  { value: t('about_page.stat3_value'), label: t('about_page.stat3_label') },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                    <p className="text-3xl font-extrabold mb-1" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{item.value}</p>
                    <p className="text-sm text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">{t('about_page.section2_label')}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">{t('about_page.section2_title')}</h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-lg">{t('about_page.section2_p1')}</p>
          <p className="text-gray-600 leading-relaxed text-lg">{t('about_page.section2_p2')}</p>
        </div>
      </section>

      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">{t('about_page.section3_label')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{t('about_page.section3_title')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('about_page.section3_desc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: t('about_page.f1_title'), desc: t('about_page.f1_desc') },
              { title: t('about_page.f2_title'), desc: t('about_page.f2_desc') },
              { title: t('about_page.f3_title'), desc: t('about_page.f3_desc') },
              { title: t('about_page.f4_title'), desc: t('about_page.f4_desc') },
              { title: t('about_page.f5_title'), desc: t('about_page.f5_desc') },
              { title: t('about_page.f6_title'), desc: t('about_page.f6_desc') },
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">{t('about_page.section4_label')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{t('about_page.section4_title')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: t('about_page.v1_title'), desc: t('about_page.v1_desc') },
              { title: t('about_page.v2_title'), desc: t('about_page.v2_desc') },
              { title: t('about_page.v3_title'), desc: t('about_page.v3_desc') },
              { title: t('about_page.v4_title'), desc: t('about_page.v4_desc') },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-sm">
                <h3 className="font-extrabold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{t('about_page.cta_title')}</h2>
          <p className="text-blue-100 text-lg mb-8">{t('about_page.cta_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
              {t('about_page.cta_start')}
            </button>
            <button onClick={() => router.push('/contact')} className="border-2 border-white text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:bg-white hover:text-blue-600">
              {t('about_page.cta_contact')}
            </button>
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
