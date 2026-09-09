'use client';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';


export default function RootPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const statsAnim = useScrollAnimation();
  const featuresAnim = useScrollAnimation();
  const whyAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const FEATURES = [
    { icon: '/icons/robot_full-removebg-preview.png', title: t('landing.feature_triage_title'), desc: t('landing.feature_triage_desc') },
    { icon: '/icons/video_full-removebg.png', title: t('landing.feature_video_title'), desc: t('landing.feature_video_desc') },
    { icon: '/icons/medocs_full-removebg-preview.png', title: t('landing.feature_prescription_title'), desc: t('landing.feature_prescription_desc') },
    { icon: '/icons/heart_full-removebg-preview.png', title: t('landing.feature_chronic_title'), desc: t('landing.feature_chronic_desc') },
    { icon: '/icons/chat_full.png', title: t('landing.feature_async_title'), desc: t('landing.feature_async_desc') },
  ];

  const STATS = [
    { value: '15+', label: t('landing.stats_modules') },
    { value: '5', label: t('landing.stats_languages') },
    { value: '24/7', label: t('landing.stats_availability') },
    { value: '100%', label: t('landing.stats_secure') },
  ];

  const WHY_DOCTORS = [
    { icon: '/icons/brain_full-removebg.png', title: t('landing.why_ai_title'), desc: t('landing.why_ai_desc') },
    { icon: '/icons/card_full-removebg.png', title: t('landing.why_commission_title'), desc: t('landing.why_commission_desc') },
    { icon: '/icons/smartphone_full-removebg.png', title: t('landing.why_allinone_title'), desc: t('landing.why_allinone_desc') },
    { icon: '/icons/lock_full-removebg.png', title: t('landing.why_doctor_data_title'), desc: t('landing.why_doctor_data_desc') },
  ];

  const WHY_PATIENTS = [
    { icon: '/icons/lock_full-removebg.png', title: t('landing.why_patient_data_title'), desc: t('landing.why_patient_data_desc') },
    { icon: '/icons/notes_full-removebg.png', title: t('landing.why_triage_title'), desc: t('landing.why_triage_desc') },
    { icon: '/icons/house_full-removebg.png', title: t('landing.why_home_title'), desc: t('landing.why_home_desc') },
    { icon: '/icons/senior_full-removebg-preview.png', title: t('landing.why_senior_title'), desc: t('landing.why_senior_desc') },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <LanguageSwitcher />
      </header>

      <section className="pt-28 pb-12 px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        {/* Cercles décoratifs */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'linear-gradient(135deg, #2B5EF8, #009E88)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block text-white text-xs font-bold px-4 py-2 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
            {t('landing.badge')}
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            {t('landing.hero_title')} <span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t('landing.hero_highlight')}</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('landing.hero_desc')}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', boxShadow: '0 8px 32px rgba(43,94,248,0.3)'}}>
              {t('landing.start_free')}
            </button>
            <button onClick={() => router.push('/login')} className="border-2 border-blue-300 hover:border-blue-500 text-blue-600 font-semibold px-8 py-4 rounded-2xl text-lg transition-all hover:bg-blue-50">
              {t('landing.login')}
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 px-6 bg-white border-y border-gray-100">
        <div ref={statsAnim.ref} className={`max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-on-scroll ${statsAnim.isVisible ? 'visible' : ''}`}>
          {STATS.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div ref={featuresAnim.ref} className={`max-w-4xl mx-auto animate-on-scroll ${featuresAnim.isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{t('landing.features_title')}</h2>
            <p className="text-gray-500 text-xl">{t('landing.features_subtitle')}</p>
          </div>
          {/* Première rangée - 3 modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {FEATURES.slice(0, 3).map((f, i) => (
              <div key={`${locale}-${i}`} className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all shadow-sm">
                <div className="mb-4 flex items-center justify-center" style={{height: 64}}>
                  {f.icon.startsWith('/') ? (
                    <img src={f.icon} alt="" style={{width: 56, height: 56, objectFit: 'contain'}} />
                  ) : (
                    <span className="text-4xl">{f.icon}</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-center">{f.title}</h3>
                <p className="text-sm text-gray-500 text-center">{f.desc}</p>
              </div>
            ))}
          </div>
          {/* Deuxième rangée - 2 modules centrés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {FEATURES.slice(3).map((f, i) => (
              <div key={`${locale}-bottom-${i}`} className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all shadow-sm">
                <div className="mb-4 flex items-center justify-center" style={{height: 64}}>
                  {f.icon.startsWith('/') ? (
                    <img src={f.icon} alt="" style={{width: 56, height: 56, objectFit: 'contain'}} />
                  ) : (
                    <span className="text-4xl">{f.icon}</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-center">{f.title}</h3>
                <p className="text-sm text-gray-500 text-center">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div ref={whyAnim.ref} className={`max-w-4xl mx-auto animate-on-scroll ${whyAnim.isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{t('landing.why_title')}</h2>
            <p className="text-gray-500 text-xl">{t('landing.why_subtitle')}</p>
          </div>

          {/* Pour les médecins */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{t('landing.why_doctors_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_DOCTORS.map((item, i) => (
                <div key={`doc-${locale}-${i}`} className="bg-gradient-to-b from-blue-50 to-white rounded-2xl border border-blue-100 p-6 text-center">
                  <div className="mb-4 flex items-center justify-center" style={{height: 64}}>
                 {item.icon.startsWith('/') ? (
                      <img src={item.icon} alt="" style={{width: 56, height: 56, objectFit: 'contain'}} />
                    ) : (
                      <span className="text-4xl">{item.icon}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pour les patients */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{t('landing.why_patients_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_PATIENTS.map((item, i) => (
                <div key={`pat-${locale}-${i}`} className="bg-gradient-to-b from-green-50 to-white rounded-2xl border border-green-100 p-6 text-center">
                  <div className="mb-4 flex items-center justify-center" style={{height: 64}}>
                    {item.icon.startsWith('/') ? (
                      <img src={item.icon} alt="" style={{width: 56, height: 56, objectFit: 'contain'}} />
                    ) : (
                      <span className="text-4xl">{item.icon}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-blue-600">
        <div ref={ctaAnim.ref} className={`max-w-2xl mx-auto text-center animate-on-scroll ${ctaAnim.isVisible ? 'visible' : ''}`}>
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
