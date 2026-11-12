import { Resend } from 'resend'
import type { z } from 'zod'
import type { contactSchema } from '~/utils/models/contact.model'

export type ContactMessage = z.infer<typeof contactSchema>

// Sends a contact form submission through Resend.
// From:     "Husky Website" <CONTACT_FROM_EMAIL>; the customer's name is in the subject.
//           Keep domains out of the display name: mail providers strip them as an anti-spoofing measure.
// To:       CONTACT_TO_EMAIL
// Reply-To: the customer, so hitting Reply answers them directly
// Throws on any failure; the caller turns that into the form's error message.
export async function sendContactEmail(contact: ContactMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.CONTACT_FROM_EMAIL
  const toEmail = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !fromEmail || !toEmail) {
    throw new Error('RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL must all be set')
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: `"Husky Website" <${ fromEmail }>`,
    to: toEmail.split(',').map(address => address.trim()),
    replyTo: contact.email,
    subject: `Quote request: ${ contact.subject } (${ contact.name })`,
    html: renderHtml(contact),
    text: renderText(contact)
  })

  if (error) throw new Error(`Resend rejected the email: ${ error.name }: ${ error.message }`)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderText({ name, phone, email, subject, message }: ContactMessage): string {
  return [
    `New quote request from huskydrilling.com`,
    ``,
    `Subject: ${ subject }`,
    `Name:    ${ name }`,
    `Phone:   ${ phone }`,
    `Email:   ${ email }`,
    ``,
    message
  ].join('\n')
}

