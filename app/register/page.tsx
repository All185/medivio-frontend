'use client'
import AuthForm from '@/components/auth/AuthForm'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
export default function RegisterPage() {
  const router = useRouter()
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.back()}>
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <LanguageSwitcher />
      </div>
      <AuthForm mode="register" />
    </div>
  )
}