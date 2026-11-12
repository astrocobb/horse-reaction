// Weekly contact-form health check.
// Sends a clearly marked test message through the same Resend key and
// from/to addresses the contact form action uses (app/utils/server/contact-email.server.ts).
//
// Run inside the production container, where the env vars and
// node_modules live:
//   ssh <host> 'docker exec -i -w /app huskydrilling node --input-type=module -' < scripts/form-test.mjs
//
// Exits non-zero on failure so the GitHub Actions run fails and emails the repo owner.
import { Resend } from 'resend'

const required = [ 'RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL' ]
const missing = required.filter(key => !process.env[key])
if (missing.length) {
  console.error(`Missing env vars: ${ missing.join(', ') }`)
  process.exit(1)
}

const sentAt = new Date().toLocaleString('en-US', { timeZone: 'America/Denver', dateStyle: 'full', timeStyle: 'short' })

const { data, error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
  from: `"Husky Website" <${ process.env.CONTACT_FROM_EMAIL }>`,
  to: process.env.CONTACT_TO_EMAIL.split(',').map(address => address.trim()),
  subject: '[TEST] Weekly contact form check',
  text: `This is the automated weekly test of the huskydrilling.com contact form, sent ${ sentAt }. If you got this, the form's email delivery is working. No action needed.`
})

if (error) {
  console.error('Test email failed:', error.name, error.message)
  process.exit(1)
}
console.log(`Test email sent: ${ data.id }`)
