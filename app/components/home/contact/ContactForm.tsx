import emailjs from '@emailjs/browser'
import { useState } from 'react'
import { contactSchema } from '~/utils/models/contact.model'


// initialize emailjs
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

// helper function to format name
function formatName(value: string) {
  return value.toLowerCase().replaceAll(/\b[a-z]/g, l => l.toUpperCase())
}

// helper function to determine CSS styling for form counters
function counterClass(length: number, max: number, min = 0) {

  if (length === max || length < min) return 'ml-2 text-sm font-semibold text-error'
  if (length > max * 0.8) return 'ml-2 text-sm font-semibold text-warning'
  if (min && length >= min) return 'ml-2 text-sm font-semibold text-success'
  if (!min) return 'ml-2 text-sm font-semibold text-success'
  return 'ml-2 text-sm text-base-400'
}

// helper function to format phone number to display to the user
function formatPhoneDisplay(e164: string): string {

  const digits = e164.replaceAll(/\D/g, '').slice(1)
  if (!digits.length) return ''
  const area = digits.slice(0, 3)
  const prefix = digits.slice(3, 6)
  const line = digits.slice(6, 10)

  if (digits.length <= 3) return `(${area}`
  if (digits.length <= 6) return `(${area}) ${prefix}`
  return `(${area}) ${prefix}-${line}`
}

// helper fucntion that formats that user's phone number input
function handlePhoneInput(raw: string): string {
  const digits = raw.replaceAll(/\D/g, '').slice(0, 10)
  return digits.length ? `+1${digits}` : ''
}

// contact form function that handles validating user inputs
export function ContactForm() {

  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ subject, setSubject ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ status, setStatus ] = useState({ text: '', type: '' })
  const [ sending, setSending ] = useState(false)

  function handleSubmit(e: { preventDefault: () => void }) {

    e.preventDefault()
    setStatus({ text: '', type: '' })

    const validatedResult = contactSchema.safeParse({ name, phone, email, subject, message })
    if (!validatedResult.success) {
      setStatus({
        text: validatedResult.error.issues[0].message,
        type: 'error'
      })
      return
    }

    setSending(true)

    emailjs.send('service_8uwodx9', 'template_8ir0hso', {
      from_name: validatedResult.data.name,
      phone: validatedResult.data.phone,
      from_email: validatedResult.data.email,
      subject: validatedResult.data.subject,
      message: validatedResult.data.message
    }).then(() => {
      setStatus({
        text: 'Thank you! Your message has been sent successfully.',
        type: 'success'
      })
      setName('')
      setPhone('')
      setEmail('')
      setSubject('')
      setMessage('')
    }).catch(() => {
      setStatus({
        text: 'Failed to send message. Please try again or call us directly.',
        type: 'error'
      })
    }).finally(() => {
      setSending(false)
    })
  }

  const statusClass = status.type === 'success'
    ? 'mt-2 text-center text-sm text-success'
    : 'mt-2 text-center text-sm text-error'

  const inputClass = 'p-2 text-base-content bg-base-700 border border-base-500 rounded-md caret-secondary placeholder:text-base-250 focus:outline-none focus:border-none focus:ring-2 focus:ring-secondary'

  return (
    <form onSubmit={ handleSubmit } className="flex flex-col">
      <div className="grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Name */ }
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium text-base-250">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              required
              value={ name }
              onChange={ e => setName(formatName(e.target.value)) }
              className={ inputClass }
            />
          </div>

          {/* Phone */ }
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 font-medium text-base-250">Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="(505) 555-5555"
              required
              value={ formatPhoneDisplay(phone) }
              onChange={ e => setPhone(handlePhoneInput(e.target.value)) }
              className={ inputClass }
            />
          </div>
        </div>

        {/* Email */ }
        <div className="flex flex-col mt-2">
          <label htmlFor="email" className="mb-2 font-medium text-base-250">Email</label>
          <input
            type="email"
            id="email"
            maxLength={ 64 }
            minLength={ 8 }
            placeholder="youremail@example.com"
            required
            value={ email }
            onChange={ e => setEmail(e.target.value) }
            className={ inputClass }
          />
        </div>

        {/* Subject */ }
        <div className="flex flex-col mt-2">
          <label htmlFor="subject" className="mb-2 font-medium text-base-250">
            Subject
            <span
              className={ subject.length > 0 ? counterClass(subject.length, 64, 8) : 'ml-2 text-sm text-base-400' }>
                ({ subject.length }/64)
            </span>
          </label>
          <input
            type="text"
            id="subject"
            maxLength={ 64 }
            minLength={ 8 }
            placeholder="Enter the subject..."
            required
            value={ subject }
            onChange={ e => setSubject(e.target.value) }
            className={ inputClass }
          />
        </div>

        {/* Message */ }
        <div className="flex flex-col mt-2">
          <label htmlFor="message" className="mb-2 font-medium text-base-250">
            Message
            <span
              className={ message.length > 0 ? counterClass(message.length, 1024, 16) : 'ml-2 text-sm text-base-400' }>
                ({ message.length }/1024)
              </span>
          </label>
          <textarea
            id="message"
            rows={ 11 }
            minLength={ 16 }
            maxLength={ 1024 }
            placeholder="Enter your message..."
            required
            value={ message }
            onChange={ e => setMessage(e.target.value) }
            className={ inputClass }
          />
        </div>
      </div>

      {/* Submit Button */ }
      <button
        type="submit"
        disabled={ sending }
        className="w-full mt-6 px-6 pt-2 pb-2.5 text-lg font-semibold text-primary/90 border border-primary/90 rounded-md transition hover:cursor-pointer hover:bg-primary/20 focus:bg-primary/40"
      >
        { sending ? 'Sending...' : 'Send Message' }
      </button>

      { status.text && <p className={ statusClass }>{ status.text }</p> }
    </form>
  )
}