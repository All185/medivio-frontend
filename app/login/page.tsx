import AuthForm from '@/components/auth/AuthForm'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-end p-4">
        <LanguageSwitcher />
      </div>
      <AuthForm mode="login" />
    </div>
  )
}