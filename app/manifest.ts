import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'V13 Studio | Software Development & Digital Product Studio',
    short_name: 'V13 Studio',
    description:
      'Independent software studio in Catalonia, Spain. We design and build web apps, mobile apps and backends, from the first idea to production.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D1B2A',
    theme_color: '#0D1B2A',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
