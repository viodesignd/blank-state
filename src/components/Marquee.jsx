import './Marquee.css'

const REPEAT = 6

/* A heading whose text scrolls continuously (pauses on hover).
   Screen readers get the text once; the scrolling copies are hidden from them. */
function Marquee({ text, as: Tag = 'h2', id }) {
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
    <Tag id={id} className="section-title marquee">
      <span className="visually-hidden">{text}</span>
      <span className="marquee__track" aria-hidden="true">
        {group}
        {group}
      </span>
    </Tag>
  )
}

export default Marquee
