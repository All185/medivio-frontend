import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://medivio-backend.onrender.com/api/v1/:path*',
      },
      { source: '/api/emergency/:path*', destination: 'https://medivio-backend.onrender.com/emergency/:path*' },
    ]
  },
}

export default nextConfig