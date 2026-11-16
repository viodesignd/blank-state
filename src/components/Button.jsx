import './Button.css'

/* Main button (Figma "Button", sizes S and L).
   - As a link (default): <Button href="#register">Register now</Button>
   - As a form button:    <Button type="submit">Register now</Button>
   - As an action:        <Button type="button" onClick={open}>Become a speaker</Button> */
function Button({ children, size = 'S', href = '#register', type, onClick, className = '', ...rest }) {
  const classes = `button button--${size.toLowerCase()} ${className}`.trim()

  if (type) {
    return (
      <button type={type} className={classes} onClick={onClick} {...rest}>
        {children}
      </button>
    )
  }

  return (
    <a href={href} className={classes} onClick={onClick} {...rest}>
      {children}
    </a>
  )
}

export default Button
