import { BadgeCheck, Handshake, House, ShieldCheck } from 'lucide-react'


const timeline = [
  {
    year: '1958',
    text: 'Charles "Richard" Herrera began his career with Teton Exploration as a drill hand, helping in uranium exploration near Riverton, Wyoming. At just 18 years old, his work primarily involved shoveling drill cuttings and supporting the drilling crew.'
  },
  {
    year: '1965',
    text: 'Richard and his wife, Hope, relocated to Grants, New Mexico, where Teton Exploration continued its uranium drilling operations.'
  },
  {
    year: '1989',
    text: (<>After nearly three decades of working in extreme environments, advancing through multiple positions, and
      gaining deep field experience, Richard and his family moved to Belen, New Mexico. There, he purchased his first
      drilling rig and founded his own water well drilling company, <em>Star Drilling.</em></>)
  },
  {
    year: '1992',
    text: (<><em>Star Drilling</em> was rebranded as <em>Husky Drilling</em> and began delivering fresh water to
      communities throughout the Rio Grande Valley.</>)
  },
  {
    year: 'Present',
    text: (<><em>Husky</em> continues to serve the region as environmental demands, geological conditions, and industry
      regulations evolve. Through these changes, we remain committed to providing reliable, clean water to our
      customers.</>)
  }
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Reliability',
    description: 'We show up on time and get the job done right. Your water supply is too important for anything less.'
  },
  {
    icon: BadgeCheck,
    title: 'Quality',
    description: 'We use the best equipment and techniques to ensure lasting results you can depend on.'
  },
  {
    icon: Handshake,
    title: 'Integrity',
    description: 'Honest pricing, transparent communication, and doing what\'s right for our customers.'
  },
  {
    icon: House,
    title: 'Community',
    description: 'Proud to serve our neighbors throughout New Mexico with dedicated local service.'
  }
]

export default function About() {
  return (
    <section
      id="about"
      className="px-4 pt-32 pb-11 transition-colors duration-300 scroll-mt-0 sm:px-6 sm:pt-32 sm:pb-12 md:px-8 md:pt-28 md:pb-13 lg:px-10 lg:pt-32 lg:pb-14"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="mb-3 text-2xl font-bold text-left text-base-content sm:mb-5 md:text-3xl md:mb-7 lg:text-4xl lg:mb-9">
          About Us
        </h2>

        {/* Our History */ }
        <div className="mb-11 sm:mb-13 md:mb-14 lg:mb-16">
          <h3 className="mb-8 font-bold text-base-150 sm:text-lg md:text-xl lg:text-2xl">
            Our History
          </h3>
          <div className="relative pl-8 border-l-4 border-secondary sm:pl-12">
            { timeline.map((item, i) => (
              <div key={ item.year } className={ `group relative ${ i < timeline.length - 1 ? 'mb-10' : '' }` }>
                <div
                  className="absolute -left-20 top-1 w-4 h-4 bg-secondary rounded-full transition-transform duration-300 group-hover:scale-125 sm:-left-14"/>
                <div
                  className="p-5 bg-base-750/80 border border-base-600/50 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 sm:p-6 md:p-8">
                  <div className="mb-3 text-xl font-bold text-secondary sm:text-2xl">
                    { item.year }
                  </div>
                  <p className="text-base-300">
                    { item.text }
                  </p>
                </div>
              </div>
            )) }
          </div>
        </div>

        {/* Our Values */ }
        <div className="border-t border-primary">
          <h3
            className="mt-9 mb-3 font-bold text-base-150 sm:text-lg sm:mt-10 sm:mb-5 md:text-xl md:mt-11 md:mb-7 lg:text-2xl lg:mt-12 lg:mb-9">
            Our Values
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-10 xl:grid-cols-4">
            { values.map(value => (
              <div
                key={ value.title }
                className="p-5 text-center bg-base-750/80 border border-base-600/50 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 sm:p-6 md:p-8 lg:p-10"
              >
                <value.icon className="block w-14 h-14 mx-auto mb-4 text-secondary"/>
                <h3 className="mb-2 text-lg font-bold text-base-150 md:text-xl lg:text-2xl">
                  { value.title }
                </h3>
                <p className="text-base-300">
                  { value.description }
                </p>
              </div>
            )) }
          </div>
        </div>
      </div>
    </section>
  )
}
