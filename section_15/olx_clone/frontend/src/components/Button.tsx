interface ButtonProps {
  children: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  className?: string
}

const Button = ({ children, onClick, className, ...rest }: ButtonProps) => {
  return (
    <button className={`button ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default Button;