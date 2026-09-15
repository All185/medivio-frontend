'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function TeleconsultationFeaturePage() {
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
            <img src="/icons/video_full-removebg.png" alt="" style={{width: 20, height: 20, objectFit: 'contain'}} />
            Téléconsultation vidéo
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Consultez un médecin<br /><span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>depuis votre domicile</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Plus de salle d'attente. Accédez à une consultation médicale en vidéo, où que vous soyez, quand vous en avez besoin.
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', boxShadow: '0 8px 32px rgba(43,94,248,0.3)'}}>
            Prendre rendez-vous
          </button>
        </div>
        {/* Illustration hero - interface vidéo */}
        <div className="max-w-2xl mx-auto mt-16 relative z-10">
          <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white text-xs font-medium">Consultation en cours</span>
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
              <button className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">🎤</button>
              <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">📵</button>
              <button className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">📹</button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Une consultation équivalente */}
      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Qualité médicale</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Une consultation équivalente à celle en cabinet</h2>
              <div className="space-y-6">
                {[
                  { icon: '🎥', title: 'Vidéo haute définition', desc: "Échange clinique en vidéo HD pour une consultation de qualité équivalente à celle en présentiel." },
                  { icon: '📋', title: 'Ordonnance délivrée', desc: "À l'issue de la consultation, le praticien peut délivrer une ordonnance numérique directement sur votre espace patient." },
                  { icon: '📁', title: 'Dossier médical intégré', desc: "Le médecin accède à votre historique médical pendant la consultation pour une prise en charge optimale." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-blue-50">
                      {item.icon}
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
              <h3 className="font-bold text-gray-900 mb-4 text-center">Déroulement d'une consultation</h3>
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Prise de rendez-vous en ligne', done: true },
                  { step: '2', text: 'Saisie des symptômes et antécédents', done: true },
                  { step: '3', text: 'Connexion à la consultation vidéo', done: true },
                  { step: '4', text: 'Échange clinique avec le praticien', done: false },
                  { step: '5', text: 'Réception de l\'ordonnance numérique', done: false },
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

      {/* Section 2 - Flexible et accessible */}
      <section className="py-16 sm:py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Accessibilité</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Flexible et accessible partout</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Consultez depuis votre domicile, votre lieu de travail ou en déplacement, à l'heure qui vous convient.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🏠', title: 'Depuis votre domicile', desc: "Plus besoin de vous déplacer. Consultez confortablement depuis chez vous, sans contrainte géographique." },
              { icon: '⏰', title: 'À l\'heure qui vous convient', desc: "Des créneaux disponibles tôt le matin, en soirée et le week-end pour s'adapter à votre emploi du temps." },
              { icon: '📱', title: 'Sur tous vos appareils', desc: "Compatible smartphone, tablette et ordinateur. Aucune installation requise, accès direct depuis votre navigateur." },
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

      {/* Section 3 - Sécurisé et confidentiel */}
      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'HD', label: 'Qualité vidéo' },
                  { value: 'E2E', label: 'Chiffrement' },
                  { value: '< 5min', label: 'Attente moyenne' },
                  { value: 'RGPD', label: 'Conformité' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 text-center text-white" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
                    <p className="text-3xl font-extrabold mb-1">{stat.value}</p>
                    <p className="text-xs opacity-80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Sécurité</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Sécurisé et confidentiel</h2>
              <div className="space-y-4">
                {[
                  "Connexion vidéo chiffrée de bout en bout — aucune donnée n'est accessible à des tiers",
                  "Données médicales hébergées sur des serveurs sécurisés, conformes au RGPD et aux normes de santé françaises",
                  "Consultation protégée par authentification double facteur pour garantir votre identité",
                  "Aucun enregistrement de la consultation sans consentement explicite du patient et du praticien",
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
          <h2 className="text-3xl font-extrabold text-white mb-4">Votre médecin à portée d'écran</h2>
          <p className="text-blue-100 text-lg mb-8">Prenez rendez-vous en quelques clics et consultez depuis votre domicile dès aujourd'hui.</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            Prendre rendez-vous
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
