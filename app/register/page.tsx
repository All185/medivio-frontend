'use client'
import AuthForm from '@/components/auth/AuthForm'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
export default function RegisterPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-4">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
        </div>
        <LanguageSwitcher />
      </div>
      <AuthForm mode="register" />
    </div>
  )
}