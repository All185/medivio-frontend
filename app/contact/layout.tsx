import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Une question sur Medivio ? Contactez l'équipe. Réponse sous 48h.",
  openGraph: {
    title: 'Contact — Medivio',
    description: "Une question sur Medivio ? Contactez l'équipe. Réponse sous 48h.",
    url: 'https://medivio.care/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
