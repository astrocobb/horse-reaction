import { Clock4, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router'


const quickLinks = [
  { href: '#services', label: 'Services' },
  { href: '#service-area', label: 'Service Area' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' }
]

export default function Footer() {
  return (
    <footer
      className="px-4 py-11 transition-colors duration-300 bg-base-800 sm:px-6 sm:py-12 md:px-8 md:py-13 lg:px-10 lg:py-14">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 gap-8 mb-8 sm:grid-cols-3 sm:justify-items-center sm:gap-10 sm:mb-10 md:gap-12 md:mb-12 lg:gap-16">

          {/* Company Info */ }
          <div>
            <div className="flex items-center mb-4">
              <img src="/assets/images/dawg-dark.png" alt="Husky Logo" className="h-8 ml-1 mr-4"/>
              <h3 className="text-xl font-bold text-base-100 sm:text-2xl">
                Husky Well & Pump Service
              </h3>
            </div>
            <p className="leading-relaxed text-base-300">
              Professional water well drilling and pump services throughout central New Mexico.
            </p>
          </div>

          {/* Contact Info */ }
          <div>
            <h3 className="mb-4 text-xl font-bold text-base-100 sm:text-2xl">
              Contact
            </h3>
            <div className="space-y-3">
              <Link
                to="tel:5058640779"
                className="group flex items-center transition hover:text-secondary"
              >
                <Phone className="inline w-5 h-5 mr-3 text-success transition-transform group-hover:scale-110 group-hover:text-secondary"/>
                <span className="text-base-300 group-hover:text-secondary">(505) 864-0779</span>
              </Link>
              <Link
                to="mailto:huskywellservice@gmail.com"
                className="group flex items-center"
              >
                <Mail className="inline w-5 h-5 mr-3 text-error transition-transform group-hover:scale-110 group-hover:text-secondary"/>
                <span className="text-base-300 group-hover:text-secondary">huskywellservice@gmail.com</span>
              </Link>
              <div className="flex items-center text-base-300">
                <Clock4 className="inline w-5 h-5 mr-3 text-primary"/>
                <span>Mon-Fri: 9AM-5PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */ }
          <div>
            <h3 className="mb-4 text-xl font-bold text-base-150 sm:text-2xl">
              Quick Links
            </h3>
            <nav className="space-y-2">
              { quickLinks.map(link => (
                <Link
                  key={ link.href }
                  to={ link.href }
                  className="block transition duration-200 transform hover:translate-x-1 text-base-300 hover:text-secondary"
                >
                  { link.label }
                </Link>
              )) }
            </nav>
          </div>
        </div>

        {/* Copyright */ }
        <div className="pt-6 text-center border-t border-primary-300 sm:pt-8">
          <p className="text-sm text-base-100 sm:text-base">
            &copy; 2025 Husky Well & Pump Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
