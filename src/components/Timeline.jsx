import { useLayoutEffect, useRef, useState } from 'react'
import './Timeline.css'

/* ---------- Geometry (from the Figma timelines) ----------
   Horizontal (desktop + tablet): the line fills the container width; flats
   alternate top/bottom, 196px apart, and the last ~33% is kept for the last
   talk's label.
   Vertical (mobile): flats alternate right/left; the line is 196px wide inside
   a 347px box, talks are ~133px apart and the line draws top to bottom. */
const MOBILE_QUERY = '(max-width: 600px)'

const H_DEPTH = 196
const H_LAST_RATIO = 430 / 1320
const H_LABEL_NUDGE = 10

const V_BOX = 347 // width of the vertical timeline box
const V_LINE_LEFT = 66 / V_BOX // left level, as a share of the box
const V_DEPTH = 196 / V_BOX // distance between left and right levels
const V_STEP = 133.5 // vertical distance between talks
const V_LAST_SPACE = 104 // line below the last talk
const V_LABEL_GAP_RIGHT = 31 // label → line, right-level talks
const V_LABEL_GAP_LEFT = 23 // line → label, left-level talks

const FADE_DURATION = 0.4 // seconds

/* Zigzag along one axis: each talk gets a flat segment (alternating levels),
   joined by diagonals. Returns the points (along, level) and, per talk, where
   its flat starts and how far the drawing line has travelled when it gets there. */
function buildZigzag(count, length, lastSpace) {
  const step = count > 1 ? (length - lastSpace) / (count - 1) : 0
  const flat = step / 2

  const points = []
  const starts = []
  for (let i = 0; i < count; i++) {
    const level = i % 2
    const start = i * step
    const end = i === count - 1 ? length : start + flat
    starts.push(start)
    points.push([start, level], [end, level])
  }
  return { points, starts, step }
}

/* Share (0–1) of the line drawn when it reaches each flat start */
function progressAt(xy) {
  const reach = []
  let length = 0
  xy.forEach(([x, y], p) => {
    if (p > 0) {
      const [px, py] = xy[p - 1]
      length += Math.hypot(x - px, y - py)
    }
    if (p % 2 === 0) reach.push(length)
  })
  const total = length || 1
  return reach.map((r) => r / total)
}

const toPath = (xy) =>
  xy.map(([x, y], p) => `${p === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')

function horizontalLayout(count, width) {
  const { points, starts, step } = buildZigzag(count, width, width * H_LAST_RATIO)
  const xy = points.map(([along, level]) => [along, level * H_DEPTH])
  const progress = progressAt(xy)

  const labels = starts.map((start, i) => {
    const left = Math.max(0, start - H_LABEL_NUDGE)
    return {
      level: i % 2 === 0 ? 'top' : 'bottom',
      progress: progress[i],
      style: {
        left: `${left}px`,
        maxWidth: `${i === count - 1 ? width - left : 2 * step - 24}px`,
      },
    }
  })

  return { width, height: H_DEPTH, d: toPath(xy), labels }
}

function verticalLayout(count, width) {
  const box = Math.min(width, V_BOX)
  const offset = (width - box) / 2
  const lineLeft = offset + box * V_LINE_LEFT
  const lineRight = lineLeft + box * V_DEPTH
  const height = V_STEP * Math.max(count - 1, 0) + V_LAST_SPACE

  const { points, starts } = buildZigzag(count, height, V_LAST_SPACE)
  // First talk on the right, then alternate
  const xy = points.map(([along, level]) => [level === 0 ? lineRight : lineLeft, along])
  const progress = progressAt(xy)

  const labels = starts.map((start, i) => {
    const onRight = i % 2 === 0
    const style = onRight
      ? { top: `${start}px`, right: `${width - lineRight + V_LABEL_GAP_RIGHT}px`, maxWidth: `${lineRight - V_LABEL_GAP_RIGHT}px` }
      : { top: `${start}px`, left: `${lineLeft + V_LABEL_GAP_LEFT}px`, maxWidth: `${width - lineLeft - V_LABEL_GAP_LEFT}px` }
    return { level: onRight ? 'right' : 'left', progress: progress[i], style }
  })

  return { width, height, d: toPath(xy), labels }
}

/* Width of the timeline container + whether we're on mobile, kept up to date */
function useTimelineSize(ref) {
  const [size, setSize] = useState({ width: 0, vertical: false })

  useLayoutEffect(() => {
    const el = ref.current
    const mq = window.matchMedia(MOBILE_QUERY)
    const update = () => {
      const width = el.clientWidth
      const vertical = mq.matches
      setSize((prev) =>
        prev.width === width && prev.vertical === vertical ? prev : { width, vertical },
      )
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    mq.addEventListener('change', update)
    return () => {
      observer.disconnect()
      mq.removeEventListener('change', update)
    }
  }, [ref])

  return size
}

/* play: start the animation (section is in view)
   duration: seconds for the line to draw from start to end */
function Timeline({ talks, play, duration }) {
  const ref = useRef(null)
  const { width, vertical } = useTimelineSize(ref)
  const ready = width > 0
  const layout = ready
    ? (vertical ? verticalLayout : horizontalLayout)(talks.length, width)
    : null

  return (
    <div
      ref={ref}
      className={`timeline timeline--${vertical ? 'vertical' : 'horizontal'}${play && ready ? ' is-playing' : ''}`}
      style={{
        '--draw-duration': `${duration}s`,
        '--fade-duration': `${FADE_DURATION}s`,
        ...(vertical && layout ? { height: `${layout.height}px` } : null),
      }}
    >
      {layout && (
        <svg
          className="timeline__line"
          width={layout.width}
          height={layout.height}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          aria-hidden="true"
          focusable="false"
        >
          <path d={layout.d} pathLength="1" />
        </svg>
      )}

      <ol className="timeline__talks">
        {talks.map((talk, i) => {
          const label = layout?.labels[i]
          return (
            <li
              key={`${talk.time}-${talk.title}`}
              className={`talk talk--${label?.level ?? 'top'}`}
              style={
                label && {
                  ...label.style,
                  '--delay': `${(label.progress * duration).toFixed(3)}s`,
                }
              }
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
