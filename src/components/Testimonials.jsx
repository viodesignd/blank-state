import { TESTIMONIALS } from '../data/testimonials.js'
import { useInView } from '../hooks/useInView.js'
import Marquee from './Marquee.jsx'
import './Testimonials.css'

const STAGGER = 0.2 // seconds between cards

function Testimonials() {
  // Fade the cards in once, when ~40% of the section is visible
  const [sectionRef, inView] = useInView(0.4)

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`section testimonials${inView ? ' is-visible' : ''}`}
      aria-labelledby="testimonials-title"
    >
      <div className="section__inner testimonials__inner">
        <Marquee id="testimonials-title" text="Testimonials" className="testimonials__title" />

        <ul className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <li
              key={t.name}
              className={`testimonial testimonial--${i + 1}`}
              style={{ '--delay': `${i * STAGGER}s` }}
            >
              <figure className="testimonial__figure">
                <span className="testimonial__avatar" aria-hidden="true" />
                <figcaption className="testimonial__author">
                  {t.name}/ {t.role}
                </figcaption>
                <blockquote className="testimonial__quote">
                  <p>“{t.quote}”</p>
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Testimonials
