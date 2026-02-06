export const Button = ({ 
  children, 
  type = 'button', 
  onClick, 
  disabled = false,
  variant = 'primary',
  fullWidth = false 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900';
  
  const variantStyles = {
    primary: 'bg-white text-black hover:bg-gray-200 focus:ring-white disabled:bg-gray-600 disabled:cursor-not-allowed',
    secondary: 'bg-neutral-700 text-white border border-neutral-600 hover:bg-neutral-600 focus:ring-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles}`}
    >
      {children}
    </button>
  );
};
