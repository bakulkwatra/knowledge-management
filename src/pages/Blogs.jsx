import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import blogsData from "../data/mockBlogs";
import BlogCard from "../components/BlogCard";
import CategoryFilter from "../components/CategoryFilter";
import FeaturedBlog from "../components/FeaturedBlog";
import { PlusIcon } from '@heroicons/react/24/outline';
import AddBlogForm from "../pages/AddBlogForm";
import Breadcrumbs from "../components/atoms/navigation/breadcrumbs";
import { PrimaryButton } from "../components/atoms";
import PaginationArrow from "../components/atoms/navigation/PaginationArrow";

const Blogs = () => {
  const location = useLocation();
  const isBlog = location.pathname === "/km/blogs"; // Adjust this if your base path is /km

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);

  const filteredBlogs = selectedCategory === "All"
    ? blogsData
    : blogsData.filter(blog => blog.category === selectedCategory);

  const featuredBlog = blogsData[Math.floor(Math.random() * blogsData.length)];

  const breadcrumbItems = [
    { label: "Home", to: "/km" },
    { label: "Blogs", to: null },
  ];

  return (
    <div className="font-sans min-h-screen bg-gray-50 text-gray-900">
      {isBlog ? (
        <>
          <div className="px-3 py-7 w-11/12 mx-auto mt-16 max-w-screen-xl">
            <div className="text-sm text-gray-500 mb-4">
              <Breadcrumbs items={breadcrumbItems} />
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-extrabold text-gray-900">Blogs</h1>
              <PrimaryButton
                onClick={() => setShowAddBlogForm(true)}
                className="rounded-full px-5 py-2 text-base flex items-center gap-2 group bg-blue-900 hover:bg-blue-800 shadow-lg"
              >
                <PlusIcon className="h-5 w-5 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-yellow-500 group-hover:to-purple-500 group-hover:bg-clip-text" />
                <span className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-yellow-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-500">
                  Add Blog
                </span>
              </PrimaryButton>
            </div>

            <FeaturedBlog blog={featuredBlog} />

            <h2 className="text-3xl font-bold mb-4 text-gray-900">Popular topics</h2>

            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            <div className="flex justify-between items-center mt-12 py-4 border-t border-gray-200">
              <PaginationArrow direction="left" onClick={() => {}} disabled={false} />
              <PaginationArrow direction="right" onClick={() => {}} disabled={false} />
            </div>
          </div>

          {showAddBlogForm && (
            <AddBlogForm onClose={() => setShowAddBlogForm(false)} />
          )}
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Blogs;
