import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useFetcher } from 'react-router'
import { Turnstile, type BoundTurnstileObject } from 'react-turnstile'
import { contactSchema } from '~/utils/models/contact.model'

// helper function to format name
function formatName(value: string) {
  return value.toLowerCase().replaceAll(/\b[a-z]/g, l => l.toUpperCase())
}

// helper function to determine CSS styling for form counters
function counterClass(length: number, max: number, min = 0) {

  if (length === max || length < min) return 'ml-2 text-sm font-semibold tabular text-error'
  if (length > max * 0.8) return 'ml-2 text-sm font-semibold tabular text-warning'
  if (min && length >= min) return 'ml-2 text-sm font-semibold tabular text-success'
  if (!min) return 'ml-2 text-sm font-semibold tabular text-success'
  return 'ml-2 text-sm font-normal text-ink-faint tabular'
}

// helper function to format phone number to display to the user
function formatPhoneDisplay(e164: string): string {

  const digits = e164.replaceAll(/\D/g, '').slice(1)
  if (!digits.length) return ''
  const area = digits.slice(0, 3)
  const prefix = digits.slice(3, 6)
  const line = digits.slice(6, 10)

  if (digits.length <= 3) return `(${ area }`
  if (digits.length <= 6) return `(${ area }) ${ prefix }`
  return `(${ area }) ${ prefix }-${ line }`
}

// helper function that formats the user's phone number input
function handlePhoneInput(raw: string): string {
  const digits = raw.replaceAll(/\D/g, '').slice(0, 10)
  return digits.length ? `+1${ digits }` : ''
}

interface ContactFormProps {
  turnstileSiteKey: string
}

// contact form function that handles validating user inputs
export function ContactForm({ turnstileSiteKey }: Readonly<ContactFormProps>) {

  const fetcher = useFetcher<{ success: boolean; error?: string }>()
  const turnstileRef = useRef<BoundTurnstileObject | null>(null)

  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ subject, setSubject ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ turnstileToken, setTurnstileToken ] = useState('')
  const [ clientError, setClientError ] = useState('')

  const sending = fetcher.state !== 'idle'
  const serverData = fetcher.data

  // Reset form on successful submission. Runs after render: resetting the Turnstile
  // widget touches a third-party script, which must not happen while React is rendering.
  useEffect(() => {
    if (fetcher.state !== 'idle' || !fetcher.data?.success) return
    setName('')
    setPhone('')
    setEmail('')
    setSubject('')
    setMessage('')
    setTurnstileToken('')
    try {
      turnstileRef.current?.reset()
    } catch (error) {
      console.error('Turnstile reset failed:', error)
    }
  }, [ fetcher.state, fetcher.data ])

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    setClientError('')

    // Client-side Zod validation for UX
    const validatedResult = contactSchema.safeParse({ name, phone, email, subject, message })
    if (!validatedResult.success) {
      e.preventDefault()
      setClientError(validatedResult.error.issues[0].message)
      return
    }

    if (!turnstileToken) {
      e.preventDefault()
      setClientError('Please complete the verification challenge.')
    }
  }

  // Determine status message
  let statusText = ''
  let statusType = ''

  if (clientError) {
    statusText = clientError
    statusType = 'error'
  } else if (serverData && !sending) {
    if (serverData.success) {
      statusText = 'Message sent. We’ll get back to you as soon as we can.'
      statusType = 'success'
    } else if (serverData.error) {
      statusText = serverData.error
      statusType = 'error'
    }
  }

  const statusClass = statusType === 'success'
    ? 'mt-3 font-semibold text-success'
    : 'mt-3 font-semibold text-error'

  const inputClass = 'px-3 py-2.5 text-ink bg-field border-2 border-rule rounded-sm caret-aquifer placeholder:text-ink-faint transition-colors hover:border-ink-faint focus:outline-none focus:border-aquifer'

  return (
    <fetcher.Form method="post" onSubmit={ handleSubmit } className="flex flex-col">
      <div className="grow">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1.5 font-semibold text-ink">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              required
              value={ name }
              onChange={ e => setName(formatName(e.target.value)) }
              className={ inputClass }
            />
          </div>

          {/* Phone */ }
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1.5 font-semibold text-ink">Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="(505) 555-5555"
              required
              value={ formatPhoneDisplay(phone) }
              onChange={ e => setPhone(handlePhoneInput(e.target.value)) }
              className={ inputClass }
            />
            <input type="hidden" name="phone" value={ phone }/>
          </div>
        </div>

        {/* Email */ }
        <div className="flex flex-col mt-5">
          <label htmlFor="email" className="mb-1.5 font-semibold text-ink">Email</label>
          <input
            type="email"
            id="email"
            name="email"
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
        <div className="flex flex-col mt-5">
          <label htmlFor="subject" className="mb-1.5 font-semibold text-ink">
            Subject
            <span
              className={ subject.length > 0 ? counterClass(subject.length, 64, 8) : 'ml-2 text-sm font-normal text-ink-faint tabular' }>
                ({ subject.length }/64)
            </span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
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
        <div className="flex flex-col mt-5">
          <label htmlFor="message" className="mb-1.5 font-semibold text-ink">
            Message
            <span
              className={ message.length > 0 ? counterClass(message.length, 1024, 16) : 'ml-2 text-sm font-normal text-ink-faint tabular' }>
                ({ message.length }/1024)
              </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={ 7 }
            minLength={ 16 }
            maxLength={ 1024 }
            placeholder="Enter your message..."
            required
            value={ message }
            onChange={ e => setMessage(e.target.value) }
            className={ inputClass }
          />
        </div>

        {/* Honeypot - hidden from real users */ }
        <input
          type="text"
          name="website"
          tabIndex={ -1 }
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-2500 h-0 w-0 overflow-hidden"
        />

        {/* Turnstile CAPTCHA */ }
        { turnstileSiteKey && (
          <div className="mt-5">
            <Turnstile
              appearance={ 'interaction-only' }
              size={ 'flexible' }
              retry={ 'never' }
              sitekey={ turnstileSiteKey }
              onVerify={ (token, boundTurnstile) => {
                setTurnstileToken(token)
                turnstileRef.current = boundTurnstile
              } }
              theme="light"
            />
          </div>
        ) }
      </div>

      {/* Submit Button */ }
      <button
        type="submit"
        disabled={ sending }
        className="w-full h-12 mt-6 px-6 text-lg font-semibold text-white bg-livery rounded-sm transition-colors hover:cursor-pointer hover:bg-livery-dark disabled:opacity-60 disabled:hover:cursor-wait"
      >
        { sending ? 'Sending...' : 'Send Message' }
      </button>

      <p role="status" className={ statusText ? statusClass : 'sr-only' }>{ statusText }</p>
    </fetcher.Form>
  )
}
