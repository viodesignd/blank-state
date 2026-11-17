import './Form.css'

/* Renders form fields from settings, with screen-reader labels and
   error messages linked to their input.
   Field: { name, label, placeholder, type?, autoComplete?, as?: 'textarea', rows? } */
function FormFields({ fields, form, idPrefix, className = '' }) {
  return (
    <div className={className}>
      {fields.map((field) => {
        const id = `${idPrefix}-${field.name}`
        const error = form.errors[field.name]
        const errorId = `${id}-error`
        const Control = field.as === 'textarea' ? 'textarea' : 'input'

        return (
          <div key={field.name} className="form-field">
            <label htmlFor={id} className="visually-hidden">
              {field.label}
            </label>
            <Control
              ref={form.setRef(field.name)}
              id={id}
              name={field.name}
              type={Control === 'input' ? (field.type ?? 'text') : undefined}
              rows={Control === 'textarea' ? (field.rows ?? 3) : undefined}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={form.values[field.name]}
              onChange={form.onChange}
              required={Boolean(field.required)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className={`form-input${Control === 'textarea' ? ' form-input--textarea' : ''}${error ? ' has-error' : ''}`}
            />
            {/* Always rendered so screen readers announce it when an error appears or changes */}
            <p id={errorId} className="form-error" aria-live="polite">
              {error}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default FormFields
