'use client';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';

export default function CguPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/logo.png" alt="Medivio" width={36} height={36} style={{ objectFit: 'contain' }} />
          <span className="font-bold text-gray-900 text-lg hidden sm:block">Medivio</span>
        </div>
        <LanguageSwitcher />
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-gray-400 text-sm mb-12">Dernière mise à jour : octobre 2026</p>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Objet</h2>
            <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme Medivio, disponible sur <span className="text-blue-600">medivio.care</span>. En accédant à la plateforme, vous acceptez sans réserve les présentes CGU.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description du service</h2>
            <p>Medivio est une plateforme technologique de télémédecine permettant :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> La mise en relation entre patients et professionnels de santé</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> La réalisation de consultations médicales par vidéo</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> L'émission d'ordonnances numériques</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Le suivi de paramètres cliniques chroniques</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> La soumission de dossiers médicaux pour avis différé</li>
            </ul>
            <p className="mt-3">Medivio n'est pas un service d'urgence médicale. En cas d'urgence, composez le <strong>15 (SAMU)</strong>, le <strong>18 (pompiers)</strong> ou le <strong>112</strong>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Accès à la plateforme</h2>
            <p>L'accès à Medivio est réservé aux personnes majeures. L'inscription est gratuite pour les patients. Les professionnels de santé bénéficient d'une période d'essai gratuite de 3 mois, à l'issue de laquelle un abonnement est requis.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Obligations des utilisateurs</h2>
            <p>En utilisant Medivio, vous vous engagez à :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Fournir des informations exactes et à jour lors de votre inscription</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Ne pas usurper l'identité d'un tiers</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Ne pas utiliser la plateforme à des fins illicites ou contraires à l'ordre public</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Respecter les professionnels de santé et les autres utilisateurs</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Ne pas tenter de compromettre la sécurité de la plateforme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Responsabilité médicale</h2>
            <p>Medivio est une plateforme technologique et non un prestataire de soins. Les actes médicaux réalisés via la plateforme relèvent de la seule responsabilité des professionnels de santé inscrits, qui exercent sous leur propre responsabilité professionnelle et dans le respect du Code de déontologie médicale.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Propriété intellectuelle</h2>
            <p>L'ensemble des éléments de la plateforme Medivio (interface, logo, code, contenus) sont la propriété exclusive de Medivio. Toute reproduction ou utilisation non autorisée est interdite.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Suspension et résiliation</h2>
            <p>Medivio se réserve le droit de suspendre ou de résilier l'accès de tout utilisateur ne respectant pas les présentes CGU, sans préavis ni indemnité.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Modification des CGU</h2>
            <p>Medivio se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle par email. La poursuite de l'utilisation de la plateforme après notification vaut acceptation des nouvelles CGU.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Droit applicable</h2>
            <p>Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
            <p>Pour toute question relative aux présentes CGU : <a href="mailto:contact@medivio.care" className="text-blue-600 hover:underline">contact@medivio.care</a></p>
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
