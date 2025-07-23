import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-gray-50 flex flex-col h-[500px]">
      {/* Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover"
      />

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Date */}
        <p className="text-xs text-gray-700 mb-1">{blog.date}</p>

        {/* Title */}
        {/* <Link to={`/blogs/${blog.id}`}>
          <h3 className="text-[#495057] text-lg font-semibold line-clamp-2 hover:text-blue-600 transition">
            {blog.title}
          </h3>
        </Link> */}


 <Link to={`/km/blogs/${blog.id}`}>
          <h3 className="text-[#495057] text-lg font-semibold line-clamp-2 hover:text-blue-600 transition">
            {blog.title}
          </h3>
        </Link>
        {/* Summary */}
        <p className="text-xs text-gray-700 mt-2 line-clamp-3">
          {blog.summary}
        </p>

        {/* Author section fixed to bottom with border */}
        <div className="mt-auto pt-5 border-t border-gray-200 flex items-center gap-3 min-h-[64px]">
            <img
            src={`https://i.pravatar.cc/48?u=${blog.id}`}
            alt={blog.authorId}
            className="w-10 h-10 rounded-full object-cover"
            />
            <div>
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                {blog.authorId}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">{blog.category}</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BlogCard;
