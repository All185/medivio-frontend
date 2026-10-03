'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function PricingPage() {
  const router = useRouter();

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
            Commencer gratuitement
          </button>
        </div>
      </header>

      <section className="pt-28 pb-16 px-4 sm:px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100">
            Offre de lancement
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Rejoignez Medivio<br />
            <span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>en tant que médecin pilote</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto">
            Medivio est en phase de lancement. Les premiers médecins pilotes bénéficient de <strong className="text-gray-800">3 mois d'accès gratuit</strong> à toutes les fonctionnalités de la plateforme, sans engagement.
          </p>
          <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:scale-105 bg-blue-600">
            Rejoindre le programme pilote
          </button>
        </div>
      </section>

      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Tout est inclus, sans surprise</h2>
            <p className="text-gray-500 text-lg">Les médecins pilotes accèdent à l'intégralité de la plateforme Medivio pendant 3 mois.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Triage IA', desc: 'Analyse automatique des symptômes de vos patients avant la consultation' },
              { title: 'Téléconsultation vidéo', desc: 'Consultations en vidéo HD, sécurisées et chiffrées de bout en bout' },
              { title: 'Ordonnance numérique', desc: 'Générez et signez vos ordonnances numériques avec QR code pharmacie' },
              { title: 'Suivi chronique', desc: 'Accédez aux données de suivi clinique de vos patients en temps réel' },
              { title: 'Consultation différée', desc: 'Répondez aux dossiers médicaux de vos patients sous 24h' },
              { title: 'Tableau de bord', desc: 'Gérez votre agenda, vos consultations et votre facturation' },
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
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Après la période pilote</h2>
          <p className="text-gray-500 text-lg mb-8">À l'issue des 3 mois gratuits, des offres adaptées à votre pratique seront proposées. Les tarifs seront définis en collaboration avec les médecins pilotes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Médecin solo', price: 'À partir de 49€', desc: '/mois' },
              { label: 'Cabinet de groupe', price: 'À partir de 99€', desc: '/mois' },
              { label: 'Clinique / Établissement', price: 'Sur devis', desc: 'personnalisé' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-sm text-center">
                <p className="text-sm font-semibold text-gray-500 mb-2">{item.label}</p>
                <p className="text-2xl font-extrabold mb-1" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{item.price}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">* Les tarifs définitifs seront communiqués à l'issue de la phase pilote. Aucun engagement pendant les 3 mois gratuits.</p>
        </div>
      </section>

      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">Vous êtes une mutuelle, une entreprise ou une collectivité ?</h2>
            <p className="text-gray-500 mb-8">Medivio propose des offres sur mesure pour les organisations souhaitant intégrer la télémédecine dans leurs services. Contactez-nous pour discuter de votre projet.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                'Mutuelles & assurances',
                'Établissements de santé',
                'Collectivités territoriales',
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <span className="text-sm font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => router.push('/register')} className="text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 bg-blue-600">
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Rejoignez les médecins pilotes Medivio</h2>
          <p className="text-blue-100 text-lg mb-8">3 mois gratuits, accès complet, sans engagement. Faites partie des premiers à transformer votre pratique médicale.</p>
          <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
            Rejoindre le programme pilote
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
