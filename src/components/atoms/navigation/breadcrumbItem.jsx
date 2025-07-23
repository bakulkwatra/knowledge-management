import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // Optional icon

const BreadcrumbItem = ({ label, to, isLast }) => {
  return (
    <span className="flex items-center">
      {!isLast ? (
        <Link
          to={to}
          className="hover:underline text-gray-700"
          aria-label={`Go to ${label}`}
        >
          {label}
        </Link>
      ) : (
        <span
          className="text-black font-medium"
          aria-current="page"
        >
          {label}
        </span>
      )}
      {!isLast && (
        <ChevronRight
          className="mx-1 w-4 h-4 text-gray-400"
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export default BreadcrumbItem;
