interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
}

const TIMEOUT_MS = 5000

// Never throws: a network error, timeout or odd response counts as a failed check,
// so the form shows "Verification failed" instead of crashing the page
export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not set')
    return false
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(TIMEOUT_MS)
    })

    const data: TurnstileResponse = await response.json()
    if (!data.success) console.warn('Turnstile rejected token:', data['error-codes'])
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification request failed:', error)
    return false
  }
}
