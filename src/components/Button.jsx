import './Button.css'

function Button({ children, size = 'S', href = '#register', className = '' }) {
  return (
    <a href={href} className={`button button--${size.toLowerCase()} ${className}`.trim()}>
      {children}
    </a>
  )
}

export default Button
