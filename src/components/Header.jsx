import logo from '../assets/logo-white.svg'
import Button from './Button.jsx'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo" aria-label="Blank State home">
        <img src={logo} alt="Blank State" width="441.551" height="68.944" />
      </a>

      <nav className="header__nav" aria-label="Main">
        <a href="#speakers">Speakers</a>
        <a href="#agenda">Schedule</a>
        <a href="#why-attend">About</a>
      </nav>

      <Button size="S">Register now</Button>
    </header>
  )
}

export default Header
