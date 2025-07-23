const SecondaryButton = ({ type = "button", children, ...rest }) => {
  return (
    <button
      type={type}
      className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      {...rest}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
