import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://medivio-backend.onrender.com/api/v1/:path*',
      },
      { source: '/api/emergency/:path*', destination: 'https://medivio-backend.onrender.com/emergency/:path*' },
      { source: '/api/prescriptions/:path*', destination: 'https://medivio-backend.onrender.com/prescriptions/:path*' },
      { source: '/api/billing/:path*', destination: 'https://medivio-backend.onrender.com/billing/:path*' },
      { source: '/api/senior/:path*', destination: 'https://medivio-backend.onrender.com/senior/:path*' },
      { source: '/api/marketplace/:path*', destination: 'https://medivio-backend.onrender.com/marketplace/:path*' },
      { source: '/api/chronic/:path*', destination: 'https://medivio-backend.onrender.com/chronic/:path*' },
      { source: '/api/async-care/:path*', destination: 'https://medivio-backend.onrender.com/async-care/:path*' },
    ]
  },
}

export default nextConfig