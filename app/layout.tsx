import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import { SmoothScrollProvider } from '@/components/smooth-scroll'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'V13 Studio | Software Studio',
  description: 'A 4-person digital product studio crafting software from strategy to deployment. Mobile, web, and backend engineering based in Catalonia, Spain.',
  keywords: ['product studio', 'software development', 'mobile development', 'web development', 'UX/UI design', 'React Native', 'NestJS', 'Catalonia'],
  authors: [{ name: 'V13 Studio' }],
  icons: {
    icon: [
      { url: '/logo-dark.png', media: '(prefers-color-scheme: light)' },
      { url: '/logo-light.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/logo-dark.png',
  },
  openGraph: {
    title: 'V13 Studio | Software Studio',
    description: 'A 4-person digital product studio crafting software from strategy to deployment.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0D1B2A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
