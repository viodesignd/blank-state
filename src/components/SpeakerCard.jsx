import './SpeakerCard.css'

/* align: where the card content sits inside its 511px slot
   ("start" | "center" | "end"), matching the staggered Figma layout. */
function SpeakerCard({ name, role, photo, align = 'start' }) {
  return (
    <article className={`speaker-card speaker-card--${align}`} tabIndex={0}>
      <div className="speaker-card__photo">
        <img src={photo} alt={name} width="312" height="262" loading="lazy" />
      </div>
      <div className="speaker-card__info">
        <h3 className="speaker-card__name">{name}</h3>
        <p className="speaker-card__role">{role}</p>
      </div>
    </article>
  )
}

export default SpeakerCard
