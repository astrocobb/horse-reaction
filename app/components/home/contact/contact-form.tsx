import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { IMaskInput } from 'react-imask'


export function ContactForm() {

  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ subject, setSubject ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ status, setStatus ] = useState({ text: '', type: '' })
  const [ sending, setSending ] = useState(false)

  function formatName(value: string) {
    return value.toLowerCase().replace(/\b[a-z]/g, l => l.toUpperCase())
  }

  function counterClass(length: number, max: number, min = 0) {
    if (length === max || length < min) return 'text-sm text-error ml-2 font-semibold'
    if (length > max * 0.8) return 'text-sm text-warning ml-2 font-semibold'
    if (min && length >= min) return 'text-sm text-success ml-2 font-semibold'
    if (!min) return 'text-sm text-success ml-2 font-semibold'
    return 'text-sm text-base-400 ml-2'
  }

  function handleSubmit(e: { preventDefault: () => void }) {

    e.preventDefault()
    setStatus({ text: '', type: '' })

    const nameParts = name.trim().split(/\s+/).filter(p => p.length > 0)
    if (nameParts.length < 2) {
      setStatus({ text: 'Please enter both first and last name.', type: 'error' })
      return
    }
    if (subject.trim().length < 4) {
      setStatus({ text: 'Subject must be at least 4 characters.', type: 'error' })
      return
    }
    if (message.trim().length < 16) {
      setStatus({ text: 'Message must be at least 20 characters.', type: 'error' })
      return
    }

    setSending(true)

    emailjs.send('service_8uwodx9', 'template_8ir0hso', {
      from_name: name.trim(),
      phone,
      from_email: email,
      subject: subject.trim(),
      message: message.trim()
    }).then(() => {
      setStatus({ text: 'Thank you! Your message has been sent successfully.', type: 'success' })
      setName('')
      setPhone('')
      setEmail('')
      setSubject('')
      setMessage('')
    }).catch(() => {
      setStatus({ text: 'Failed to send message. Please try again or call us directly.', type: 'error' })
    }).finally(() => {
      setSending(false)
    })
  }

  const statusClass = status.type === 'success'
    ? 'text-center text-sm text-success mt-2'
    : 'text-center text-sm text-error mt-2'

  const inputClass = 'p-2 border rounded-md focus:outline-none focus:border-none focus:ring-2 placeholder:text-base-250 caret-secondary border-base-500 bg-base-700 text-base-content focus:ring-secondary'

  return (
    <form onSubmit={ handleSubmit } className="flex flex-col">
      <div>
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
            <IMaskInput
              mask="(000) 000-0000"
              id="phone"
              placeholder="(505) 555-5555"
              required
              value={ phone }
              onAccept={ val => setPhone(val) }
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
              className={ subject.length > 0 ? counterClass(subject.length, 128, 4) : 'ml-2 text-sm text-base-400' }>
                ({ subject.length }/128)
              </span>
          </label>
          <input
            type="text"
            id="subject"
            maxLength={ 128 }
            minLength={ 4 }
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
        className="w-full mt-6 px-6 pt-2 pb-2.5 text-lg font-semibold  border rounded-md transition hover:cursor-pointer border-primary/90 text-primary/90 hover:bg-primary/20 focus:bg-primary/40"
      >
        { sending ? 'Sending...' : 'Send Message' }
      </button>

      { status.text && <p className={ statusClass }>{ status.text }</p> }
    </form>
  )
}