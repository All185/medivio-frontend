import type { NextConfig } from 'next'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')
  ?? 'https://medivio-backend.onrender.com'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${BACKEND_URL}/api/v1/:path*`,
      },
      { source: '/api/emergency/:path*',    destination: `${BACKEND_URL}/emergency/:path*` },
      { source: '/api/prescriptions/:path*', destination: `${BACKEND_URL}/prescriptions/:path*` },
      { source: '/api/billing/:path*',      destination: `${BACKEND_URL}/billing/:path*` },
      { source: '/api/senior/:path*',       destination: `${BACKEND_URL}/senior/:path*` },
      { source: '/api/marketplace/:path*',  destination: `${BACKEND_URL}/marketplace/:path*` },
      { source: '/api/chronic/:path*',      destination: `${BACKEND_URL}/chronic/:path*` },
      { source: '/api/async-care/:path*',   destination: `${BACKEND_URL}/async-care/:path*` },
      { source: '/api/auth/:path*',         destination: `${BACKEND_URL}/api/v1/auth/:path*` },
    ]
  },
}

export default nextConfig
