import { ImageResponse } from 'next/og'

export const alt = 'V13 Studio | Software Product Studio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'radial-gradient(circle at 30% 20%, #1B2A4A 0%, #0D1B2A 60%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 12,
            textTransform: 'uppercase',
            color: '#8B5CF6',
            marginBottom: 24,
          }}
        >
          Software Product Studio
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>WE BUILD PRODUCTS</span>
          <span
            style={{
              background: 'linear-gradient(to right, #8B5CF6, #06B6D4)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            THAT MATTER
          </span>
        </div>
        <div style={{ fontSize: 32, marginTop: 40, color: '#94A3B8' }}>
          V13 Studio — Catalonia, Spain
        </div>
      </div>
    ),
    { ...size },
  )
}
