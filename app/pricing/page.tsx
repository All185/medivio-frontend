'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PLANS = [
  {
    name: 'Starter',
    price: '49',
    desc: 'Idéal pour démarrer en télémédecine',
    color: 'border-gray-200',
    badge: null,
    features: [
      'Téléconsultation vidéo illimitée',
      'Agenda médecin',
      'Ordonnances numériques avec QR code',
      'Rappels email patients',
      'Salle d\'attente virtuelle',
      'Support par email',
    ],
  },
  {
    name: 'Pro',
    price: '99',
    desc: 'Pour les médecins qui veulent aller plus loin',
    color: 'border-blue-500',
    badge: 'Recommandé',
    features: [
      'Tout le plan Starter',
      'Tableau de bord analytique',
      'Téléconsultation différée avec triage IA',
      'Marketplace de spécialistes',
      'Résumé IA des consultations',
      'Mode urgence avec analyse IA',
      'Facturation automatisée Stripe',
      'Support prioritaire',
    ],
  },
  {
    name: 'Clinique',
    price: '299',
    desc: 'Pour les cabinets et cliniques multi-praticiens',
    color: 'border-gray-200',
    badge: null,
    features: [
      'Tout le plan Pro',
      'Multi-praticiens illimités',
      'Suivi maladies chroniques',
      'Mode senior avec reconnaissance vocale',
      'Tiers payant simplifié',
      'White-label disponible',
      'Account manager dédié',
      'Support 24/7',
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
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

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tarifs simples et transparents</h1>
            <p className="text-xl text-gray-500">Sans commission sur vos consultations. Sans frais cachés.</p>
            <div className="inline-block bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mt-4">
              ✅ 3 mois gratuits pour les médecins pilotes
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {PLANS.map((plan, i) => (
              <div key={i} className={`relative rounded-2xl border-2 ${plan.color} p-8 ${plan.badge ? 'shadow-xl shadow-blue-100' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">{plan.badge}</span>
                  </div>
                )}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}€</span>
                    <span className="text-gray-400 mb-2">/mois</span>
                  </div>
                </div>
                <button onClick={() => router.push('/register')} className={`w-full py-3 rounded-xl font-semibold text-sm mb-6 transition-colors ${plan.badge ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-2 border-gray-200 hover:border-blue-300 text-gray-700'}`}>
                  Commencer gratuitement
                </button>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                { q: 'Y a-t-il une commission sur mes consultations ?', r: 'Non. Medivio ne prend aucune commission sur vos honoraires. Vous gardez 100% de vos revenus.' },
                { q: 'Puis-je changer de plan à tout moment ?', r: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment sans frais.' },
                { q: 'Les patients paient-ils un abonnement ?', r: 'Non. L\'accès à Medivio est entièrement gratuit pour les patients.' },
                { q: 'Comment fonctionne la période gratuite ?', r: 'Les 3 premiers mois sont offerts aux médecins pilotes. Aucune carte bancaire requise au départ.' },
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6">
                  <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                  <p className="text-sm text-gray-500">{faq.r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à rejoindre Medivio ?</h2>
            <p className="text-gray-500 mb-6">Rejoignez les premiers médecins pilotes et bénéficiez de 3 mois gratuits.</p>
            <button onClick={() => router.push('/register')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
              Commencer gratuitement
            </button>
          </div>
        </div>
      </div>

      <footer className="py-8 px-6 bg-gray-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-4 cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/logo.png" alt="Medivio" width={28} height={28} />
          <span className="font-bold text-white">Medivio</span>
        </div>
        <p className="text-gray-400 text-sm">2026 Medivio. Tous droits réservés.</p>
        <div className="flex items-center justify-center gap-6 mt-4">
          <button onClick={() => router.push('/legal')} className="text-gray-400 hover:text-white text-xs transition-colors">Mentions légales</button>
          <button onClick={() => router.push('/privacy')} className="text-gray-400 hover:text-white text-xs transition-colors">Confidentialité</button>
        </div>
      </footer>
    </div>
  );
}
