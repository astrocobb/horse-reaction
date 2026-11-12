import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Menu, Phone, X } from 'lucide-react'
import { huskyPhone } from '~/data/husky-data'
import NoticeBar from '~/components/NoticeBar'
import type { Notice } from '~/utils/notices'


const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#service-area', label: 'Service area' },
  { href: '#gallery', label: 'On the job' },
  { href: '#rigs', label: 'Our rigs' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
]

export default function Navbar({ notices }: { notices: Notice[] }) {

  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ scrolled, setScrolled ] = useState(false)

  // Transparent over the hero photo, solid once the page moves
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The hero has its own call button; only show ours once that one has scrolled up under the bar
  const [ heroCallVisible, setHeroCallVisible ] = useState(true)

  useEffect(() => {
    const heroCall = document.querySelector('[data-hero-call]')
    if (!heroCall) {
      setHeroCallVisible(false)
      return
    }
    const observer = new IntersectionObserver(
      ([ entry ]) => setHeroCallVisible(entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px' } // h-16 bar covers the top of the viewport
    )
    observer.observe(heroCall)
    return () => observer.disconnect()
  }, [])

  const solid = scrolled || menuOpen
  const showCall = !heroCallVisible || menuOpen

  return (
    <header
      className={ `fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${ solid ? 'bg-paper text-ink border-b border-rule' : 'bg-transparent text-white border-b border-transparent' }` }
    >
      <NoticeBar notices={ notices } collapsed={ solid }/>
      <nav className="relative flex items-center justify-between max-w-7xl h-16 mx-auto px-4 sm:px-6 lg:px-10" aria-label="Main">

        <Link to="#home" className="flex items-center gap-3" onClick={ () => setMenuOpen(false) }>
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
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul
            id="nav-menu"
            className={ `${ menuOpen ? 'flex' : 'hidden' } absolute inset-x-0 top-full flex-col px-4 pb-4 bg-paper text-ink border-b border-rule sm:px-6 lg:static lg:flex lg:flex-row lg:items-center lg:p-0 lg:bg-transparent lg:text-inherit lg:border-0` }
          >
            { navLinks.map(link => (
              <li key={ link.href }>
                <Link
                  to={ link.href }
                  onClick={ () => setMenuOpen(false) }
                  className="block py-3 text-lg font-medium underline-offset-4 decoration-2 hover:underline lg:px-3 lg:py-2 lg:text-base"
                >
                  { link.label }
                </Link>
              </li>
            )) }
          </ul>

          {/* Collapses to zero width while hidden so the links don't leave a gap; inert keeps it out of the tab order */ }
          <div
            inert={ !showCall }
            className={ `grid transition-[grid-template-columns,opacity] duration-300 ease-out motion-reduce:transition-none ${ showCall ? 'grid-cols-[1fr] opacity-100' : 'grid-cols-[0fr] opacity-0' }` }
          >
            <div className="overflow-hidden">
              <a
                href={ huskyPhone.href }
                className="inline-flex items-center gap-2 h-10 px-4 ml-1 font-semibold text-white tabular whitespace-nowrap bg-livery rounded-sm transition-colors hover:bg-livery-dark"
              >
                <Phone aria-hidden="true" className="w-4 h-4"/>
                <span className="hidden sm:inline">{ huskyPhone.display }</span>
                <span className="sm:hidden">Call</span>
              </a>
            </div>
          </div>

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
