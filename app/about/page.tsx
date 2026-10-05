'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AboutPage() {
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
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'linear-gradient(135deg, #2B5EF8, #009E88)'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100">
            À propos
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            La télémédecine<br />
            <span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>réinventée pour tous</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Medivio est une plateforme de télémédecine augmentée par l'intelligence artificielle, pensée pour simplifier le parcours de soin — pour les patients comme pour les professionnels de santé.
          </p>
        </div>
      </section>

      {/* Le constat */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Le constat</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Un manque évident dans le paysage médical</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le système de santé évolue, mais les outils mis à disposition des patients et des professionnels n'ont pas toujours suivi. Entre les délais d'attente, les déserts médicaux, les ordonnances égarées et la complexité administrative, un constat s'impose.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Il manquait une plateforme de santé véritablement moderne, accessible à tous et pensée pour aujourd'hui — une solution qui place l'humain au centre, et la technologie à son service.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100">
              <div className="space-y-4">
                {[
                  { stat: '60%', label: 'des patients peinent à obtenir un rendez-vous médical dans les 48h' },
                  { stat: '8M+', label: 'de Français vivent dans un désert médical' },
                  { stat: '30min', label: 'de temps administratif moyen par consultation pour un médecin' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                    <p className="text-3xl font-extrabold mb-1" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{item.stat}</p>
                    <p className="text-sm text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L'origine */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">L'origine</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Né d'une conviction, pas d'une tendance</h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            Medivio est né d'une réflexion personnelle face à ce manque. Pas d'une grande équipe, pas d'un laboratoire de recherche — mais d'une conviction simple : la technologie, et en particulier l'intelligence artificielle, peut transformer l'expérience médicale pour les patients comme pour les praticiens, à condition d'être bien utilisée.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            C'est cette conviction qui a guidé chaque décision de conception de Medivio — de l'interface au triage IA, du suivi chronique à la consultation différée. Une plateforme construite avec rigueur, pensée avec empathie.
          </p>
        </div>
      </section>

      {/* La solution */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">La solution</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Une seule plateforme, pour tous</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Medivio connecte patients et médecins en simplifiant chaque étape du parcours de soin, grâce à l'intelligence artificielle.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Triage IA', desc: 'Évaluation clinique automatisée des symptômes avant même la consultation.' },
              { title: 'Téléconsultation vidéo', desc: 'Une consultation médicale en vidéo HD, sécurisée et chiffrée.' },
              { title: 'Ordonnance numérique', desc: 'Générée, signée et transmise instantanément avec QR code pharmacie.' },
              { title: 'Suivi chronique', desc: 'Paramètres vitaux centralisés avec alertes cliniques intelligentes.' },
              { title: 'Consultation différée', desc: 'Un médecin qualifié répond à votre dossier sous 24h, sans rendez-vous.' },
              { title: '5 langues', desc: 'Français, anglais, espagnol, portugais et arabe — pour tous.' },
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

      {/* Valeurs */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">Nos valeurs</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Ce en quoi nous croyons</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Accessibilité', desc: 'Disponible 24h/24, en 5 langues, depuis n\'importe quel appareil — sans barrière géographique ni financière.' },
              { title: 'Transparence', desc: '0% de commission pour les médecins. Vous gardez 100% de vos honoraires. Aucun frais caché.' },
              { title: 'Confiance', desc: 'Données médicales chiffrées, hébergées de manière sécurisée et conformes au RGPD.' },
              { title: 'Innovation responsable', desc: 'L\'intelligence artificielle au service du soin, jamais à sa place. L\'humain reste au centre.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-sm">
                <h3 className="font-extrabold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Rejoignez Medivio</h2>
          <p className="text-blue-100 text-lg mb-8">Que vous soyez patient ou professionnel de santé, Medivio est fait pour vous.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/register')} className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl">
              Commencer gratuitement
            </button>
            <button onClick={() => router.push('/contact')} className="border-2 border-white text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:bg-white hover:text-blue-600">
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
