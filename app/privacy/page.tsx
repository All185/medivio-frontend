'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Politique de confidentialité</h1>
        <p className="text-gray-400 text-sm mb-12">Dernière mise à jour : janvier 2026</p>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Données collectées</h2>
            <p>Dans le cadre de l'utilisation de la plateforme Medivio, nous collectons les données suivantes :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données d'identification : nom, prénom, adresse email</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données de santé : symptômes, constantes vitales, ordonnances, comptes rendus</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données de connexion : adresse IP, type de navigateur, pages visitées</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Données de paiement : traitées exclusivement par Stripe — Medivio ne stocke aucune donnée bancaire</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Finalités du traitement</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Assurer le fonctionnement de la plateforme et des consultations médicales</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Permettre la communication entre patients et médecins</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Envoyer des rappels de rendez-vous et notifications médicales</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Améliorer nos services et assurer la sécurité de la plateforme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Base légale</h2>
            <p>Le traitement de vos données repose sur :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Votre consentement explicite lors de l'inscription</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> L'exécution du contrat de service</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> L'intérêt légitime de Medivio pour améliorer ses services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Conservation des données</h2>
            <p>Vos données sont conservées pendant la durée de votre utilisation de la plateforme, puis archivées conformément aux obligations légales applicables aux données de santé (20 ans pour les dossiers médicaux en France).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Partage des données</h2>
            <p>Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Les professionnels de santé avec qui vous consultez</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Nos prestataires techniques (Supabase, Vercel, Render, Daily.co, Stripe, Resend) dans le cadre strict de leurs missions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Droit d'accès à vos données</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Droit de rectification</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Droit à l'effacement</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Droit à la portabilité</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Droit d'opposition</li>
            </ul>
            <p className="mt-3">Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@medivio.fr" className="text-blue-600 hover:underline">contact@medivio.fr</a></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Sécurité</h2>
            <p>Medivio met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement TLS, authentification sécurisée, accès restreint aux données de santé.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact DPO</h2>
            <p>Pour toute question relative à la protection de vos données : <a href="mailto:contact@medivio.fr" className="text-blue-600 hover:underline">contact@medivio.fr</a></p>
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
