'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function OrdonnanceFeaturePage() {
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
            <img src="/icons/medocs_full-removebg-preview.png" alt="" style={{width: 20, height: 20, objectFit: 'contain'}} />
            Ordonnance numérique
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Vos ordonnances médicales,<br /><span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>toujours disponibles</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Recevez vos ordonnances numériques instantanément après votre consultation et présentez-les en pharmacie via un QR code sécurisé.
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105" style={{background: '#2B5EF8', boxShadow: '0 4px 16px rgba(43,94,248,0.2)'}}>
            Accéder à mes ordonnances
          </button>
        </div>

        {/* Illustration hero - ordonnance avec QR code */}
        <div className="max-w-md mx-auto mt-16 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Ordonnance médicale</p>
                <p className="font-bold text-gray-900">Dr. Sophie Martin</p>
                <p className="text-xs text-gray-500">Médecin généraliste</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Date</p>
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
                    <div key={i} className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
              <div className="flex-1 ml-4">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">✓ Valide</span>
                <p className="text-xs text-gray-400 mt-2">Scannable en pharmacie</p>
                <p className="text-xs text-gray-400">Expire le 14/10/2026</p>
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Comment fonctionne l'ordonnance numérique ?</h2>
              <div className="space-y-6">
                {[
                  { num: '01', title: 'Le praticien génère l\'ordonnance', desc: 'À l\'issue de la consultation, le médecin rédige et signe électroniquement votre ordonnance directement sur la plateforme.' },
                  { num: '02', title: 'Vous la recevez instantanément', desc: 'L\'ordonnance apparaît immédiatement dans votre espace patient, accessible depuis n\'importe quel appareil.' },
                  { num: '03', title: 'Présentez-la en pharmacie', desc: 'Montrez simplement le QR code au pharmacien. Il vérifie l\'authenticité en un scan et délivre vos médicaments.' },
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
                <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600">
                    <span className="text-white text-lg">✍️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Signature électronique</p>
                    <p className="text-xs text-gray-500">Certifiée et authentifiée</p>
                  </div>
                  <span className="ml-auto text-green-500 text-lg">✓</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600">
                    <span className="text-white text-lg">🔒</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">QR code sécurisé</p>
                    <p className="text-xs text-gray-500">Infalsifiable et unique</p>
                  </div>
                  <span className="ml-auto text-green-500 text-lg">✓</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600">
                    <span className="text-white text-lg">🏪</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Accepté en pharmacie</p>
                    <p className="text-xs text-gray-500">Reconnu par les officines</p>
                  </div>
                  <span className="ml-auto text-green-500 text-lg">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Traçabilité */}
      <section className="py-16 sm:py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Historique</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Traçabilité et historique complet</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Accédez à l'intégralité de vos ordonnances passées depuis votre dossier patient, à tout moment.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '📂', title: 'Historique complet', desc: 'Retrouvez toutes vos ordonnances passées classées par date, praticien ou médicament prescrit.' },
              { icon: '📥', title: 'Téléchargement PDF', desc: 'Téléchargez vos ordonnances au format PDF pour les conserver ou les transmettre à un autre professionnel de santé.' },
              { icon: '🔔', title: 'Alertes d\'expiration', desc: 'Recevez une notification avant l\'expiration de vos ordonnances pour ne jamais manquer un renouvellement.' },
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

      {/* Section 3 - Stats */}
      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Avantages</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Fini les ordonnances égarées</h2>
              <div className="space-y-4">
                {[
                  'Vos ordonnances sont stockées de manière sécurisée et accessibles à vie depuis votre espace patient',
                  'Le QR code est unique et infalsifiable — votre pharmacien peut vérifier son authenticité en un instant',
                  'Partagez facilement votre ordonnance avec un proche ou un autre professionnel de santé',
                  'Compatible avec toutes les pharmacies françaises disposant d\'un lecteur QR code',
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
                { value: '0s', label: 'Délai de réception' },
                { value: '100%', label: 'Sécurisé' },
                { value: '∞', label: 'Stockage illimité' },
                { value: '24/7', label: 'Accessible' },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl p-6 text-center bg-white border-2 border-blue-100 shadow-sm">
                  <p className="text-3xl font-extrabold mb-1">{stat.value}</p>
                  <p className="text-xs opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Gérez vos ordonnances simplement</h2>
          <p className="text-blue-100 text-lg mb-8">Créez votre espace patient gratuitement et accédez à vos ordonnances numériques à tout moment.</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            Créer mon espace patient
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
