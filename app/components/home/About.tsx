const timeline = [
  {
    year: '1958',
    text: 'Charles “Richard” Herrera began his career with Teton Exploration as a drill hand, helping in uranium exploration near Riverton, Wyoming. At just 18 years old, his work primarily involved shoveling drill cuttings and supporting the drilling crew.'
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
    year: 'Today',
    text: (<><em>Husky</em> continues to serve the region as environmental demands, geological conditions, and industry
      regulations evolve. Through these changes, we remain committed to providing reliable, clean water to our
      customers.</>)
  }
]

const values = [
  {
    title: 'Reliability',
    description: 'We show up on time and get the job done right. Your water supply is too important for anything less.'
  },
  {
    title: 'Quality',
    description: 'We use the best equipment and techniques to ensure lasting results you can depend on.'
  },
  {
    title: 'Integrity',
    description: 'Honest pricing, transparent communication, and doing what’s right for our customers.'
  },
  {
    title: 'Community',
    description: 'Proud to serve our neighbors throughout New Mexico with dedicated local service.'
  }
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-4 py-20 border-t border-rule sm:px-6 sm:py-24 lg:px-10 lg:py-32">
      <div className="grid max-w-7xl gap-10 mx-auto lg:grid-cols-12 lg:gap-12">

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="about-title" className="section-title">About</h2>
            <p className="max-w-md mt-5 text-ink-soft">
              Husky started with one man, one rig, and three decades of drilling behind him. Here’s how we got here.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ol className="border-t-2 border-ink">
            { timeline.map(item => (
              <li key={ item.year } className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-5 py-7 border-b border-rule sm:grid-cols-[9rem_1fr] sm:gap-x-10 sm:py-9">
                <p className="font-display text-[2rem] font-bold leading-none tabular sm:text-[2.75rem]">{ item.year }</p>
                <p className="max-w-prose">{ item.text }</p>
              </li>
            )) }
          </ol>

          <h3 className="mt-20 font-display text-[2rem] font-bold leading-none sm:text-[2.5rem]">Our values</h3>
          <dl className="grid gap-x-10 gap-y-8 mt-8 sm:grid-cols-2">
            { values.map(value => (
              <div key={ value.title } className="pt-4 border-t-2 border-ink">
                <dt className="font-display text-2xl font-bold">{ value.title }</dt>
                <dd className="mt-2 text-ink-soft">{ value.description }</dd>
              </div>
            )) }
          </dl>
        </div>

      </div>
    </section>
  )
}
