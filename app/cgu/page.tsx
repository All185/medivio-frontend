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
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Intelligence artificielle — résumé de consultation</h2>
            <p>Medivio propose une fonctionnalité de résumé automatique des consultations générée par intelligence artificielle. Ce résumé est un outil d'aide à la documentation médicale à destination exclusive du professionnel de santé.</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Ce résumé est <strong>strictement descriptif</strong> : il condense les éléments de la consultation sans formuler de diagnostic, sans suggérer de traitement et sans produire d'information médicale nouvelle.</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Il ne constitue <strong>en aucun cas un avis médical, un diagnostic ou une prescription</strong>, et ne saurait se substituer au jugement clinique du professionnel de santé.</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Conformément à la position de l'ANSM sur la qualification des logiciels de santé, ce résumé n'est pas qualifié de dispositif médical au sens du règlement (UE) 2017/745 (MDR), sa finalité étant la documentation et non l'aide au diagnostic ou au traitement.</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Le professionnel de santé demeure seul responsable de l'interprétation et de l'utilisation de ce résumé dans le cadre de la prise en charge de son patient.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Données personnelles et données de santé</h2>
            <p className="mb-3">Medivio traite des données personnelles, dont des données de santé au sens de l'article 9 du Règlement (UE) 2016/679 (RGPD). Ces données sont traitées dans le strict respect de la réglementation applicable.</p>

            <h3 className="font-semibold text-gray-800 mb-2">Responsable du traitement</h3>
            <p className="text-sm mb-3">Medivio — contact@medivio.care</p>

            <h3 className="font-semibold text-gray-800 mb-2">Base légale</h3>
            <p className="text-sm mb-3">Le traitement des données de santé est fondé sur le consentement explicite de l'utilisateur (article 9.2.a du RGPD), recueilli lors de l'inscription, ainsi que sur la nécessité de la prise en charge sanitaire (article 9.2.h du RGPD) pour les données échangées lors des consultations. Le traitement des données d'identification et de facturation repose sur l'exécution du contrat (article 6.1.b du RGPD).</p>

            <h3 className="font-semibold text-gray-800 mb-2">Données traitées</h3>
            <ul className="mt-1 mb-3 space-y-1 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données d'identité : nom, prénom, adresse email, rôle (patient ou médecin)</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données de santé : symptômes déclarés, comptes rendus de consultation, paramètres cliniques saisis, résumés générés par IA, ordonnances</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données techniques : journaux de connexion, identifiants de session</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données de facturation : informations de paiement traitées par Stripe (Medivio ne stocke aucun numéro de carte)</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">Durées de conservation</h3>
            <ul className="mt-1 mb-3 space-y-1 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données de santé (comptes rendus, résumés, ordonnances) : <strong>20 ans</strong> à compter de la dernière consultation, par alignement sur l'article R.1112-7 du Code de la santé publique et conformément aux recommandations du Conseil national de l'Ordre des médecins</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données d'identité et de compte : durée de vie du compte, puis 3 ans après la dernière activité</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données de facturation : 10 ans à compter de l'émission (obligation comptable légale)</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Journaux techniques : 12 mois</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">Sous-traitants et transferts</h3>
            <p className="text-sm mb-2">Medivio fait appel aux prestataires suivants, liés par un contrat de sous-traitance conforme à l'article 28 du RGPD :</p>
            <ul className="mt-1 mb-3 space-y-1 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Supabase</strong> (base de données, authentification) — hébergement AWS eu-west-3 (Paris)</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Vercel</strong> (hébergement frontend) — États-Unis, adhérent au DPF UE-États-Unis</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Render</strong> (hébergement backend) — États-Unis, adhérent au DPF UE-États-Unis</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>OpenAI</strong> (résumé IA) — États-Unis, adhérent au DPF UE-États-Unis ; traitement limité aux données de la consultation, sans entraînement sur vos données</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Daily.co</strong> (vidéo) — États-Unis, adhérent au DPF UE-États-Unis</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Stripe</strong> (paiement) — États-Unis, adhérent au DPF UE-États-Unis</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Resend</strong> (emails transactionnels) — États-Unis, adhérent au DPF UE-États-Unis</li>
            </ul>
            <p className="text-sm mb-3">Medivio est actuellement hébergé sur des infrastructures non certifiées HDS (Hébergeur de Données de Santé). Une migration vers un hébergeur certifié HDS est prévue avant tout déploiement institutionnel.</p>

            <h3 className="font-semibold text-gray-800 mb-2">Vos droits</h3>
            <p className="text-sm mb-2">Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données :</p>
            <ul className="mt-1 mb-3 space-y-1 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Droit d'accès</strong> (art. 15 RGPD) : obtenir une copie de l'ensemble de vos données personnelles et de santé, y compris les comptes rendus de consultation conformément à l'article L.1111-7 du Code de la santé publique</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Droit de rectification</strong> (art. 16 RGPD) : corriger vos données inexactes, sans altérer la traçabilité des éléments médicaux</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Droit à l'effacement</strong> (art. 17 RGPD) : demander la suppression de vos données, sous réserve des durées de conservation légales applicables aux données de santé</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Droit à la portabilité</strong> (art. 20 RGPD) : recevoir vos données dans un format structuré, couramment utilisé et lisible par machine</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Droit d'opposition</strong> (art. 21 RGPD) : vous opposer au traitement de vos données, sauf obligation légale</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> <strong>Droit de retirer votre consentement</strong> à tout moment, sans que cela ne remette en cause la licéité des traitements effectués avant le retrait</li>
            </ul>
            <p className="text-sm mb-3">Pour exercer ces droits, adressez votre demande à <a href="mailto:contact@medivio.care" className="text-blue-600 hover:underline">contact@medivio.care</a>. Vous disposez également du droit d'introduire une réclamation auprès de la <strong>CNIL</strong> — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cnil.fr</a>.</p>

            <h3 className="font-semibold text-gray-800 mb-2">Sécurité</h3>
            <p className="text-sm">Medivio met en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données : chiffrement des communications (HTTPS/TLS), authentification sécurisée via Supabase, contrôle d'accès par rôle, journalisation des accès. En cas de violation de données susceptible d'engendrer un risque pour vos droits et libertés, Medivio s'engage à notifier la CNIL dans les 72 heures et les personnes concernées dans les meilleurs délais.</p>
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
