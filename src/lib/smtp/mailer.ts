import { transporter } from './config'

type EmailOptions = {
    to: string
    subject: string
    text?: string
    html?: string
}

export const sendMail = async ({ to, subject, text, html }: EmailOptions) => {
    const info = await transporter.sendMail({
        from: `"Voltage Notifier" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
    })

    console.log(`Email sent: ${info.messageId}`)
}
