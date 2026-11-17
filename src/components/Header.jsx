import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo-white.svg'
import Button from './Button.jsx'
import './Header.css'

const NAV_LINKS = [
  { href: '#speakers', label: 'Speakers' },
  { href: '#agenda', label: 'Schedule' },
  { href: '#why-attend', label: 'About' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const pendingHash = useRef(null) // section to scroll to once the menu has closed
  const headerRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)

  // In-page links inside the menu: close first (unlocking scroll), then jump
  const onMenuClick = (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return
    e.preventDefault()
    pendingHash.current = link.getAttribute('href')
    setMenuOpen(false)
  }

  // While the menu is open: lock page scroll, close on Esc,
  // keep keyboard focus inside the menu, then return focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return
    const menu = menuRef.current
    const toggle = toggleRef.current
    const focusables = () => [...menu.querySelectorAll('a[href], button:not([disabled])')]

    document.body.style.overflow = 'hidden'
    focusables()[0]?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      toggle?.focus({ preventScroll: true })

      const hash = pendingHash.current
      pendingHash.current = null
      if (hash) {
        document.querySelector(hash)?.scrollIntoView()
        history.pushState(null, '', hash)
      }
    }
  }, [menuOpen])

  // Share the sticky header's height with the CSS (--header-height),
  // so in-page links don't hide section titles underneath it
  useEffect(() => {
    const header = headerRef.current
    const root = document.documentElement
    const update = () => root.style.setProperty('--header-height', `${header.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(header)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--header-height')
    }
  }, [])

  // Close the menu if the window grows past the mobile header size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => e.matches && setMenuOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header ref={headerRef} className="header">
      <a href="/" className="header__logo" aria-label="Blank State home">
        <img src={logo} alt="Blank State" width="441.551" height="68.944" />
      </a>

      <nav className="header__nav" aria-label="Main">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <Button size="S" className="header__cta">
        Register now
      </Button>

      {/* Mobile: hamburger */}
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-label="Menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen(true)}
      >
        <span className="menu-toggle__bar" />
        <span className="menu-toggle__bar" />
        <span className="menu-toggle__bar" />
      </button>

      {/* Mobile: full-screen menu, slides in from the right */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
        onClick={onMenuClick}
      >
        <div className="mobile-menu__top">
          <a href="/" className="header__logo" aria-label="Blank State home" onClick={closeMenu}>
            <img src={logo} alt="Blank State" width="441.551" height="68.944" />
          </a>
          <button type="button" className="menu-close" aria-label="Close menu" onClick={closeMenu}>
            <span className="menu-close__bar" />
            <span className="menu-close__bar" />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Main menu">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
