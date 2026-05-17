import './Button.scss'

function Button({
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  className = '',
}) {
  const buttonClassName = ['button', `button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
