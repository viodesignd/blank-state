import { Analytics } from '@vercel/analytics/react'
import Agenda from './components/Agenda.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Register from './components/Register.jsx'
import Speakers from './components/Speakers.jsx'
import Testimonials from './components/Testimonials.jsx'
import WhyAttend from './components/WhyAttend.jsx'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <WhyAttend />
        <Speakers />
        <Agenda />
        <Testimonials />
        <Register />
      </main>
      <Footer />
      {/* Vercel Web Analytics: page views, only counted on the deployed site */}
      <Analytics />
    </>
  )
}

export default App
