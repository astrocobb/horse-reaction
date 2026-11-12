import { useSyncExternalStore } from 'react'


export type Theme = 'light' | 'dark'

const DARK_QUERY = '(prefers-color-scheme: dark)'

/**
 * Runs inline in <head> before first paint so a dark-mode visitor never sees a flash of the light page.
 * The theme always follows the visitor's system preference.
 */
export const themeInitScript = `(function(){try{document.documentElement.classList.toggle('dark',matchMedia('${ DARK_QUERY }').matches)}catch(e){}})()`

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function subscribe(onChange: () => void) {
  // Keep following the system setting if it changes while the page is open
  const media = window.matchMedia(DARK_QUERY)
  const onSystemChange = (e: MediaQueryListEvent) => {
    document.documentElement.classList.toggle('dark', e.matches)
    onChange()
  }
  media.addEventListener('change', onSystemChange)
  return () => media.removeEventListener('change', onSystemChange)
}

/** Current theme. Always 'light' during SSR and hydration, then the real value. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'light')
}
