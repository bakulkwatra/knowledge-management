import React from "react";
import BreadcrumbItem from "./breadcrumbItem";

const Breadcrumbs = ({ items = [], className = "" }) => {
  return (
    <nav className={`text-sm text-gray-500 ${className}`} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <BreadcrumbItem
              label={item.label}
              to={item.to}
              isLast={index === items.length - 1}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
