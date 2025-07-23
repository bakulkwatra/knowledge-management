const PrimaryButton = ({ type = "button", children, ...rest }) => {
  return (
    <button
      type={type}
      className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
