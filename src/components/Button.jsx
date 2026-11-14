import './Button.css'

/* Main button (Figma "Button", sizes S and L).
   - As a link (default): <Button href="#register">Register now</Button>
   - As a form button:    <Button type="submit">Register now</Button> */
function Button({ children, size = 'S', href = '#register', type, className = '' }) {
  const classes = `button button--${size.toLowerCase()} ${className}`.trim()

  if (type) {
    return (
      <button type={type} className={classes}>
        {children}
      </button>
    )
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}

export default Button
