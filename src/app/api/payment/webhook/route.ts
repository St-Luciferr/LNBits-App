import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/lib/smtp/mailer'

const VOLTAGE_SECRET = process.env.VOLTAGE_SECRET || ''
const EMAIL_TO_NOTIFY = process.env.NOTIFY_EMAIL || ''

export async function POST(req: NextRequest) {
  const secret = req.headers.get('voltage-secret')

  if (!secret || secret !== VOLTAGE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { type, details, api } = body

  if (!type || !['status', 'update', 'error'].includes(type)) {
    return NextResponse.json({ error: 'Invalid "type"' }, { status: 400 })
  }

  if (!api || typeof api !== 'string') {
    return NextResponse.json({ error: 'Invalid "api"' }, { status: 400 })
  }

  // Send Email Notification
  try {
    await sendMail({
      to: EMAIL_TO_NOTIFY,
      subject: `⚡ Voltage Webhook - ${type.toUpperCase()} Event`,
      text: `Type: ${type}\nAPI: ${api}\nDetails:\n${JSON.stringify(details, null, 2)}`,
      html: `
        <h2>Voltage Webhook Event</h2>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>API:</strong> ${api}</p>
        <h3>Details</h3>
        <pre>${JSON.stringify(details, null, 2)}</pre>
      `,
    })
  } catch (error) {
    console.error('Email sending failed:', error)
  }

  return NextResponse.json({ status: 'success' })
}
