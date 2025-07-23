const LoadingButton = ({ type = "button", loading = false, children, ...rest }) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`rounded px-4 py-2 text-sm text-white focus:outline-none focus:ring-2
        ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"}`}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default LoadingButton;