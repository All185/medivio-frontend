import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Medivio est né d'une conviction : la télémédecine peut être simple, fiable et accessible à tous. Découvrez l'histoire et la vision derrière la plateforme.',
  openGraph: {
    title: 'À propos — Medivio',
    description: 'La conviction derrière Medivio : une télémédecine simple, fiable et accessible à tous.',
    url: 'https://medivio.care/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
