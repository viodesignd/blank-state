import './Timeline.css'

/* Geometry (desktop, from the Figma timeline) */
const WIDTH = 1320 // line width
const DEPTH = 196 // vertical distance between top and bottom levels
const LAST_SPACE = 430 // room reserved for the last talk's label / final flat
const LABEL_NUDGE = 10 // labels start slightly left of their flat segment
const FADE_DURATION = 0.4 // seconds

/* Build the zigzag: each talk gets a flat segment (alternating top/bottom),
   joined by diagonal slopes. Returns the SVG path and, per talk, where its
   label goes and when the drawing line reaches it. */
function buildTimeline(count) {
  const step = count > 1 ? (WIDTH - LAST_SPACE) / (count - 1) : 0
  const flat = step / 2

  const points = []
  const starts = []
  for (let i = 0; i < count; i++) {
    const y = i % 2 === 0 ? 0 : DEPTH
    const start = i * step
    const end = i === count - 1 ? WIDTH : start + flat
    starts.push(start)
    points.push([start, y], [end, y])
  }

  // Cumulative length along the path to each talk's flat start
  const reachAt = []
  let length = 0
  points.forEach(([x, y], p) => {
    if (p > 0) {
      const [px, py] = points[p - 1]
      length += Math.hypot(x - px, y - py)
    }
    if (p % 2 === 0) reachAt.push(length) // even points are flat starts
  })
  const total = length || 1

  const d = points.map(([x, y], p) => `${p === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y}`).join(' ')

  const labels = starts.map((start, i) => {
    const left = Math.max(0, start - LABEL_NUDGE)
    const isLast = i === count - 1
    return {
      left,
      maxWidth: isLast ? WIDTH - left : 2 * step - 24,
      progress: reachAt[i] / total, // 0–1: share of the line drawn when reached
      level: i % 2 === 0 ? 'top' : 'bottom',
    }
  })

  return { d, labels }
}

/* play: start the animation (section is in view)
   duration: seconds for the line to draw from left to right */
function Timeline({ talks, play, duration }) {
  const { d, labels } = buildTimeline(talks.length)

  return (
    <div
      className={`timeline${play ? ' is-playing' : ''}`}
      style={{ '--draw-duration': `${duration}s`, '--fade-duration': `${FADE_DURATION}s` }}
    >
      <svg
        className="timeline__line"
        width={WIDTH}
        height={DEPTH}
        viewBox={`0 0 ${WIDTH} ${DEPTH}`}
        aria-hidden="true"
        focusable="false"
      >
        <path d={d} pathLength="1" />
      </svg>

      <ol className="timeline__talks">
        {talks.map((talk, i) => {
          const label = labels[i]
          return (
            <li
              key={`${talk.time}-${talk.title}`}
              className={`talk talk--${label.level}`}
              style={{
                left: `${label.left}px`,
                maxWidth: `${label.maxWidth}px`,
                '--delay': `${(label.progress * duration).toFixed(3)}s`,
              }}
            >
              <div className="talk__content">
                <time className="talk__time" dateTime={talk.time}>
                  {talk.time}
                </time>
                <div className="talk__info">
                  <p className="talk__title">{talk.title}</p>
                  {talk.speaker && <p className="talk__speaker">{talk.speaker}</p>}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Timeline
