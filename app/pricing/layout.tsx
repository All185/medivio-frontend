import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Découvrez les offres Medivio : gratuit pour démarrer, puis des formules adaptées aux médecins indépendants et aux organisations de santé. Pas de frais cachés.',
  openGraph: {
    title: 'Tarifs — Medivio',
    description: 'Gratuit pour démarrer. Formules pour indépendants et organisations. Pas de frais cachés.',
    url: 'https://medivio.care/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
