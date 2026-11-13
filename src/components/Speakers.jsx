import alexRiviera from '../assets/speakers/alex-riviera.jpg'
import ninaLi from '../assets/speakers/nina-li.jpg'
import marcusHolt from '../assets/speakers/marcus-holt.jpg'
import almaCastro from '../assets/speakers/alma-castro.jpg'
import jonasWeber from '../assets/speakers/jonas-weber.jpg'
import rinaPatel from '../assets/speakers/rina-patel.jpg'
import Button from './Button.jsx'
import Marquee from './Marquee.jsx'
import SpeakerCard from './SpeakerCard.jsx'
import './Speakers.css'

const SPEAKER_ROWS = [
  [
    { name: 'Alex Riviera', role: 'Creative Director, Spotify', photo: alexRiviera, align: 'center' },
    { name: 'Nina Li', role: 'Head of UX, Figma', photo: ninaLi, align: 'end' },
    { name: 'Marcus Holt', role: 'Design Futurist', photo: marcusHolt, align: 'start' },
  ],
  [
    { name: 'Alma Castro', role: 'Senior Product Designer, Airbnb', photo: almaCastro, align: 'end' },
    { name: 'Jonas Weber', role: 'Independent Type Designer', photo: jonasWeber, align: 'center' },
    { name: 'Rina Patel', role: 'Innovation Lead, Google Design', photo: rinaPatel, align: 'start' },
  ],
]

function Speakers() {
  return (
    <section id="speakers" className="section speakers" aria-labelledby="speakers-title">
      <div className="section__inner">
        <Marquee id="speakers-title" text="Speakers" />

        {SPEAKER_ROWS.map((row, i) => (
          <div key={i} className="speakers__row">
            {row.map((speaker) => (
              <SpeakerCard key={speaker.name} {...speaker} />
            ))}
          </div>
        ))}
      </div>

      <div className="speakers__cta">
        <Button size="L" href="#become-a-speaker">
          Become a speaker
        </Button>
      </div>
    </section>
  )
}

export default Speakers
