import HuskyMap from '~/components/maps/HuskyMap'
import { ContactForm } from '~/components/home/contact/contact-form'

// Contact Section
export default function Contact() {
  return (
    <section
      id="contact"
      className="px-4 pt-32 pb-11 bg-base-750 transition-colors duration-300 scroll-mt-0 sm:px-6 sm:pt-32 sm:pb-12 md:px-8 md:pt-28 md:pb-13 lg:px-10 lg:pt-32 lg:pb-14"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="mb-1 text-2xl font-bold text-left text-base-content sm:mb-5 md:text-3xl md:mb-4 lg:text-4xl lg:mb-6">
          Contact Us
        </h2>
        <h3 className="mb-3 text-left text-base-300 sm:mb-5 md:mb-6 lg:mb-7">
          Please enter your information below, and we will get back to you as soon as possible.
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <ContactForm/>
          <HuskyMap/>
          {/*<HuskyDetails/>*/ }
        </div>
      </div>
    </section>
  )
}