'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PatientDashboard from '@/components/dashboard/PatientDashboard'
import DoctorDashboard from '@/components/dashboard/DoctorDashboard'
import { isAuthenticated, getUser } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }
    const user = getUser()
    if (user) setRole(user.role)
  }, [])

  if (!role) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">Chargement...</p>
    </div>
  )

  return role === 'doctor'
    ? <DoctorDashboard />
    : <PatientDashboard />
}