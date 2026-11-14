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
      <Header />
      <main>
        <Hero />
        <WhyAttend />
        <Speakers />
        <Agenda />
        <Testimonials />
        <Register />
      </main>
      <Footer />
    </>
  )
}

export default App
