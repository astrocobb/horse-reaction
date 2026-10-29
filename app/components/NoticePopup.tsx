import { useEffect, useState } from 'react'
import { CircleCheck, X } from 'lucide-react'
import { Link } from 'react-router'

// bump this key to show a new notice to visitors who dismissed a previous one
const STORAGE_KEY = 'notice-dismissed:contact-form-fixed'

// popup shown on a visitor's first load, remembered per browser once dismissed
export default function NoticePopup() {

  const [ open, setOpen ] = useState(false)

  // read localStorage after mount so server and client render match
  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  // close on Escape
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [ open ])

  function dismiss() {
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // storage unavailable (private mode, blocked cookies) — popup just shows again next visit
    }
  }

  if (!open) return null

  // side gaps match the navbar's so the popup lines up with its edges
  return (
    <div
      role="status"
      aria-labelledby="notice-title"
      className="fixed bottom-4 inset-x-4 z-50 p-4 text-warning-content bg-warning/65 border border-warning-content/20 rounded-md shadow-lg backdrop-blur-md transition duration-300 starting:opacity-0 starting:translate-y-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-sm md:right-8 lg:right-10"
    >
      <button
        type="button"
        onClick={ dismiss }
        className="absolute top-2 right-2 p-1 rounded-md transition hover:cursor-pointer hover:bg-warning-content/10 active:bg-warning-content/20"
      >
        <span className="sr-only">Close</span>
        <X className="w-4 h-4"/>
      </button>

      <div className="flex items-center gap-2 pr-6">
        <CircleCheck className="w-5 h-5 shrink-0"/>
        <h2 id="notice-title" className="font-semibold">Contact Form Fixed</h2>
      </div>

      <p className="mt-1.5 text-sm">
        An issue kept contact form messages from reaching us, and it&apos;s now fixed. If you didn&apos;t hear back,
        please send your message again or give us a call.
      </p>

      <div className="flex gap-2 mt-3">
        <Link
          to="#contact"
          onClick={ dismiss }
          className="px-4 pt-1 pb-1.5 text-sm font-semibold border-2 border-warning-content/60 rounded-md transition hover:bg-warning-content/10 hover:border-warning-content/80 active:bg-warning-content/20"
        >
          Contact Us
        </Link>
        <button
          type="button"
          onClick={ dismiss }
          className="px-4 pt-1 pb-1.5 text-sm border-2 border-transparent rounded-md transition hover:cursor-pointer hover:bg-warning-content/10 active:bg-warning-content/20"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
