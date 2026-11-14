import { useEffect, useRef, useState } from 'react'
import Button from './Button.jsx'
import './Register.css'

const FIELDS = [
  { name: 'firstName', label: 'First name', placeholder: 'first name', type: 'text', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Second name', placeholder: 'second name', type: 'text', autoComplete: 'family-name' },
  { name: 'email', label: 'Email', placeholder: 'email', type: 'email', autoComplete: 'email' },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = 'Please enter your first name'
  if (!values.lastName.trim()) errors.lastName = 'Please enter your second name'
  if (!values.email.trim()) errors.email = 'Please enter your email address'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address'
  return errors
}

function Register() {
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false) // a submit was attempted
  const [registered, setRegistered] = useState(false)
  const inputRefs = useRef({})
  const successRef = useRef(null)

  // Move focus to the thank-you message so it's announced and visible
  useEffect(() => {
    if (registered) successRef.current?.focus()
  }, [registered])

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    // After the first submit attempt, re-check as the visitor fixes things
    if (submitted) setErrors(validate(next))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validate(values)
    setErrors(found)

    const firstInvalid = FIELDS.find((f) => found[f.name])
    if (firstInvalid) {
      inputRefs.current[firstInvalid.name]?.focus()
      return
    }

    // No backend yet: nothing is sent or stored.
    // To connect a form service later, send `values` here (e.g. with fetch)
    // and only show the thank-you message once it succeeds.
    setRegistered(true)
  }

  return (
    <section id="register" className="section register" aria-labelledby="register-title">
      <div className="section__inner register__inner">
        <h2 id="register-title" className="section-title register__title">
          Register
        </h2>

        {registered ? (
          <div className="register__success" role="status" tabIndex={-1} ref={successRef}>
            <p className="register__success-title">Thanks, you’re registered!</p>
            <p className="register__success-text">See you in Athens, April 3–5.</p>
          </div>
        ) : (
          <form className="register__form" onSubmit={onSubmit} noValidate>
            <div className="register__fields">
              {FIELDS.map((field) => {
                const error = errors[field.name]
                const errorId = `register-${field.name}-error`
                return (
                  <div key={field.name} className="register__field">
                    <label htmlFor={`register-${field.name}`} className="visually-hidden">
                      {field.label}
                    </label>
                    <input
                      ref={(el) => (inputRefs.current[field.name] = el)}
                      id={`register-${field.name}`}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={onChange}
                      required
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? errorId : undefined}
                      className={`register__input${error ? ' has-error' : ''}`}
                    />
                    {error && (
                      <p id={errorId} className="register__error">
                        {error}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            <Button type="submit" size="L">
              Register now
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Register
