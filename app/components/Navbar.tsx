import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Link } from 'react-router'


const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#service-area', label: 'Service Area' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About Us' }
]

export default function Navbar() {

  const [ menuOpen, setMenuOpen ] = useState(false)

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl rounded-md text-base-content bg-base-50/10 border border-base-50/20 shadow-lg backdrop-blur-md transition-colors duration-300 sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-5rem)]">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between py-3 lg:py-0">

          {/* Logo */ }
          <Link to="" className="group flex items-center">
            <img src="/assets/images/dawg-dark.png" alt="Husky Logo" className="h-11"/>
          </Link>

          {/* Hamburger Button (mobile only) */ }
          <button
            type="button"
            onClick={ () => setMenuOpen(prev => !prev) }
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-base-content rounded-md transition hover:cursor-pointer hover:bg-base-800/50 focus:bg-base-850/50 lg:hidden"
            aria-controls="navbar-menu"
            aria-expanded={ menuOpen }
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="w-6 h-6"/>
          </button>

          {/* Navigation Menu */ }
          <div className={ `${ menuOpen ? '' : 'hidden' } w-full lg:block lg:w-auto` } id="navbar-menu">
            <ul className="flex flex-col gap-2 pr-0 py-3 rounded-md lg:flex-row lg:items-center lg:m-0 md:rounded-none">
              { navLinks.map(link => (
                <li key={ link.href }>
                  <Link
                    to={ link.href }
                    onClick={ () => setMenuOpen(false) }
                    className="block px-3 py-2 pb-2.5 text-base-content rounded-md border border-transparent transition hover:bg-base-100/20 focus:bg-base-100/40 md:inline-block"
                  >
                    { link.label }
                  </Link>
                </li>
              )) }
              <li>
                <Link
                  to="#contact"
                  onClick={ () => setMenuOpen(false) }
                  className="block px-6 pt-2 pb-2.5 font-semibold border-2 border-base-50/50 text-base-50 rounded-md shadow-md transition hover:bg-base-50/20 hover:border-base-50/70 focus:bg-base-50/30 focus:border-base-50/70 md:inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  )
}