// "Basalt and rust" layout, formerly the EmailJS template.
// Email clients don't support oklch() or web fonts reliably, so colors are hex
// conversions of the app.css tokens and type falls back from Rokkitt/Archivo to Georgia/Arial.
function renderHtml(contact: ContactMessage): string {
  const name = escapeHtml(contact.name)
  const phone = escapeHtml(contact.phone)
  const email = escapeHtml(contact.email)
  const subject = escapeHtml(contact.subject)
  const message = escapeHtml(contact.message)
  const telHref = `tel:${ encodeURIComponent(contact.phone) }`
  const mailHref = escapeHtml(`mailto:${ contact.email }?subject=${ encodeURIComponent(`Re: ${ contact.subject }`) }`)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>New quote request</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600&family=Rokkitt:wght@600;700&display=swap');
    body { margin: 0; padding: 0; }
    a { color: inherit; }
    @media (max-width: 600px) {
      .shell { width: 100% !important; }
      .pad { padding-left: 20px !important; padding-right: 20px !important; }
      .label { display: block !important; width: auto !important; padding-bottom: 2px !important; border-bottom: 0 !important; }
      .value { display: block !important; padding-top: 0 !important; border-top: 0 !important; }
      .btn { display: block !important; width: 100% !important; box-sizing: border-box; margin: 0 0 10px 0 !important; }
    }
    /* Dark palette from app.css .dark, for clients that honor prefers-color-scheme (Apple Mail, iOS Mail) */
    @media (prefers-color-scheme: dark) {
      .bg-paper { background: #0e151b !important; }
      .bg-surface { background: #171f26 !important; border-color: #2f3942 !important; }
      .bg-band { background: #03060a !important; }
      .bg-note { background: #0a0f14 !important; border-color: #4a545d !important; }
      .t-ink { color: #eaeff3 !important; }
      .t-soft { color: #b6bfc6 !important; }
      .t-faint { color: #8a949b !important; }
      .t-water { color: #37c2ef !important; }
      .rule { border-color: #2f3942 !important; }
      .btn-ghost { color: #eaeff3 !important; border-color: #4a545d !important; }
    }
  </style>
</head>
<body class="bg-paper" style="margin:0; padding:0; background:#f0f4f7;">
  <!-- Preheader (inbox preview text) -->
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
    ${ name } sent a quote request from huskydrilling.com: ${ subject }
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg-paper" style="background:#f0f4f7;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="shell" style="width:600px; max-width:600px;">

          <!-- Masthead: basalt band, slab wordmark, rust rule like the rig livery -->
          <tr>
            <td class="bg-band pad" style="background:#182230; padding:26px 36px 22px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:'Rokkitt', Georgia, 'Times New Roman', serif; font-size:30px; line-height:1; font-weight:700; letter-spacing:3px; color:#f0f4f7;">
                    HUSKY
                  </td>
                  <td align="right" style="font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:11px; line-height:1.4; letter-spacing:1.5px; text-transform:uppercase; color:#a9b4bd;">
                    Well &amp; Pump Service
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#ae4024; height:4px; line-height:4px; font-size:0;">&nbsp;</td>
          </tr>

          <!-- Card -->
          <tr>
            <td class="bg-surface pad" style="background:#fcfdfe; border:1px solid #c7cfd5; border-top:0; padding:32px 36px 36px 36px;">

              <p class="t-faint" style="margin:0 0 6px 0; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:12px; line-height:1.4; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; color:#65707a;">
                New quote request &middot; huskydrilling.com
              </p>
              <h1 class="t-ink" style="margin:0 0 26px 0; font-family:'Rokkitt', Georgia, 'Times New Roman', serif; font-size:28px; line-height:1.2; font-weight:700; color:#182230;">
                ${ subject }
              </h1>

              <!-- Log: label / value rows, like the driller's log on the site -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td class="label rule t-faint" width="120" valign="top" style="width:120px; padding:12px 0; border-top:1px solid #939da6; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:12px; line-height:1.6; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#65707a;">
                    Name
                  </td>
                  <td class="value rule t-ink" valign="top" style="padding:12px 0; border-top:1px solid #939da6; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:16px; line-height:1.5; font-weight:600; color:#182230;">
                    ${ name }
                  </td>
                </tr>
                <tr>
                  <td class="label rule t-faint" width="120" valign="top" style="width:120px; padding:12px 0; border-top:1px solid #c7cfd5; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:12px; line-height:1.6; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#65707a;">
                    Phone
                  </td>
                  <td class="value rule" valign="top" style="padding:12px 0; border-top:1px solid #c7cfd5; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:16px; line-height:1.5;">
                    <a href="${ telHref }" class="t-ink" style="color:#182230; text-decoration:none; font-variant-numeric:tabular-nums;">${ phone }</a>
                  </td>
                </tr>
                <tr>
                  <td class="label rule t-faint" width="120" valign="top" style="width:120px; padding:12px 0; border-top:1px solid #c7cfd5; border-bottom:1px solid #939da6; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:12px; line-height:1.6; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#65707a;">
                    Email
                  </td>
                  <td class="value rule" valign="top" style="padding:12px 0; border-top:1px solid #c7cfd5; border-bottom:1px solid #939da6; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:16px; line-height:1.5; word-break:break-all;">
                    <a href="${ mailHref }" class="t-water" style="color:#0072a3; text-decoration:underline;">${ email }</a>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p class="t-faint" style="margin:28px 0 10px 0; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:12px; line-height:1.4; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#65707a;">
                Message
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="bg-note t-ink" style="background:#f0f4f7; border-left:3px solid #939da6; padding:16px 20px; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:16px; line-height:1.65; color:#182230; white-space:pre-wrap;">${ message }</td>
                </tr>
              </table>

              <!-- Actions: rust is reserved for call/quote, so only Call gets it -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;">
                <tr>
                  <td>
                    <a href="${ telHref }" class="btn" style="display:inline-block; margin:0 10px 0 0; padding:13px 24px; background:#ae4024; border:1px solid #ae4024; border-radius:4px; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:15px; line-height:1.2; font-weight:600; color:#ffffff; text-decoration:none; text-align:center;">
                      Call ${ name }
                    </a>
                    <a href="${ mailHref }" class="btn btn-ghost" style="display:inline-block; margin:0; padding:13px 24px; background:transparent; border:1px solid #939da6; border-radius:4px; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:15px; line-height:1.2; font-weight:600; color:#182230; text-decoration:none; text-align:center;">
                      Reply by email
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="pad t-faint" style="padding:20px 36px 0 36px; font-family:'Archivo', Arial, Helvetica, sans-serif; font-size:12px; line-height:1.6; color:#65707a;">
              Sent from the contact form on <a href="https://huskydrilling.com" class="t-faint" style="color:#65707a; text-decoration:underline;">huskydrilling.com</a>.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`
}
