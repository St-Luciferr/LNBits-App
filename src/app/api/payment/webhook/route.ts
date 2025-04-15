import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/lib/smtp/mailer'
import { logInfo, logError } from '@/lib/logger'

const VOLTAGE_SECRET = process.env.VOLTAGE_SECRET || ''
const EMAIL_TO_NOTIFY = process.env.NOTIFY_EMAIL || ''

export async function POST(req: NextRequest) {
  const secret = req.headers.get('voltage-secret')

  if (!secret || secret !== VOLTAGE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  let body

  const contentType = req.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    try {
      body = await req.json()
      logInfo(`Received valid JSON webhook: ${JSON.stringify(body)}`)
    } catch (e) {
      logError(`JSON parse error: ${e}`)
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
  } else {
    const text = await req.text()
    logError(`Invalid content type. Raw body: ${text}`)
    return NextResponse.json({ error: 'Unsupported content type. Expected application/json.' }, { status: 400 })
  }

  // const { type, details, api } = body

  // if (!type || !['status', 'update', 'error'].includes(type)) {
  //   logError(`Invalid type: ${type}`)
  //   return NextResponse.json({ error: 'Invalid "type"' }, { status: 400 })
  // }

  // if (!api || typeof api !== 'string') {
  //   logError(`Invalid api: ${api}`)
  //   return NextResponse.json({ error: 'Invalid "api"' }, { status: 400 })
  // }

  // // Send Email Notification
  // try {
  //   await sendMail({
  //     to: EMAIL_TO_NOTIFY,
  //     subject: `⚡ Voltage Webhook - ${type.toUpperCase()} Event`,
  //     text: `Type: ${type}\nAPI: ${api}\nDetails:\n${JSON.stringify(details, null, 2)}`,
  //     html: `
  //       <h2>Voltage Webhook Event</h2>
  //       <p><strong>Type:</strong> ${type}</p>
  //       <p><strong>API:</strong> ${api}</p>
  //       <h3>Details</h3>
  //       <pre>${JSON.stringify(details, null, 2)}</pre>
  //     `,
  //   })
  //   logInfo(`Email sent for webhook event: Type=${type}, API=${api}`)
  // } catch (error) {
  //   console.error('Email sending failed:', error)
  // }

  try {
    await sendMail({
      to: EMAIL_TO_NOTIFY,
      subject: `⚡ Voltage Webhook Event Notification`,
      text: `Body: ${JSON.stringify(body, null, 2)}`,
      html: `
        <h2>Voltage Webhook Event</h2>
        <pre>${JSON.stringify(body, null, 2)}</pre>
      `,
    })
    
  } catch (error) {
    console.error('Email sending failed:', error)
  }
  return NextResponse.json({ status: 'success' })
}
