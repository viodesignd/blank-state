import { useState } from 'react'
import './Marquee.css'

const REPEAT = 6

/* A heading whose text scrolls continuously, with a pause/play button
   (WCAG 2.2.2). It also pauses on hover, and stands still with reduced motion.
   Screen readers get the text once; the scrolling copies are hidden from them.

   Usage: <Marquee text="Speakers" id="speakers-title" />
   text      – the words to repeat (required)
   id        – heading id, e.g. for aria-labelledby
   as        – heading tag (default "h2")
   className – extra classes on the heading, for per-section spacing */
function Marquee({ text, as: Tag = 'h2', id, className = '' }) {
  const [paused, setPaused] = useState(false)

  const group = (
    <span className="marquee__group">
      {Array.from({ length: REPEAT }, (_, i) => (
        <span key={i} className="marquee__word">
          {text}
        </span>
      ))}
    </span>
  )

  return (
    <div className="marquee-wrap">
      <Tag id={id} className={`section-title marquee${paused ? ' is-paused' : ''} ${className}`.trim()}>
        <span className="visually-hidden">{text}</span>
        <span className="marquee__track" aria-hidden="true">
          {group}
          {group}
        </span>
      </Tag>

      {/* Outside the heading, so its label isn't read as part of the title */}
      <button
        type="button"
        className="marquee__toggle"
        aria-label={`${paused ? 'Play' : 'Pause'} ${text} animation`}
        onClick={() => setPaused((p) => !p)}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
          {paused ? (
            <path d="M4 2l10 6-10 6z" fill="currentColor" />
          ) : (
            <path d="M3 2h4v12H3zM9 2h4v12H9z" fill="currentColor" />
          )}
        </svg>
      </button>
    </div>
  )
}

export default Marquee
