const Card = ({ 
  children, 
  className = '', 
  padding = 'p-6',
  shadow = 'shadow-md',
  hover = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200 mb-6 flex flex-col items-center';
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : '';
  const classes = `${baseClasses} ${shadow} ${padding} ${hoverClasses} ${className}`;
  
  if (onClick) {
    return (
      <div 
        className={classes}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick(e);
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 ${className}`}>
    {children}
  </div>
);

// Export sub-components as properties of Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card; 