const LoadingSpinner = ({ 
  size = 'md', 
  color = 'green',
  overlay = false,
  text = 'Loading...',
  showText = false,
  className = ''
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };
  
  const colors = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    red: 'text-red-600'
  };
  
  const spinnerClasses = `animate-spin ${sizes[size]} ${colors[color]} ${className}`;
  
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-2 my-8">
      <svg
        className={spinnerClasses}
        fill="none"
        viewBox="0 0 24 24"
      >
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
      {showText && (
        <p className="text-sm text-gray-600 mt-2">{text}</p>
      )}
    </div>
  );
  
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          {spinner}
        </div>
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner; 