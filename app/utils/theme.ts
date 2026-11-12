import { useSyncExternalStore } from 'react'


export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'husky-theme'
const CHANGE_EVENT = 'husky-theme-change'

/**
 * Runs inline in <head> before first paint so a dark-mode visitor never sees a flash of the light page.
 * Uses the saved choice if there is one, otherwise the system preference.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${ STORAGE_KEY }');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function subscribe(onChange: () => void) {
  // Follow the system setting until the visitor picks one themselves
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onSystemChange = (e: MediaQueryListEvent) => {
    if (localStorage.getItem(STORAGE_KEY)) return
    document.documentElement.classList.toggle('dark', e.matches)
    onChange()
  }
  media.addEventListener('change', onSystemChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    media.removeEventListener('change', onSystemChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Private mode or storage disabled: the choice just won't persist
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** Current theme. Always 'light' during SSR and hydration, then the real value. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'light')
}
