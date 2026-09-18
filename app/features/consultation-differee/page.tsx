'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function ConsultationDiffereeFeaturePage() {
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
          <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100">
            <img src="/icons/chat_full.png" alt="" style={{width: 20, height: 20, objectFit: 'contain', mixBlendMode: 'multiply'}} />
            Consultation différée
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Une réponse médicale qualifiée<br /><span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>sous 24h, sans rendez-vous</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Transmettez vos symptômes et documents médicaux. Un médecin qualifié examine votre dossier et vous répond dans les meilleurs délais.
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105" style={{background: '#2B5EF8', boxShadow: '0 4px 16px rgba(43,94,248,0.2)'}}>
            Soumettre mon dossier
          </button>
        </div>

        {/* Illustration hero - interface de dossier */}
        <div className="max-w-2xl mx-auto mt-16 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">Nouveau dossier soumis</p>
                <p className="text-xs text-gray-400">Il y a 2 minutes</p>
              </div>
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">En cours d'examen</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Motif de consultation</p>
              <p className="text-sm text-gray-700">Douleurs abdominales récurrentes depuis 3 semaines, accompagnées de nausées matinales. Antécédents de gastrite chronique.</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-50 rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="text-blue-500 text-xs">📄</span>
                <span className="text-xs text-blue-600 font-medium">Résultats_analyse.pdf</span>
              </div>
              <div className="bg-blue-50 rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="text-blue-500 text-xs">📄</span>
                <span className="text-xs text-blue-600 font-medium">Ordonnance_précédente.pdf</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
                  <span className="text-white text-xs">Dr</span>
                </div>
                <span className="text-xs font-semibold text-gray-700">Dr. Thomas Renaud — Gastro-entérologue</span>
              </div>
              <p className="text-sm text-gray-600">Au vu de vos antécédents et des résultats transmis, je vous recommande une fibroscopie oeso-gastro-duodénale. Je vous adresse une ordonnance...</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">✓ Répondu en 18h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Comment ça fonctionne */}
      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Fonctionnement</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Comment soumettre votre dossier ?</h2>
              <div className="space-y-6">
                {[
                  { num: '01', title: 'Décrivez votre motif de consultation', desc: 'Rédigez votre motif de consultation, décrivez vos symptômes et leur évolution, et précisez vos antécédents médicaux.' },
                  { num: '02', title: 'Joignez vos documents médicaux', desc: 'Téléversez vos analyses biologiques, comptes-rendus d\'imagerie ou ordonnances précédentes pour faciliter l\'examen de votre dossier.' },
                  { num: '03', title: 'Recevez votre réponse médicale', desc: 'Un médecin qualifié examine votre dossier clinique et vous adresse un compte-rendu détaillé accompagné, si nécessaire, d\'une ordonnance.' },
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
              <h3 className="font-bold text-gray-900 mb-4">Documents acceptés</h3>
              <div className="space-y-3">
                {[
                  { icon: '🔬', label: 'Résultats d\'analyses biologiques' },
                  { icon: '🩻', label: 'Comptes-rendus d\'imagerie médicale' },
                  { icon: '📋', label: 'Ordonnances et prescriptions antérieures' },
                  { icon: '📝', label: 'Comptes-rendus de consultation' },
                  { icon: '💊', label: 'Listes de traitements en cours' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                    <span className="ml-auto text-green-500">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Pour quelles situations */}
      <section className="py-16 sm:py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Indications</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Pour quelles situations ?</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">La consultation différée est adaptée aux situations médicales non urgentes nécessitant un avis qualifié.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🩺', title: 'Demande d\'avis médical', desc: 'Obtenez un second avis médical qualifié sur un diagnostic ou un traitement prescrit par un autre praticien.' },
              { icon: '🔄', title: 'Renouvellement d\'ordonnance', desc: 'Renouvelez vos ordonnances de traitements chroniques sans vous déplacer, sous réserve de l\'accord du médecin.' },
              { icon: '📊', title: 'Interprétation de résultats', desc: 'Faites interpréter vos analyses biologiques ou vos examens d\'imagerie par un médecin spécialiste.' },
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

      {/* Section 3 - Réponse garantie */}
      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '< 24h', label: 'Délai de réponse' },
                  { value: '100%', label: 'Médecins certifiés' },
                  { value: '24/7', label: 'Soumission dossier' },
                  { value: 'RGPD', label: 'Données protégées' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 text-center bg-white border-2 border-blue-100 shadow-sm">
                    <p className="text-2xl font-extrabold mb-1">{stat.value}</p>
                    <p className="text-xs opacity-80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Garanties</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Une réponse médicale garantie sous 24h</h2>
              <div className="space-y-4">
                {[
                  'Votre dossier est examiné par un médecin diplômé et inscrit au Conseil de l\'Ordre des Médecins',
                  'Vous recevez un compte-rendu médical détaillé accompagné, si nécessaire, d\'une ordonnance numérique',
                  'En cas de situation urgente détectée, vous êtes immédiatement redirigé vers un recours médical adapté',
                  'Toutes vos données médicales sont chiffrées et hébergées sur des serveurs certifiés HDS (Hébergeur de Données de Santé)',
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

      {/* CTA Final */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Consultez sans attendre, sans vous déplacer</h2>
          <p className="text-blue-100 text-lg mb-8">Soumettez votre dossier médical et recevez une réponse qualifiée sous 24h.</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            Soumettre mon dossier
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
