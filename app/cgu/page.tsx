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
            <p>Medivio est une plateforme technologique de télémédecine permettant la mise en relation entre patients et professionnels de santé, la réalisation de consultations médicales par vidéo, l'émission d'ordonnances numériques, le suivi de paramètres cliniques chroniques et la soumission de dossiers médicaux pour avis différé.</p>
            <p className="mt-3">Medivio n'est pas un service d'urgence médicale. En cas d'urgence, composez le <strong>15 (SAMU)</strong>, le <strong>18 (pompiers)</strong> ou le <strong>112</strong>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Accès à la plateforme</h2>
            <p>L'accès à Medivio est réservé aux personnes majeures. L'inscription est gratuite pour les patients. Les professionnels de santé bénéficient d'une période d'essai gratuite de 3 mois, à l'issue de laquelle un abonnement est requis.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Obligations des utilisateurs</h2>
            <p>En utilisant Medivio, vous vous engagez à fournir des informations exactes et à jour, à ne pas usurper l'identité d'un tiers, à ne pas utiliser la plateforme à des fins illicites, à respecter les professionnels de santé et les autres utilisateurs, et à ne pas tenter de compromettre la sécurité de la plateforme.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Responsabilité médicale</h2>
            <p>Medivio est une plateforme technologique et non un prestataire de soins. Les actes médicaux réalisés via la plateforme relèvent de la seule responsabilité des professionnels de santé inscrits, qui exercent sous leur propre responsabilité professionnelle et dans le respect du Code de déontologie médicale.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Intelligence artificielle — résumé de consultation</h2>
            <p className="mb-3">Medivio propose une fonctionnalité de résumé automatique des consultations générée par intelligence artificielle. Ce résumé est un outil d'aide à la documentation médicale à destination exclusive du professionnel de santé.</p>
            <p className="mb-2">Ce résumé est strictement descriptif : il condense les éléments de la consultation sans formuler de diagnostic, sans suggérer de traitement et sans produire d'information médicale nouvelle. Il ne constitue en aucun cas un avis médical, un diagnostic ou une prescription, et ne saurait se substituer au jugement clinique du professionnel de santé.</p>
            <p className="mb-2">Conformément à la position de l'ANSM sur la qualification des logiciels de santé, ce résumé n'est pas qualifié de dispositif médical au sens du règlement (UE) 2017/745 (MDR), sa finalité étant la documentation et non l'aide au diagnostic ou au traitement.</p>
            <p>Le professionnel de santé demeure seul responsable de l'interprétation et de l'utilisation de ce résumé dans le cadre de la prise en charge de son patient.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Données personnelles et données de santé</h2>
            <p className="mb-4">Medivio traite des données personnelles, dont des données de santé au sens de l'article 9 du Règlement (UE) 2016/679 (RGPD). Ces données sont traitées dans le strict respect de la réglementation applicable.</p>

            <h3 className="font-semibold text-gray-800 mb-2">Responsable du traitement</h3>
            <p className="text-sm mb-4">Medivio — contact@medivio.care</p>

            <h3 className="font-semibold text-gray-800 mb-2">Base légale</h3>
            <p className="text-sm mb-4">Le traitement des données de santé est fondé sur le consentement explicite de l'utilisateur (article 9.2.a du RGPD), recueilli lors de l'inscription, ainsi que sur la nécessité de la prise en charge sanitaire (article 9.2.h du RGPD) pour les données échangées lors des consultations. Le traitement des données d'identification et de facturation repose sur l'exécution du contrat (article 6.1.b du RGPD).</p>

            <h3 className="font-semibold text-gray-800 mb-2">Données traitées</h3>
            <p className="text-sm mb-4">Données d'identité (nom, prénom, adresse email, rôle), données de santé (symptômes déclarés, comptes rendus, paramètres cliniques, résumés IA, ordonnances), données techniques (journaux de connexion, identifiants de session) et données de facturation traitées par Stripe (Medivio ne stocke aucun numéro de carte).</p>

            <h3 className="font-semibold text-gray-800 mb-2">Durées de conservation</h3>
            <p className="text-sm mb-4">Les données de santé (comptes rendus, résumés, ordonnances) sont conservées 20 ans à compter de la dernière consultation, conformément à l'article R.1112-7 du Code de la santé publique. Les données d'identité sont conservées 3 ans après la dernière activité. Les données de facturation sont conservées 10 ans (obligation comptable légale). Les journaux techniques sont conservés 12 mois.</p>

            <h3 className="font-semibold text-gray-800 mb-2">Sous-traitants et transferts</h3>
            <p className="text-sm mb-2">Medivio fait appel aux prestataires suivants, liés par un contrat de sous-traitance conforme à l'article 28 du RGPD : Supabase (base de données — AWS eu-west-3 Paris), Vercel (frontend), Render (backend), OpenAI (résumé IA — sans entraînement sur vos données), Daily.co (vidéo), Stripe (paiement) et Resend (emails transactionnels). Les prestataires établis aux États-Unis adhèrent au Data Privacy Framework UE-États-Unis.</p>
            <p className="text-sm mb-4">Medivio est actuellement hébergé sur des infrastructures non certifiées HDS (Hébergeur de Données de Santé). Une migration vers un hébergeur certifié HDS est prévue avant tout déploiement institutionnel.</p>

            <h3 className="font-semibold text-gray-800 mb-2">Vos droits</h3>
            <p className="text-sm mb-2">Conformément au RGPD, vous disposez d'un droit d'accès (art. 15 — y compris aux comptes rendus, art. L.1111-7 CSP), de rectification (art. 16), d'effacement (art. 17, sous réserve des durées légales), de portabilité (art. 20), d'opposition (art. 21) et de retrait du consentement à tout moment sans effet rétroactif.</p>
            <p className="text-sm mb-4">Pour exercer ces droits : <a href="mailto:contact@medivio.care" className="text-blue-600 hover:underline">contact@medivio.care</a>. Vous pouvez également introduire une réclamation auprès de la <strong>CNIL</strong> — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cnil.fr</a>.</p>

            <h3 className="font-semibold text-gray-800 mb-2">Sécurité</h3>
            <p className="text-sm">Medivio met en œuvre des mesures de sécurité adaptées : chiffrement HTTPS/TLS, authentification via Supabase, contrôle d'accès par rôle, journalisation des accès. En cas de violation de données, Medivio notifie la CNIL dans les 72 heures et les personnes concernées dans les meilleurs délais.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Propriété intellectuelle</h2>
            <p>L'ensemble des éléments de la plateforme Medivio (interface, logo, code, contenus) sont la propriété exclusive de Medivio. Toute reproduction ou utilisation non autorisée est interdite.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Suspension et résiliation</h2>
            <p>Medivio se réserve le droit de suspendre ou de résilier l'accès de tout utilisateur ne respectant pas les présentes CGU, sans préavis ni indemnité.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Modification des CGU</h2>
            <p>Medivio se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle par email. La poursuite de l'utilisation de la plateforme après notification vaut acceptation des nouvelles CGU.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Droit applicable</h2>
            <p>Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Contact</h2>
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
