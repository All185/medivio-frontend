'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function SuiviChroniqueFeaturePage() {
  const router = useRouter();

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

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'linear-gradient(135deg, #2B5EF8, #009E88)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-white text-xs font-bold px-4 py-2 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
            <img src="/icons/heart_full-removebg-preview.png" alt="" style={{width: 20, height: 20, objectFit: 'contain'}} />
            Suivi chronique
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Prenez en charge votre santé<br /><span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>au quotidien</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Enregistrez vos paramètres biologiques et cliniques, et recevez des alertes automatiques en cas d'anomalie détectée.
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', boxShadow: '0 8px 32px rgba(43,94,248,0.3)'}}>
            Commencer le suivi
          </button>
        </div>

        {/* Illustration hero - tableau de bord de suivi */}
        <div className="max-w-2xl mx-auto mt-16 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Mes constantes du jour</h3>
              <span className="text-xs text-gray-400">14/09/2026</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Tension artérielle', value: '120/80', unit: 'mmHg', status: 'normal', icon: '❤️' },
                { label: 'Fréquence cardiaque', value: '72', unit: 'bpm', status: 'normal', icon: '💓' },
                { label: 'Glycémie', value: '1.1', unit: 'g/L', status: 'normal', icon: '🩸' },
                { label: 'Température', value: '37.2', unit: '°C', status: 'normal', icon: '🌡️' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{item.icon}</span>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900">{item.value} <span className="text-xs font-normal text-gray-400">{item.unit}</span></p>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">✓ Normal</span>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-700 text-sm">Tous vos paramètres sont dans les normes</p>
                <p className="text-xs text-green-600">Prochain suivi recommandé dans 7 jours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Paramètres suivis */}
      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Paramètres vitaux</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Surveillez vos paramètres vitaux</h2>
              <div className="space-y-4">
                {[
                  { icon: '❤️', label: 'Tension artérielle', desc: 'Systolique et diastolique — surveillance des risques cardiovasculaires' },
                  { icon: '💓', label: 'Fréquence cardiaque', desc: 'Rythme cardiaque au repos et en activité' },
                  { icon: '🩸', label: 'Glycémie', desc: 'Taux de glucose sanguin — essentiel pour les patients diabétiques' },
                  { icon: '⚖️', label: 'Poids corporel', desc: 'Suivi de l\'indice de masse corporelle et de l\'évolution pondérale' },
                  { icon: '🌡️', label: 'Température', desc: 'Détection précoce des syndromes infectieux ou inflammatoires' },
                  { icon: '🫁', label: 'Saturation en oxygène', desc: 'SpO2 — surveillance de la fonction respiratoire' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4">Évolution sur 7 jours</h3>
              <div className="space-y-4">
                {[
                  { label: 'Tension systolique', values: [118, 120, 122, 119, 121, 120, 118], color: '#009E88' },
                  { label: 'Fréquence cardiaque', values: [70, 72, 68, 74, 71, 69, 72], color: '#2B5EF8' },
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
                      <span>J-7</span><span>Aujourd'hui</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Alertes intelligentes */}
      <section className="py-16 sm:py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Intelligence artificielle</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Alertes cliniques intelligentes</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">L'IA analyse vos données en temps réel et vous notifie immédiatement en cas de valeur anormale.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🟢', title: 'Niveau standard', desc: 'Vos paramètres sont dans les normes. Continuez votre suivi régulier selon les recommandations de votre médecin.', color: 'border-green-200 bg-green-50' },
              { icon: '🟡', title: 'Niveau modéré', desc: 'Une valeur sort légèrement des normes. Une consultation médicale est conseillée dans les prochains jours.', color: 'border-yellow-200 bg-yellow-50' },
              { icon: '🔴', title: 'Niveau critique', desc: 'Un paramètre vital est anormal. Une prise en charge médicale urgente est recommandée. Votre médecin est alerté.', color: 'border-red-200 bg-red-50' },
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

      {/* Section 3 - Coordination médecin */}
      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '6', label: 'Paramètres suivis' },
                  { value: 'Temps réel', label: 'Analyse IA' },
                  { value: '24/7', label: 'Surveillance' },
                  { value: '100%', label: 'Confidentiel' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 text-center text-white" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
                    <p className="text-2xl font-extrabold mb-1">{stat.value}</p>
                    <p className="text-xs opacity-80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Coordination</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Coordination avec votre médecin</h2>
              <div className="space-y-4">
                {[
                  'Votre praticien accède à vos données de suivi en temps réel pour un accompagnement médical optimal',
                  'Les alertes critiques sont transmises automatiquement à votre médecin référent pour une réactivité maximale',
                  'Partagez votre historique de suivi avec n\'importe quel spécialiste en un clic',
                  'Chaque consultation intègre automatiquement vos dernières mesures pour une prise en charge éclairée',
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

      {/* CTA Final */}
      <section className="py-16 px-6" style={{background: 'linear-gradient(135deg, #009E88 0%, #2B5EF8 100%)'}}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Prenez le contrôle de votre santé</h2>
          <p className="text-blue-100 text-lg mb-8">Commencez votre suivi chronique gratuitement et bénéficiez d'alertes cliniques intelligentes en temps réel.</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            Démarrer mon suivi
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
