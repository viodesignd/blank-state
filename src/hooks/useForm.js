import { useCallback, useRef, useState } from 'react'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Checks values against the field settings:
     required: 'message'  → shown when the field is empty
     type: 'email'        → also checks the address format */
export function validateFields(fields, values) {
  const errors = {}
  fields.forEach((field) => {
    const value = (values[field.name] ?? '').trim()
    if (!value) {
      if (field.required) errors[field.name] = field.required
    } else if (field.type === 'email' && !EMAIL_PATTERN.test(value)) {
      errors[field.name] = field.invalid ?? 'Please enter a valid email address'
    }
  })
  return errors
}

const emptyValues = (fields) => Object.fromEntries(fields.map((f) => [f.name, '']))

/* Shared form logic (Register + Become a speaker):
   values, errors, live re-checking after the first submit attempt,
   focus on the first invalid field, and the "done" state for the thank-you
   message. Nothing is sent anywhere. */
export function useForm(fields) {
  const [values, setValues] = useState(() => emptyValues(fields))
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false) // a submit was attempted
  const [done, setDone] = useState(false)
  const inputRefs = useRef({})

  const setRef = (name) => (el) => {
    inputRefs.current[name] = el
  }

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    // After the first submit attempt, re-check as the visitor fixes things
    if (submitted) setErrors(validateFields(fields, next))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validateFields(fields, values)
    setErrors(found)

    const firstInvalid = fields.find((f) => found[f.name])
    if (firstInvalid) {
      inputRefs.current[firstInvalid.name]?.focus()
      return
    }

    // No backend yet: nothing is sent or stored.
    // To connect a form service later, send `values` here (e.g. with fetch)
    // and only show the thank-you message once it succeeds.
    setDone(true)
  }

  // Stable between renders (fields are a constant), safe in effect dependencies
  const reset = useCallback(() => {
    setValues(emptyValues(fields))
    setErrors({})
    setSubmitted(false)
    setDone(false)
  }, [fields])

  const focusFirst = useCallback(() => inputRefs.current[fields[0].name]?.focus(), [fields])

  return { values, errors, done, onChange, onSubmit, setRef, reset, focusFirst }
}
