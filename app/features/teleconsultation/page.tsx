'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function TeleconsultationFeaturePage() {
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
            {t('teleconsult_page.cta_primary')}
          </button>
        </div>
      </header>

      <section className="pt-28 pb-16 px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'linear-gradient(135deg, #2B5EF8, #009E88)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100">
            <img src="/icons/video_full-removebg.png" alt="" style={{width: 20, height: 20, objectFit: 'contain'}} />
            {t('teleconsult_page.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {t('teleconsult_page.hero_title')}<br /><span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t('teleconsult_page.hero_highlight')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('teleconsult_page.hero_desc')}
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105 bg-blue-600">
            {t('teleconsult_page.cta_primary')}
          </button>
        </div>
        <div className="max-w-2xl mx-auto mt-8 relative z-10">
          <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white text-xs font-medium">{t('teleconsult_page.consultation_status')}</span>
              </div>
              <span className="text-gray-400 text-xs">12:34</span>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4" style={{minHeight: 200}}>
              <div className="rounded-2xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', minHeight: 150}}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-2xl font-bold">Dr</span>
                  </div>
                  <span className="text-white text-xs font-medium">Dr. Martin</span>
                </div>
              </div>
              <div className="rounded-2xl bg-gray-700 flex items-center justify-center" style={{minHeight: 150}}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-2xl font-bold">P</span>
                  </div>
                  <span className="text-white text-xs font-medium">Patient</span>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 flex items-center justify-center gap-4">
              <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                <img src="/icons/mic_feature.png" alt="" style={{width:28,height:28,objectFit:"contain"}} />
              </button>
              <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                <img src="/icons/nophone_feature.png" alt="" style={{width:28,height:28,objectFit:"contain"}} />
              </button>
              <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                <img src="/icons/cam_feature.png" alt="" style={{width:28,height:28,objectFit:"contain"}} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div>
              <span className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-blue-600 mb-4 block">{t('teleconsult_page.section1_label')}</span>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-5">{t('teleconsult_page.section1_title')}</h2>
              <div className="space-y-6">
                {[
                  { icon: '/icons/teleconsultation_feature.png', title: t('teleconsult_page.feature1_title'), desc: t('teleconsult_page.feature1_desc') },
                  { icon: '/icons/notes_feature.png', title: t('teleconsult_page.feature2_title'), desc: t('teleconsult_page.feature2_desc') },
                  { icon: '/icons/files_feature.png', title: t('teleconsult_page.feature3_title'), desc: t('teleconsult_page.feature3_desc') },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50">
                      {item.icon.startsWith('/') ? (
                        <img src={item.icon} alt="" style={{width:28,height:28,objectFit:"contain"}} />
                      ) : (
                        <span className="text-xl">{item.icon}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4 text-center">{t('teleconsult_page.timeline_title')}</h3>
              <div className="space-y-3">
                {[
                  { step: '1', text: t('teleconsult_page.step1'), done: true },
                  { step: '2', text: t('teleconsult_page.step2'), done: true },
                  { step: '3', text: t('teleconsult_page.step3'), done: true },
                  { step: '4', text: t('teleconsult_page.step4'), done: false },
                  { step: '5', text: t('teleconsult_page.step5'), done: false },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.done ? 'bg-white shadow-sm' : 'bg-white/50'}`}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{background: item.done ? 'linear-gradient(135deg, #009E88, #2B5EF8)' : '#E5E7EB', color: item.done ? 'white' : '#9CA3AF'}}>
                      {item.done ? '✓' : item.step}
                    </div>
                    <span className={`text-sm ${item.done ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{item.text}</span>
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
            <span className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-blue-600 mb-4 block">{t('teleconsult_page.section2_label')}</span>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{t('teleconsult_page.section2_title')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('teleconsult_page.section2_desc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '/icons/house_feature.png', title: t('teleconsult_page.card1_title'), desc: t('teleconsult_page.card1_desc') },
              { icon: '/icons/alarm_feature.png', title: t('teleconsult_page.card2_title'), desc: t('teleconsult_page.card2_desc') },
              { icon: '/icons/smartphone_feature.png', title: t('teleconsult_page.card3_title'), desc: t('teleconsult_page.card3_desc') },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <div className="mb-4 flex items-center justify-center" style={{height:64}}>
                  {item.icon.startsWith('/') ? (
                    <img src={item.icon} alt="" style={{width:56,height:56,objectFit:"contain"}} />
                  ) : (
                    <span className="text-4xl">{item.icon}</span>
                  )}
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
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'HD', label: t('teleconsult_page.stat1_label') },
                  { value: 'E2E', label: t('teleconsult_page.stat2_label') },
                  { value: '< 5min', label: t('teleconsult_page.stat3_label') },
                  { value: 'RGPD', label: t('teleconsult_page.stat4_label') },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 text-center bg-white border-2 border-blue-200 shadow-md">
                    <p className="text-3xl font-extrabold mb-1" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-blue-600 mb-4 block">{t('teleconsult_page.section3_label')}</span>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-5">{t('teleconsult_page.section3_title')}</h2>
              <div className="space-y-4">
                {[
                  t('teleconsult_page.benefit1'),
                  t('teleconsult_page.benefit2'),
                  t('teleconsult_page.benefit3'),
                  t('teleconsult_page.benefit4'),
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
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{t('teleconsult_page.cta_title')}</h2>
          <p className="text-blue-100 text-lg mb-8">{t('teleconsult_page.cta_desc')}</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            {t('teleconsult_page.cta_button')}
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
