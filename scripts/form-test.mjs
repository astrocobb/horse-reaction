// Weekly contact-form health check.
// Sends a clearly marked test message through the same EmailJS service,
// template and keys the contact form action uses (app/routes/Home.tsx).
//
// Run inside the production container, where the env vars and
// node_modules live:
//   ssh <host> 'docker exec -i -w /app huskydrilling node --input-type=module -' < scripts/form-test.mjs
//
// Exits non-zero on failure so the GitHub Actions run fails and emails the repo owner.
import emailjs from '@emailjs/nodejs'

const required = [ 'EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY', 'EMAILJS_PRIVATE_KEY' ]
const missing = required.filter(key => !process.env[key])
if (missing.length) {
  console.error(`Missing env vars: ${ missing.join(', ') }`)
  process.exit(1)
}

const sentAt = new Date().toLocaleString('en-US', { timeZone: 'America/Denver', dateStyle: 'full', timeStyle: 'short' })

try {
  const res = await emailjs.send(
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
    {
      from_name: 'Website Form Test',
      phone: '+15055555555',
      from_email: 'test@example.com',
      subject: '[TEST] Weekly contact form check',
      message: `This is the automated weekly test of the huskydrilling.com contact form, sent ${ sentAt }. If you got this, the form's email delivery is working. No action needed.`
    },
    {
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY
    }
  )
  console.log(`Test email sent: ${ res.status } ${ res.text }`)
} catch (err) {
  console.error('Test email failed:', err?.status ?? '', err?.text ?? err)
  process.exit(1)
}
