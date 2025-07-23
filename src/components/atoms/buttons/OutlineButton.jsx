const OutlineButton = ({ type = "button", children, ...rest }) => {
  return (
    <button
      type={type}
      className="rounded border border-blue-600 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...rest}
    >
      {children}
    </button>
  );
};

export default OutlineButton;