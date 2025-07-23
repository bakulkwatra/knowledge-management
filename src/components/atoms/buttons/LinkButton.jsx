const LinkButton = ({ children, href = "#", ...rest }) => {
  return (
    <a
      href={href}
      className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...rest}
    >
      {children}
    </a>
  );
};

export default LinkButton;