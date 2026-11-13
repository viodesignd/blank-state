import Button from './Button.jsx'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__message">
          <h1 className="hero__title">
            <span>BREAK THE GRID.</span>
            <span className="hero__title-line2">REBUILD THE   FUTURE.</span>
          </h1>
          <p className="hero__tagline">Rethink. Rewrite. Rebuild.</p>
        </div>

        <div className="hero__cta">
          <Button size="L">Register now</Button>
        </div>
      </div>

      <p className="hero__date">
        april 3-5, 2026/
        <br />
        Athens, Greece
        <br />
        SNFCC
      </p>
    </section>
  )
}

export default Hero
