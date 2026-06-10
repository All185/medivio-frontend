'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  const features = [
    { icon: '🎥', title: 'Téléconsultation vidéo', desc: 'Consultez votre médecin en vidéo depuis chez vous, en quelques clics.' },
    { icon: '📋', title: 'Consultation différée', desc: 'Envoyez votre dossier médical et recevez une réponse sous 24h.' },
    { icon: '💊', title: 'Ordonnance numérique', desc: 'Recevez vos ordonnances en ligne avec QR code scannable en pharmacie.' },
    { icon: '❤️', title: 'Suivi chronique', desc: 'Suivez vos constantes vitales et recevez des alertes cliniques automatiques.' },
    { icon: '🤖', title: 'Triage IA', desc: 'Notre IA analyse vos symptomes et vous oriente vers le bon specialiste. ' }, 
    { icon: '👴', title: 'Mode senior', desc: 'Interface simplifiée avec reconnaissance vocale pour les personnes âgées.' },
  ];

  const stats = [
    { value: '15+', label: 'Modules médicaux' },
    { value: '5', label: 'Langues disponibles' },
    { value: '24/7', label: 'Disponibilité' },
    { value: '100%', label: 'Sécurisé' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/login')} className="text-sm text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            Se connecter
          </button>
          <button onClick={() => router.push('/register')} className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors">
            Commencer gratuitement
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            🚀 La télémédecine augmentée par l'IA
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Votre santé,
            <span className="text-blue-600"> réinventée</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            Medivio connecte patients et médecins grâce à l'intelligence artificielle. Consultez, suivez vos constantes et recevez vos ordonnances — depuis n'importe où.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button onClick={() => router.push('/register')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg shadow-blue-200">
              Commencer gratuitement
            </button>
            <button onClick={() => router.push('/login')} className="border-2 border-gray-200 hover:border-blue-300 text-gray-700 font-semibold px-8 py-4 rounded-2xl text-lg transition-colors">
              Se connecter
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-white border-y border-gray-100">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-gray-500 text-lg">Une plateforme complète pour patients et médecins</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Medivio */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir Medivio ?</h2>
            <p className="text-gray-500 text-lg">Ce que nos concurrents ne font pas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'IA médicale intégrée', desc: 'Triage automatique, résumé clinique, matching spécialiste — l\'IA travaille pour vous.' },
              { icon: '👴', title: 'Mode senior unique', desc: 'Interface simplifiée avec reconnaissance vocale. Aucun concurrent ne le propose.' },
              { icon: '🌍', title: 'Multilingue', desc: 'Français, anglais, espagnol, portugais, arabe — pour tous vos patients.' },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-b from-blue-50 to-white rounded-2xl border border-blue-100 p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA médecins */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Vous êtes médecin ?</h2>
          <p className="text-blue-100 text-lg mb-8">Rejoignez Medivio et gérez vos consultations, prescriptions et patients depuis une seule plateforme.</p>
          <button onClick={() => router.push('/register')} className="bg-white hover:bg-gray-50 text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Rejoindre Medivio
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image src="/logo.png" alt="Medivio" width={28} height={28} />
          <span className="font-bold text-white">Medivio</span>
        </div>
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
        <div className="flex items-center justify-center gap-6 mt-4">
          <button onClick={() => router.push('/legal')} className="text-gray-400 hover:text-white text-xs transition-colors">Mentions légales</button>
          <button onClick={() => router.push('/privacy')} className="text-gray-400 hover:text-white text-xs transition-colors">Confidentialité</button>
          <button onClick={() => router.push('/pricing')} className="text-gray-400 hover:text-white text-xs transition-colors">Tarifs</button>
        </div>
      </footer>
    </div>
  );
}
