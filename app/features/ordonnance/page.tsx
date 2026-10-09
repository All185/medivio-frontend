'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function OrdonnanceFeaturePage() {
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
            {t('ordonnance_page.cta_primary')}
          </button>
        </div>
      </header>

      <section className="pt-28 pb-16 px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'linear-gradient(135deg, #2B5EF8, #009E88)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100">
            <img src="/icons/medocs_full-removebg-preview.png" alt="" style={{width: 20, height: 20, objectFit: 'contain'}} />
            {t('ordonnance_page.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {t('ordonnance_page.hero_title')}<br /><span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t('ordonnance_page.hero_highlight')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('ordonnance_page.hero_desc')}
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105 bg-blue-600">
            {t('ordonnance_page.cta_primary')}
          </button>
        </div>
        <div className="max-w-md mx-auto mt-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{t('ordonnance_page.doctor_label')}</p>
                <p className="font-bold text-gray-900">Dr. Sophie Martin</p>
                <p className="text-xs text-gray-500">{t('ordonnance_page.specialty')}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{t('ordonnance_page.date_label')}</p>
                <p className="text-sm font-medium text-gray-700">14/09/2026</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6 space-y-3">
              {[
                { med: 'Amoxicilline 500mg', dosage: '1 cp × 3/jour — 7 jours' },
                { med: 'Paracétamol 1g', dosage: '1 cp × 3/jour si douleur' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3">
                  <p className="font-semibold text-gray-800 text-sm">{item.med}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.dosage}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="bg-gray-100 rounded-xl p-3 w-20 h-20 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-0.5">
                  {Array(16).fill(0).map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${i % 3 === 0 ? 'bg-gray-800' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
              <div className="flex-1 ml-4">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">✓ {t('ordonnance_page.valid_label')}</span>
                <p className="text-xs text-gray-400 mt-2">{t('ordonnance_page.scannable_label')}</p>
                <p className="text-xs text-gray-400">{t('ordonnance_page.expires_label')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div>
              <span className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-blue-600 mb-1 block">{t('ordonnance_page.section1_label')}</span>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-5">{t('ordonnance_page.section1_title')}</h2>
              <div className="space-y-6">
                {[
                  { num: '01', title: t('ordonnance_page.step1_title'), desc: t('ordonnance_page.step1_desc') },
                  { num: '02', title: t('ordonnance_page.step2_title'), desc: t('ordonnance_page.step2_desc') },
                  { num: '03', title: t('ordonnance_page.step3_title'), desc: t('ordonnance_page.step3_desc') },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0 bg-blue-600">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100">
              <div className="space-y-4">
                {[
                  { icon: '/icons/handnotes_feature.png', title: t('ordonnance_page.sig_title'), desc: t('ordonnance_page.sig_desc') },
                  { icon: '/icons/lock_feature.png', title: t('ordonnance_page.qr_title'), desc: t('ordonnance_page.qr_desc') },
                  { icon: '/icons/hospital24_ord_feature.png', title: t('ordonnance_page.pharma_title'), desc: t('ordonnance_page.pharma_desc') },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm">
                      <img src={item.icon} alt="" style={{width:28,height:28,objectFit:"contain"}} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <span className="ml-auto text-green-500 text-lg">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-blue-600 mb-1 block">{t('ordonnance_page.section2_label')}</span>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{t('ordonnance_page.section2_title')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('ordonnance_page.section2_desc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '/icons/files_ord_feature.png', title: t('ordonnance_page.card1_title'), desc: t('ordonnance_page.card1_desc') },
              { icon: '/icons/downloads_feature.png', title: t('ordonnance_page.card2_title'), desc: t('ordonnance_page.card2_desc') },
              { icon: '/icons/ring_feature.png', title: t('ordonnance_page.card3_title'), desc: t('ordonnance_page.card3_desc') },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <div className="mb-4 flex items-center justify-center" style={{height:64}}>
                  <img src={item.icon} alt="" style={{width:56,height:56,objectFit:"contain"}} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div>
              <span className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-blue-600 mb-1 block">{t('ordonnance_page.section3_label')}</span>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-5">{t('ordonnance_page.section3_title')}</h2>
              <div className="space-y-4">
                {[
                  t('ordonnance_page.benefit1'),
                  t('ordonnance_page.benefit2'),
                  t('ordonnance_page.benefit3'),
                  t('ordonnance_page.benefit4'),
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-600">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: t('ordonnance_page.stat1_label') === 'Délai de réception' ? '0s' : '0s', label: t('ordonnance_page.stat1_label') },
                { value: '100%', label: t('ordonnance_page.stat2_label') },
                { value: '∞', label: t('ordonnance_page.stat3_label') },
                { value: '24/7', label: t('ordonnance_page.stat4_label') },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl p-6 text-center bg-white border-2 border-blue-200 shadow-md">
                  <p className="text-3xl font-extrabold mb-1" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{t('ordonnance_page.cta_title')}</h2>
          <p className="text-blue-100 text-lg mb-8">{t('ordonnance_page.cta_desc')}</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            {t('ordonnance_page.cta_button')}
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
