import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900'
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 focus:ring-blue-500',
    secondary: 'bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 focus:ring-purple-500',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${props.disabled ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100' : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

