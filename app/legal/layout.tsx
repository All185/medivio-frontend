import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Medivio — éditeur, hébergeur, contacts.',
  robots: { index: false, follow: false },
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children
}
