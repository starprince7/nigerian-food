import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed my-2 mx-auto shadow-md hover:shadow-lg transform active:scale-95';
  
  const variants = {
    primary: 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white focus:ring-green-500',
    secondary: 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-900 focus:ring-gray-500',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 