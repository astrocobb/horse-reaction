import { Phone, Mail, Clock4 } from 'lucide-react'

const quickLinks = [
  { href: '#services', label: 'Services' },
  { href: '#service-area', label: 'Service Area' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' }
]

export default function Footer() {
  return (
    <footer className="px-4 py-11 bg-base-100 transition-colors duration-300 dark:bg-base-800 sm:px-6 sm:py-12 md:px-8 md:py-13 lg:px-10 lg:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 mb-8 sm:grid-cols-3 sm:justify-items-center sm:gap-10 sm:mb-10 md:gap-12 md:mb-12 lg:gap-16">

          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/assets/images/dawg-dark.png" alt="Husky Logo" className="h-8 mr-2" />
              <h3 className="text-xl font-bold text-base-content dark:text-dark-base-content sm:text-2xl">
                Husky Well & Pump Service
              </h3>
            </div>
            <p className="leading-relaxed text-base-750 dark:text-base-100">
              Professional water well drilling and pump services throughout central New Mexico.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-base-content dark:text-dark-base-content sm:text-2xl">
              Contact
            </h3>
            <div className="space-y-3">
              <a
              href="tel:5058640779"
              className="group flex items-center text-base-content transition hover:text-secondary dark:text-base-100 dark:hover:text-dark-secondary"
              >
                <Phone className="inline w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                <span>(505) 864-0779</span>
              </a>
              <a
              href="mailto:huskywellservice@gmail.com"
              className="group flex items-center text-base-content transition hover:text-secondary dark:text-base-100 dark:hover:text-dark-secondary"
              >
                <Mail className="inline w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                <span>huskywellservice@gmail.com</span>
              </a>
              <div className="flex items-center text-base-content dark:text-base-100">
                <Clock4 className="inline w-5 h-5 mr-3" />
                <span>Mon-Fri: 9AM-5PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-base-content dark:text-dark-base-content sm:text-2xl">
              Quick Links
            </h3>
            <nav className="space-y-2">
              {quickLinks.map(link => (
                <a
                key={link.href}
                href={link.href}
                className="block text-base-750 transition duration-200 transform hover:text-secondary hover:translate-x-1-x-1 dark:text-base-100 dark:hover:text-dark-secondary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center border-t border-primary-300 dark:border-dark-primary-300 sm:pt-8">
          <p className="text-sm text-base-content dark:text-dark-base-content sm:text-base">
            &copy; 2025 Husky Well & Pump Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
