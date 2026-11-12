import { huskyEmail, huskyPhone } from '~/data/husky-data'


const links = [
  { href: '#services', label: 'Services' },
  { href: '#service-area', label: 'Service area' },
  { href: '#gallery', label: 'On the job' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
]

export default function Footer() {
  return (
    <footer className="px-4 pt-14 pb-10 text-aquifer-ink bg-ink sm:px-6 lg:px-10">
      <div className="flex flex-col gap-10 max-w-7xl mx-auto lg:flex-row lg:items-start lg:justify-between">

        <div className="flex items-center gap-4">
          <img src="/assets/images/dawg-dark.png" alt="" className="h-14 w-auto mix-blend-screen"/>
          <p className="font-display text-3xl font-bold leading-none text-white">
            Husky Well
            <br/>& Pump Service
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            { links.map(link => (
              <li key={ link.href }>
                <a href={ link.href } className="underline-offset-4 hover:text-white hover:underline">{ link.label }</a>
              </li>
            )) }
          </ul>
        </nav>

        <div className="space-y-1 lg:text-right">
          <a href={ huskyPhone.href } className="block font-semibold text-white tabular hover:underline underline-offset-4">{ huskyPhone.display }</a>
          <a href={ `mailto:${ huskyEmail }` } className="block hover:text-white hover:underline underline-offset-4">{ huskyEmail }</a>
        </div>

      </div>
      <p className="max-w-7xl mx-auto mt-12 pt-6 text-sm border-t border-white/15">
        &copy; { new Date().getFullYear() } Husky Well & Pump Service
      </p>
    </footer>
  )
}
