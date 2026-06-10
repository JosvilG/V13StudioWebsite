import { NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),
  consent: z.literal(true),
  // Honeypot — humans never fill this; handled below, kept loose here.
  website: z.string().optional().default(''),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { name, email, message, website } = parsed.data

  // Honeypot filled → pretend success, send nothing.
  if (website) {
    return NextResponse.json({ ok: true })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error('[contact] SMTP env vars missing')
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[v13studio.com] Contact form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })
  } catch (error) {
    console.error('[contact] sendMail failed:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
