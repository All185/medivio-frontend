'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CguPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-700">← Retour</button>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-gray-400 text-sm mb-12">Dernière mise à jour : janvier 2026</p>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Objet</h2>
            <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme Medivio, accessible à l'adresse medivio.fr. En utilisant Medivio, vous acceptez sans réserve les présentes CGU.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description du service</h2>
            <p>Medivio est une plateforme numérique de télémédecine permettant :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> La mise en relation entre patients et professionnels de santé</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> La réalisation de téléconsultations vidéo et différées</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> La délivrance d'ordonnances numériques</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Le suivi de constantes vitales</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> La gestion administrative des consultations médicales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Inscription et compte utilisateur</h2>
            <p>L'inscription sur Medivio est gratuite pour les patients. Les professionnels de santé bénéficient d'une période d'essai gratuite de 3 mois, puis d'un abonnement mensuel selon le plan choisi.</p>
            <p className="mt-3">L'utilisateur s'engage à fournir des informations exactes lors de son inscription et à maintenir la confidentialité de ses identifiants de connexion.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Obligations des professionnels de santé</h2>
            <p>Les professionnels de santé utilisant Medivio s'engagent à :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Être inscrits au Conseil National de l'Ordre compétent</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Respecter le Code de déontologie médicale</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Ne prescrire que dans le cadre de leurs compétences</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Respecter le secret médical</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Disposer d'une assurance responsabilité civile professionnelle</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Obligations des patients</h2>
            <p>Les patients s'engagent à :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Fournir des informations médicales exactes et complètes</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Ne pas utiliser Medivio en cas d'urgence vitale (appeler le 15)</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Respecter les rendez-vous fixés avec les médecins</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Ne pas partager leur compte avec des tiers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Tarification et paiement</h2>
            <p>Les tarifs des abonnements médecins sont disponibles sur la page <button onClick={() => router.push('/pricing')} className="text-blue-600 hover:underline">Tarifs</button>. Les paiements sont traités de manière sécurisée par Stripe. Medivio ne prélève aucune commission sur les honoraires médicaux.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation de responsabilité</h2>
            <p>Medivio est une plateforme technologique et ne peut être tenue responsable des actes médicaux réalisés par les professionnels de santé inscrits. En aucun cas, Medivio ne se substitue à une consultation médicale en présentiel lorsque celle-ci est nécessaire.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Modification des CGU</h2>
            <p>Medivio se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email de toute modification substantielle. La poursuite de l'utilisation de la plateforme vaut acceptation des nouvelles CGU.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Droit applicable</h2>
            <p>Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
            <p>Pour toute question : <a href="mailto:contact@medivio.fr" className="text-blue-600 hover:underline">contact@medivio.fr</a></p>
          </section>
        </div>
      </div>

      <footer className="py-8 px-6 bg-gray-900 text-center mt-16">
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => router.push('/legal')} className="text-gray-400 hover:text-white text-xs transition-colors">Mentions légales</button>
          <button onClick={() => router.push('/privacy')} className="text-gray-400 hover:text-white text-xs transition-colors">Confidentialité</button>
          <button onClick={() => router.push('/cgu')} className="text-gray-400 hover:text-white text-xs transition-colors">CGU</button>
        </div>
      </footer>
    </div>
  );
}
