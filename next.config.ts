import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pages refresh from Sanity every 60 seconds (see `revalidate` in each page).
  cacheComponents: false,
}

export default nextConfig
