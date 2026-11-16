import { useEffect, useRef } from 'react'
import './Form.css'

/* Thank-you message: announced by screen readers and focused when it appears */
function FormSuccess({ title, text, className = '', children }) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div ref={ref} className={`form-success ${className}`.trim()} role="status" tabIndex={-1}>
      <p className="form-success__title">{title}</p>
      {text && <p className="form-success__text">{text}</p>}
      {children}
    </div>
  )
}

export default FormSuccess
