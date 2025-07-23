import { Link } from "react-router-dom";
import blogsData from "../data/mockBlogs";

const FeaturedBlog = ({ blog }) => {
  return (
    <div className="relative h-[400px] rounded-xl overflow-hidden mb-10">
      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col justify-end p-2">
        <span className="text-sm bg-red-600 text-white px-3 py-1 rounded-full w-fit mb-2">{blog.category}</span>
        <Link to={`/blogs/${blog.id}`}>
          <h2 className="text-3xl font-bold text-white mb-2">{blog.title}</h2>
        </Link>
        <p className="text-white text-sm">By {blog.author} • {blog.date}</p>
      </div>
    </div>
  );
};

export default FeaturedBlog;
