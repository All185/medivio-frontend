'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LegalPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentions légales</h1>
        <p className="text-gray-400 text-sm mb-12">Dernière mise à jour : janvier 2026</p>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Éditeur du site</h2>
            <p>Medivio est une plateforme de télémédecine éditée par :</p>
            <div className="bg-gray-50 rounded-xl p-4 mt-3 text-sm space-y-1">
              <p><strong>Raison sociale :</strong> Medivio</p>
              <p><strong>Forme juridique :</strong> En cours de constitution</p>
              <p><strong>Email :</strong> contact@medivio.fr</p>
              <p><strong>Directeur de publication :</strong> Allan</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Hébergement</h2>
            <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
              <p><strong>Frontend :</strong> Vercel Inc. — 340 Pine Street, San Francisco, CA 94104, États-Unis</p>
              <p><strong>Backend :</strong> Render — 525 Brannan St, San Francisco, CA 94107, États-Unis</p>
              <p><strong>Base de données :</strong> Supabase — 970 Toa Payoh North, Singapour</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Propriété intellectuelle</h2>
            <p>L'ensemble des contenus présents sur la plateforme Medivio (textes, images, logos, fonctionnalités) sont protégés par le droit de la propriété intellectuelle. Toute reproduction, représentation ou diffusion, totale ou partielle, est interdite sans autorisation préalable écrite de Medivio.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Responsabilité médicale</h2>
            <p>Medivio est une plateforme technologique facilitant la mise en relation entre patients et professionnels de santé. Medivio n'est pas un prestataire de soins médicaux. Les actes médicaux réalisés via la plateforme relèvent de la seule responsabilité des professionnels de santé inscrits.</p>
            <p className="mt-3">En cas d'urgence médicale, composez immédiatement le <strong>15 (SAMU)</strong>, le <strong>18 (pompiers)</strong> ou le <strong>112 (numéro d'urgence européen)</strong>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Données personnelles</h2>
            <p>Le traitement des données personnelles est détaillé dans notre <button onClick={() => router.push('/privacy')} className="text-blue-600 hover:underline">Politique de confidentialité</button>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <p>Pour toute question relative aux présentes mentions légales, contactez-nous à : <a href="mailto:contact@medivio.fr" className="text-blue-600 hover:underline">contact@medivio.fr</a></p>
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
