'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function TriageFeaturePage() {
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
          <button onClick={() => router.push('/register')} className="text-sm text-white font-semibold px-4 py-2 rounded-xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
            Commencer gratuitement
          </button>
        </div>
      </header>

      <section className="pt-28 pb-16 px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'linear-gradient(135deg, #2B5EF8, #009E88)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-white text-xs font-bold px-4 py-2 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
            <img src="/icons/robot_full-removebg-preview.png" alt="" style={{width: 20, height: 20, objectFit: 'contain'}} />
            Triage IA
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Votre état de santé évalué<br /><span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>en quelques secondes</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Avant même de consulter un médecin, Medivio évalue cliniquement vos symptômes grâce à l'intelligence artificielle.
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', boxShadow: '0 8px 32px rgba(43,94,248,0.3)'}}>
            Essayer gratuitement
          </button>
        </div>
        <div className="max-w-2xl mx-auto mt-16 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
                <img src="/icons/robot_full-removebg-preview.png" alt="" style={{width: 24, height: 24, objectFit: 'contain'}} />
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 flex-1">
                <p className="text-gray-700 text-sm">Bonjour ! Décrivez vos symptômes et je vais évaluer votre état de santé.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-6 flex-row-reverse">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm">P</div>
              <div className="rounded-2xl rounded-tr-none p-4 flex-1 text-white text-sm" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
                J'ai de la fièvre depuis 2 jours, des maux de tête et une fatigue intense.
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
                <img src="/icons/robot_full-removebg-preview.png" alt="" style={{width: 24, height: 24, objectFit: 'contain'}} />
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">Niveau Urgent</span>
                </div>
                <p className="text-gray-700 text-sm">Je vous recommande une consultation médicale dans les 24h. Voici les spécialistes disponibles...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Étape par étape</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Comment fonctionne le Triage IA ?</h2>
              <div className="space-y-6">
                {[
                  { num: '01', title: 'Décrivez vos symptômes', desc: 'Répondez à quelques questions simples sur vos symptômes, leur durée et leur intensité.' },
                  { num: '02', title: "L'IA analyse votre situation", desc: "Notre algorithme médical évalue votre état clinique en temps réel et identifie les signaux d'alerte." },
                  { num: '03', title: 'Recevez votre orientation', desc: "Vous obtenez immédiatement un niveau d'urgence et une recommandation médicale personnalisée." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
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
                  { label: 'Fièvre', value: '38.5°C', color: 'bg-orange-100 text-orange-600' },
                  { label: 'Maux de tête', value: 'Intense', color: 'bg-red-100 text-red-600' },
                  { label: 'Fatigue', value: 'Modérée', color: 'bg-yellow-100 text-yellow-600' },
                  { label: 'Durée', value: '2 jours', color: 'bg-blue-100 text-blue-600' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <span className="text-gray-700 font-medium text-sm">{item.label}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.color}`}>{item.value}</span>
                  </div>
                ))}
                <div className="bg-white rounded-2xl p-4 border-2 border-orange-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-orange-500">⚠️</span>
                    <span className="font-bold text-orange-600 text-sm">Niveau Urgent</span>
                  </div>
                  <p className="text-gray-500 text-xs">Consultation recommandée dans les 24h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Résultats</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Ce que vous obtenez</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Une analyse clinique complète en quelques secondes, accessible depuis n'importe quel appareil.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: "Niveau d'urgence", desc: "Évaluation précise du degré d'urgence de votre situation médicale : standard, urgent ou critique." },
              { icon: '💊', title: 'Recommandations', desc: 'Des recommandations médicales personnalisées adaptées à votre état de santé et à vos antécédents.' },
              { icon: '🏥', title: 'Orientation médicale', desc: 'Orientation vers le spécialiste ou le recours médical le plus adapté à votre situation clinique.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
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
                  { value: '< 30s', label: "Temps d'analyse" },
                  { value: '94%', label: 'Précision clinique' },
                  { value: '24/7', label: 'Disponibilité' },
                  { value: '100%', label: 'Confidentiel' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 text-center text-white" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
                    <p className="text-3xl font-extrabold mb-1">{stat.value}</p>
                    <p className="text-xs opacity-80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Bénéfices</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Pourquoi le Triage IA est essentiel ?</h2>
              <div className="space-y-4">
                {[
                  "Évitez les erreurs d'orientation médicale coûteuses en temps et en santé",
                  'Consultez au bon moment, avec le bon praticien, pour une prise en charge optimale',
                  "Accédez à une première évaluation clinique à tout moment, même en dehors des heures d'ouverture",
                  "Réduisez l'anxiété liée à l'incertitude grâce à une analyse médicale objective et immédiate",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
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

      <section className="py-16 px-6" style={{background: 'linear-gradient(135deg, #009E88 0%, #2B5EF8 100%)'}}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Prêt à prendre soin de votre santé ?</h2>
          <p className="text-blue-100 text-lg mb-8">Accédez au Triage IA gratuitement et obtenez une évaluation clinique en quelques secondes.</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            Commencer gratuitement
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
