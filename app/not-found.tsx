import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: 'Cette page n\'existe pas ou a été déplacée.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)' }}>
      <div className="text-center max-w-md">
        <div
          className="text-8xl font-extrabold mb-4 leading-none"
          style={{
            background: 'linear-gradient(135deg, #009E88, #2B5EF8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Page introuvable</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Cette page n&rsquo;existe pas ou a été déplacée. Revenez à l&rsquo;accueil pour continuer.
        </p>
        <Link
          href="/"
          className="inline-block text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #009E88, #2B5EF8)',
            boxShadow: '0 8px 32px rgba(43,94,248,0.25)',
          }}
        >
          Retour à l&rsquo;accueil
        </Link>
      </div>
    </div>
  )
}
