import { useRef, useState } from 'react'
import { AGENDA } from '../data/agenda.js'
import { useInView } from '../hooks/useInView.js'
import Timeline from './Timeline.jsx'
import './Agenda.css'

const FIRST_DRAW = 1.5 // seconds, when the section scrolls into view
const SWITCH_DRAW = 0.8 // seconds, when switching days

function Agenda() {
  const [activeId, setActiveId] = useState(AGENDA[0].id)
  const [drawDuration, setDrawDuration] = useState(FIRST_DRAW)
  // Start the animation once, when ~40% of the section is visible
  const [sectionRef, inView] = useInView(0.4)
  const tabRefs = useRef([])

  const selectDay = (id) => {
    if (id === activeId) return
    setDrawDuration(SWITCH_DRAW)
    setActiveId(id)
  }

  // Arrow keys move between tabs (standard tabs pattern)
  const onTabKeyDown = (e, index) => {
    const last = AGENDA.length - 1
    let next = null
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1
    if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    selectDay(AGENDA[next].id)
    tabRefs.current[next]?.focus()
  }

  const activeDay = AGENDA.find((day) => day.id === activeId)

  return (
    <section ref={sectionRef} id="agenda" className="section agenda" aria-labelledby="agenda-title">
      <div className="section__inner agenda__inner">
        <div className="agenda__heading">
          <h2 id="agenda-title" className="section-title agenda__title">
            Agenda
          </h2>
        </div>

        <div className="agenda__tabs" role="tablist" aria-label="Conference days">
          {AGENDA.map((day, i) => {
            const selected = day.id === activeId
            return (
              <button
                key={day.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`agenda-tab-${day.id}`}
                aria-selected={selected}
                aria-controls="agenda-panel"
                tabIndex={selected ? 0 : -1}
                className={`date-tab${selected ? ' is-selected' : ''}`}
                onClick={() => selectDay(day.id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
              >
                {day.label}
              </button>
            )
          })}
        </div>

        <div
          id="agenda-panel"
          className="agenda__panel"
          role="tabpanel"
          aria-labelledby={`agenda-tab-${activeId}`}
        >
          {/* key → remount on day change, so the drawing animation replays */}
          <Timeline
            key={activeId}
            talks={activeDay.talks}
            play={inView}
            duration={drawDuration}
          />
        </div>
      </div>
    </section>
  )
}

export default Agenda
