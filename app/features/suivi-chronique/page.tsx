'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function SuiviChroniqueFeaturePage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/logo.png" alt="Medivio" width={32} height={32} style={{ objectFit: 'contain' }} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button onClick={() => router.push('/register')} className="text-sm text-white font-semibold px-4 py-2 rounded-xl bg-blue-600">
            {t('chronic_page.cta_primary')}
          </button>
        </div>
      </header>

      <section className="pt-28 pb-16 px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'linear-gradient(135deg, #2B5EF8, #009E88)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100">
            <img src="/icons/heart_full-removebg-preview.png" alt="" style={{width: 20, height: 20, objectFit: 'contain'}} />
            {t('chronic_page.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {t('chronic_page.hero_title')}<br /><span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t('chronic_page.hero_highlight')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('chronic_page.hero_desc')}
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105 bg-blue-600">
            {t('chronic_page.cta_primary')}
          </button>
        </div>

        <div className="max-w-2xl mx-auto mt-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">{t('chronic_page.dashboard_title')}</h3>
              <span className="text-xs text-gray-400">14/09/2026</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: t('chronic_page.param1'), value: '120/80', unit: t('chronic_page.param1_unit'), icon: '/icons/heart_remove_feature.png' },
                { label: t('chronic_page.param2'), value: '72', unit: t('chronic_page.param2_unit'), icon: '/icons/pinkheart_feature.png' },
                { label: t('chronic_page.param3'), value: '1.1', unit: t('chronic_page.param3_unit'), icon: '/icons/blood_feature.png' },
                { label: t('chronic_page.param4'), value: '37.2', unit: t('chronic_page.param4_unit'), icon: '/icons/temperature_feature.png' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon.startsWith('/') ? (
                      <img src={item.icon} alt="" style={{width:24,height:24,objectFit:"contain"}} />
                    ) : (
                      <span>{item.icon}</span>
                    )}
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900">{item.value} <span className="text-xs font-normal text-gray-400">{item.unit}</span></p>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">✓ {t('chronic_page.normal_label')}</span>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-700 text-sm">{t('chronic_page.all_normal')}</p>
                <p className="text-xs text-green-600">{t('chronic_page.next_check')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">{t('chronic_page.section1_label')}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">{t('chronic_page.section1_title')}</h2>
              <div className="space-y-4">
                {[
                  { icon: '/icons/heart_remove_feature.png', title: t('chronic_page.vital1_title'), desc: t('chronic_page.vital1_desc') },
                  { icon: '/icons/pinkheart_feature.png', title: t('chronic_page.vital2_title'), desc: t('chronic_page.vital2_desc') },
                  { icon: '/icons/blood_feature.png', title: t('chronic_page.vital3_title'), desc: t('chronic_page.vital3_desc') },
                  { icon: '/icons/balance_feature.png', title: t('chronic_page.vital4_title'), desc: t('chronic_page.vital4_desc') },
                  { icon: '/icons/temperature_feature.png', title: t('chronic_page.vital5_title'), desc: t('chronic_page.vital5_desc') },
                  { icon: '/icons/breath_feature.png', title: t('chronic_page.vital6_title'), desc: t('chronic_page.vital6_desc') },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                    {item.icon.startsWith('/') ? (
                      <img src={item.icon} alt="" style={{width:32,height:32,objectFit:"contain"}} />
                    ) : (
                      <span className="text-2xl">{item.icon}</span>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4">{t('chronic_page.chart_title')}</h3>
              <div className="space-y-4">
                {[
                  { label: t('chronic_page.chart1'), values: [118, 120, 122, 119, 121, 120, 118], color: '#009E88' },
                  { label: t('chronic_page.chart2'), values: [70, 72, 68, 74, 71, 69, 72], color: '#2B5EF8' },
                ].map((chart, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                    <p className="text-xs font-semibold text-gray-600 mb-3">{chart.label}</p>
                    <div className="flex items-end gap-1 h-12">
                      {chart.values.map((v, j) => {
                        const min = Math.min(...chart.values);
                        const max = Math.max(...chart.values);
                        const height = ((v - min) / (max - min + 1)) * 100;
                        return (
                          <div key={j} className="flex-1 rounded-t-sm" style={{height: `${Math.max(20, height)}%`, background: chart.color, opacity: j === chart.values.length - 1 ? 1 : 0.5}} />
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{t('chronic_page.chart_start')}</span><span>{t('chronic_page.chart_end')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">{t('chronic_page.section2_label')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{t('chronic_page.section2_title')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('chronic_page.section2_desc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🟢', title: t('chronic_page.level1_title'), desc: t('chronic_page.level1_desc'), color: 'border-green-200 bg-green-50' },
              { icon: '🟡', title: t('chronic_page.level2_title'), desc: t('chronic_page.level2_desc'), color: 'border-yellow-200 bg-yellow-50' },
              { icon: '🔴', title: t('chronic_page.level3_title'), desc: t('chronic_page.level3_desc'), color: 'border-red-200 bg-red-50' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-6 border-2 ${item.color} text-center`}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '6', label: t('chronic_page.stat1_label') },
                  { value: t('chronic_page.stat2_label'), label: '' },
                  { value: '24/7', label: t('chronic_page.stat3_label') },
                  { value: '100%', label: t('chronic_page.stat4_label') },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 text-center bg-white border-2 border-blue-200 shadow-md">
                    <p className="text-2xl font-extrabold mb-1" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">{t('chronic_page.section3_label')}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">{t('chronic_page.section3_title')}</h2>
              <div className="space-y-4">
                {[
                  t('chronic_page.benefit1'),
                  t('chronic_page.benefit2'),
                  t('chronic_page.benefit3'),
                  t('chronic_page.benefit4'),
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

      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">{t('chronic_page.cta_title')}</h2>
          <p className="text-blue-100 text-lg mb-8">{t('chronic_page.cta_desc')}</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            {t('chronic_page.cta_button')}
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
