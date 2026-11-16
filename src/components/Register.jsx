import { useForm } from '../hooks/useForm.js'
import Button from './Button.jsx'
import FormFields from './FormFields.jsx'
import FormSuccess from './FormSuccess.jsx'
import './Register.css'

const FIELDS = [
  { name: 'firstName', label: 'First name', placeholder: 'first name', autoComplete: 'given-name', required: 'Please enter your first name' },
  { name: 'lastName', label: 'Second name', placeholder: 'second name', autoComplete: 'family-name', required: 'Please enter your second name' },
  { name: 'email', label: 'Email', placeholder: 'email', type: 'email', autoComplete: 'email', required: 'Please enter your email address' },
]

function Register() {
  const form = useForm(FIELDS)

  return (
    <section id="register" className="section register" aria-labelledby="register-title">
      <div className="section__inner register__inner">
        <h2 id="register-title" className="section-title register__title">
          Register
        </h2>

        {form.done ? (
          <FormSuccess
            className="register__success"
            title="Thanks, you’re registered!"
            text="See you in Athens, April 3–5."
          />
        ) : (
          <form className="register__form" onSubmit={form.onSubmit} noValidate>
            <FormFields fields={FIELDS} form={form} idPrefix="register" className="register__fields" />

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
