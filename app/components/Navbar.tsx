import { useEffect, useState } from 'react'
import { Menu, Moon, Phone, Sun, X } from 'lucide-react'
import { huskyPhone } from '~/data/husky-data'
import { setTheme, useTheme } from '~/utils/theme'


const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#service-area', label: 'Service area' },
  { href: '#gallery', label: 'On the job' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
]

export default function Navbar() {

  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ scrolled, setScrolled ] = useState(false)
  const theme = useTheme()

  // Transparent over the hero photo, solid once the page moves
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={ `fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${ solid ? 'bg-paper text-ink border-b border-rule' : 'bg-transparent text-white border-b border-transparent' }` }
    >
      <nav className="flex items-center justify-between max-w-7xl h-16 mx-auto px-4 sm:px-6 lg:px-10" aria-label="Main">

        <a href="#home" className="flex items-center gap-3" onClick={ () => setMenuOpen(false) }>
          {/* Navy logo on the light bar; the light logo over the photo and on the dark bar */ }
          <img
            src="/assets/images/dawg.png"
            alt=""
            className={ `h-9 w-auto dark:hidden ${ solid ? '' : 'hidden' }` }
          />
          <img
            src="/assets/images/dawg-dark.png"
            alt=""
            className={ `h-9 w-auto mix-blend-screen ${ solid ? 'hidden dark:block' : '' }` }
          />
          <span className="font-display text-2xl font-bold leading-none">
            Husky
            <span className="sr-only"> Well & Pump Service, home</span>
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul
            id="nav-menu"
            className={ `${ menuOpen ? 'flex' : 'hidden' } absolute inset-x-0 top-16 flex-col px-4 pb-4 bg-paper text-ink border-b border-rule sm:px-6 lg:static lg:flex lg:flex-row lg:items-center lg:p-0 lg:bg-transparent lg:text-inherit lg:border-0` }
          >
            { navLinks.map(link => (
              <li key={ link.href }>
                <a
                  href={ link.href }
                  onClick={ () => setMenuOpen(false) }
                  className="block py-3 text-lg font-medium underline-offset-4 decoration-2 hover:underline lg:px-3 lg:py-2 lg:text-base"
                >
                  { link.label }
                </a>
              </li>
            )) }
          </ul>

          <button
            type="button"
            onClick={ () => setTheme(theme === 'dark' ? 'light' : 'dark') }
            className="inline-flex items-center justify-center w-10 h-10 rounded-sm hover:cursor-pointer"
            aria-label={ theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode' }
            title={ theme === 'dark' ? 'Light mode' : 'Dark mode' }
          >
            { theme === 'dark' ? <Sun aria-hidden="true" className="w-5 h-5"/> : <Moon aria-hidden="true" className="w-5 h-5"/> }
          </button>

          <a
            href={ huskyPhone.href }
            className="inline-flex items-center gap-2 h-10 px-4 ml-1 font-semibold text-white tabular bg-livery rounded-sm transition-colors hover:bg-livery-dark"
          >
            <Phone aria-hidden="true" className="w-4 h-4"/>
            <span className="hidden sm:inline">{ huskyPhone.display }</span>
            <span className="sm:hidden">Call</span>
          </a>

          <button
            type="button"
            onClick={ () => setMenuOpen(prev => !prev) }
            className="inline-flex items-center justify-center w-10 h-10 rounded-sm hover:cursor-pointer lg:hidden"
            aria-controls="nav-menu"
            aria-expanded={ menuOpen }
          >
            <span className="sr-only">{ menuOpen ? 'Close menu' : 'Open menu' }</span>
            { menuOpen ? <X aria-hidden="true" className="w-6 h-6"/> : <Menu aria-hidden="true" className="w-6 h-6"/> }
          </button>
        </div>

      </nav>
    </header>
  )
}
