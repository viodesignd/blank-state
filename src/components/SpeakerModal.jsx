import { useEffect, useRef, useState } from 'react'
import { useForm } from '../hooks/useForm.js'
import Button from './Button.jsx'
import FormFields from './FormFields.jsx'
import FormSuccess from './FormSuccess.jsx'
import './SpeakerModal.css'

const FIELDS = [
  { name: 'name', label: 'Name', placeholder: 'name', autoComplete: 'name', required: 'Please enter your name' },
  { name: 'email', label: 'Email', placeholder: 'email', type: 'email', autoComplete: 'email', required: 'Please enter your email address' },
  { name: 'topic', label: 'Talk topic', placeholder: 'talk topic', as: 'textarea', rows: 3, required: 'Please tell us your talk topic' },
]

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
const CLOSE_DURATION = 250 // ms, matches the closing animation in SpeakerModal.css
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* "Become a speaker" form in an accessible modal (native <dialog>):
   - the page behind is inert while open; focus starts on the first field
   - closes with the X button, Esc, or a click outside the box
   - Tab / Shift+Tab stay inside; focus returns to the opening button
   - animates in and out (no motion with prefers-reduced-motion) */
/* triggerRef: the button that opens the modal — focus returns there on close */
function SpeakerModal({ open, onClose, triggerRef }) {
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)
  const pressedOutside = useRef(false)
  const closeTimer = useRef(null)
  const isOpen = useRef(false) // the dialog is shown (until finishClose runs)
  const pendingFocus = useRef(false) // focus the first field once the form is rendered
  const [closing, setClosing] = useState(false)
  const form = useForm(FIELDS)
  const { reset, focusFirst } = form

  // Open: fresh form, show as modal, lock page scroll
  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || dialog.open) return
    returnFocusRef.current = triggerRef?.current ?? document.activeElement
    reset()
    dialog.showModal()
    isOpen.current = true
    document.body.style.overflow = 'hidden'
    pendingFocus.current = true
  }, [open, reset, triggerRef])

  // After the (fresh) form has rendered, move focus to the first field
  useEffect(() => {
    if (pendingFocus.current && open && !form.done) {
      pendingFocus.current = false
      focusFirst()
    }
  })

  // Close for real: hide the dialog, unlock scrolling, return focus
  const finishClose = () => {
    if (!isOpen.current) return
    isOpen.current = false
    clearTimeout(closeTimer.current)
    if (dialogRef.current.open) dialogRef.current.close()
    setClosing(false)
    document.body.style.overflow = ''
    returnFocusRef.current?.focus({ preventScroll: true })
    onClose()
  }

  // Play the closing animation, then close
  const requestClose = () => {
    if (closing) return
    if (reducedMotion()) {
      finishClose()
      return
    }
    setClosing(true)
    closeTimer.current = setTimeout(finishClose, CLOSE_DURATION)
  }

  // Esc: animate out instead of closing instantly
  const onCancel = (e) => {
    e.preventDefault()
    requestClose()
  }

  // Click outside = on the backdrop (the dialog element itself, outside the panel).
  // Only when the press also started there, so drag-selecting text doesn't close it.
  const onPointerDown = (e) => {
    pressedOutside.current = e.target === dialogRef.current
  }
  const onClick = (e) => {
    if (pressedOutside.current && e.target === dialogRef.current) requestClose()
    pressedOutside.current = false
  }

  // Keep Tab / Shift+Tab inside the modal
  const onKeyDown = (e) => {
    if (e.key !== 'Tab') return
    const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement
    if (e.shiftKey && (active === first || !dialogRef.current.contains(active) || active === dialogRef.current)) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // If the component unmounts while open, unlock scrolling
  useEffect(() => () => {
    clearTimeout(closeTimer.current)
    document.body.style.overflow = ''
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={`speaker-modal${closing ? ' is-closing' : ''}`}
      aria-labelledby="speaker-modal-title"
      onCancel={onCancel}
      onClose={finishClose}
      onPointerDown={onPointerDown}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className="speaker-modal__panel">
        <div className="speaker-modal__header">
          {/* After sending, only the message shows; the title stays for screen readers */}
          <h2
            id="speaker-modal-title"
            className={form.done ? 'visually-hidden' : 'speaker-modal__title'}
          >
            Become a speaker
          </h2>
          <button type="button" className="speaker-modal__close" aria-label="Close" onClick={requestClose}>
            <span className="speaker-modal__close-bar" />
            <span className="speaker-modal__close-bar" />
          </button>
        </div>

        {form.done ? (
          <FormSuccess
            className="speaker-modal__success"
            title="Thank you for your interest."
            text="We will get back to you soon."
          >
            <Button type="button" size="L" className="speaker-modal__done" onClick={requestClose}>
              Close
            </Button>
          </FormSuccess>
        ) : (
          <form className="speaker-modal__form" onSubmit={form.onSubmit} noValidate>
            <FormFields fields={FIELDS} form={form} idPrefix="speaker" className="speaker-modal__fields" />
            <Button type="submit" size="L">
              Send proposal
            </Button>
          </form>
        )}
      </div>
    </dialog>
  )
}

export default SpeakerModal
