import Agenda from './components/Agenda.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
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
      </main>
    </>
  )
}

export default App
