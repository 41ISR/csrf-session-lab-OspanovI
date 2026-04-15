const Button = ({ children, onClick, className = '', disabled, ...rest }) => {
  const combinedClassName = `btn ${className}`;
  return (
    <button
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
