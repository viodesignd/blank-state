import logo from '../assets/logo-white.svg'
import './Footer.css'

/* Footer content — edit here */
const FOOTER = {
  city: 'Athens, Greece',
  dates: 'april 3-5, 2026',
  venue: 'SNFCC',
  address: ['Center Syggrou', 'Avenue 364,', '17674 Kallithea'],
  social: [
    { label: 'instagram', href: 'https://www.instagram.com/vio_desgns/' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/lina-sirbu-8230971a6/' },
    { label: 'twitter', href: '' }, // add the URL when available
  ],
  copyright: 'VioDesigns @ 2025. All rights reserved.',
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <img
          className="footer__logo"
          src={logo}
          alt="Blank State"
          width="441.551"
          height="68.944"
          loading="lazy"
        />

        <div className="footer__info">
          <p className="footer__heading">{FOOTER.city}</p>
          <p className="footer__heading">{FOOTER.dates}</p>
          <div>
            <p className="footer__heading">{FOOTER.venue}</p>
            <address className="footer__address">
              {FOOTER.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
        </div>

        <ul className="footer__social">
          {FOOTER.social.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <a href="#" aria-disabled="true" onClick={(e) => e.preventDefault()}>
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <p className="footer__copyright">{FOOTER.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer
