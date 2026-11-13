import './WhyAttend.css'

const PILLARS = [
  { title: 'Challenge the Norms', text: 'Break outdated design patterns.' },
  { title: 'Future-Driven Talks', text: 'Tech, AI, and evolving design systems.' },
  { title: 'Real Creative Connections', text: 'Meet creators shaping what’s next.' },
  { title: 'Limit-Pushing Workshops', text: 'Experiment with tools and ideas live.' },
]

function WhyAttend() {
  return (
    <section className="section why-attend" aria-labelledby="why-attend-title">
      <div className="section__inner">
        <h2 id="why-attend-title" className="section-title">
          Why Attend
        </h2>

        <ul className="why-attend__pillars">
          {PILLARS.map((pillar, i) => (
            <li key={pillar.title} className={`pillar pillar--${i + 1}`}>
              <span className="pillar__icon" aria-hidden="true" />
              <h3 className="pillar__title">{pillar.title}</h3>
              <p className="pillar__text">{pillar.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WhyAttend
