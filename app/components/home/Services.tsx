import { ArrowDownToLine, Cog, Droplet, Wrench } from 'lucide-react'


const services = [
  {
    icon: ArrowDownToLine,
    title: 'Drilling',
    description: 'Professional water well drilling services for residential, agricultural, and commercial properties. We use tried and true methods to ensure efficient and reliable wells.'
  },
  {
    icon: Droplet,
    title: 'Pump Installation',
    description: 'Expert installation of submersible and surface pumps. We\'ll help you select the right pump system for your water needs and ensure a proper installation.'
  },
  {
    icon: Wrench,
    title: 'Well Services',
    description: 'Emergency well services. We diagnose and fix issues quickly to restore your water supply with minimal downtime.'
  },
  {
    icon: Cog,
    title: 'Maintenance',
    description: 'Regular maintenance plans to keep your well and pump systems running smoothly. Prevent costly repairs with preventative care.'
  }
]

export default function Services() {
  return (
    <section
      id="services"
      className="px-4 pt-32 pb-11 transition-colors duration-300 scroll-mt-0 sm:px-6 sm:pt-32 sm:pb-12 md:px-8 md:pt-28 md:pb-13 lg:px-10 lg:pt-32 lg:pb-14"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="mb-3 text-2xl font-bold text-left text-base-content md:text-3xl md:mb-7 lg:text-4xl lg:mb-9">
          Services
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-10 xl:grid-cols-4">
          { services.map(service => (
            <div
              key={ service.title }
              className="p-5 text-center bg-base-800/50 border border-base-600/50 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 sm:p-6 md:p-8 lg:p-10"
            >
              <service.icon className="block w-14 h-14 mx-auto mb-4 text-secondary"/>
              <h3 className="mb-2 text-lg font-bold text-base-150 md:text-xl lg:text-2xl">
                { service.title }
              </h3>
              <p className="text-base-300">
                { service.description }
              </p>
            </div>
          )) }
        </div>
      </div>
    </section>
  )
}
