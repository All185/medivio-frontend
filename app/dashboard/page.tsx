'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PatientDashboard from '@/components/dashboard/PatientDashboard'
import DoctorDashboard from '@/components/dashboard/DoctorDashboard'

export default function DashboardPage() {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/login')
      return
    }

    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setRole(user.role)
    }
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