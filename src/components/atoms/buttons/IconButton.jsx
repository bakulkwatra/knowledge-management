const IconButton = ({
  onClick,
  icon: Icon,
  label = "Action",
  children,
  className = "",
  ...rest
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`rounded p-1 focus:outline-none flex items-center gap-1 ${className}`}
      {...rest}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default IconButton;
