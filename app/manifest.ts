import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'V13 Studio | Software Product Studio',
    short_name: 'V13 Studio',
    description:
      'A digital product studio crafting software from strategy to deployment. Mobile, web, and backend engineering based in Catalonia, Spain.',
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
