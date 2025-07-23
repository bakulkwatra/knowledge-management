const PaginationDot = ({ isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`mx-1 h-2 w-2 rounded-full ${
      isActive ? "bg-blue-600" : "bg-gray-300"
    }`}
    aria-label="Pagination Dot"
  />
);

export default PaginationDot;