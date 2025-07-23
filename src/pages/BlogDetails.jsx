// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { blogService } from "../services/blogService";
// import blogsData from "../data/mockBlogs";
// import BlogCard from "../components/BlogCard";
// import Comments from "../components/Comments"
// import Breadcrumbs from "../components/atoms/navigation/breadcrumbs";
// import RatingStars from "../components/atoms/media&display/RatingStars";

// const {
// like,unlike,getLikes,checkLike
// } = blogService;

// const BlogDetails = () => {
//   const { id } = useParams();
//   const blog = blogsData.find(b => b.id === parseInt(id));
//   const relatedBlogs = blogsData.filter(b => b.id !== blog?.id).slice(0, 3);
//   const [liked, setLiked] = useState(false); // frontend toggle
//   const [likeCount, setLikeCount] = useState(0);

//   const userId = "abcd";

//   const [rating, setRating] = useState(3);

//   const breadcrumbItems = [
//     { label: "Home", to: "/#" },
//     { label: "Blogs", to: "/blogs" },
//     { label: blog?.title || "Blog", to: null },
//   ];


//   useEffect(() => {
//   const fetchLikeData = async () => {
//     try {
//       const count = await getLikes(blog.id);
//       setLikeCount(count);
//       const hasLiked = await checkLike(blog.id, userId);
//       setLiked(hasLiked);
//     } catch (error) {
//       console.error("Error fetching like count:", error);
//     }
//   };

//   fetchLikeData();
// }, [blog.id]);

// // const handleLikeToggle = async () => {
// //   try {
// //     if (liked) {
// //       await unlike(blog.id, userId);
// //       setLikeCount(prev => prev - 1);
// //     } else {
// //       await like(blog.id, userId);
// //       setLikeCount(prev => prev + 1);
// //     }
// //     setLiked(!liked);
// //   } catch (error) {
// //     console.error("Error toggling like:", error);
// //   }
// // };

// const handleLikeToggle = async () => {
//   try {
//     if (liked) {
//       await unlike(blog.id, userId);
//       setLikeCount(prev => Math.max(prev - 1, 0));
//       setLiked(false);
//     } else {
//       await like(blog.id, userId);
//       setLikeCount(prev => prev + 1);
//       setLiked(true);
//     }
//   } catch (error) {
//     console.error("Error toggling like:", error);
//     alert("Something went wrong while updating like status.");
//   }
// };


//   if (!blog) return <div className="p-8 text-center">Blog not found.</div>;

//   return (
//     <div className="mt-20 px-4">
//       {/* Centered Content Area */}
// <div className="max-w-7xl mx-auto px-4 py-4">
//   {/* Breadcrumbs */}
//   <div className="w-11/12 mx-auto mb-4">
//       <Breadcrumbs items={breadcrumbItems} />
//     </div>

//   {/* Category pill, title, and author */}
//   <div className="mt-16 w-2/3 mx-auto ">
    
//     <h1 className="text-4xl font-bold mb-4 text-left break-words">{blog.title}</h1>
    
//   </div>

//   {/* Top Image */}
//   <div className="w-11/12 mx-auto">
    
//   </div>

//   {/* 3-column layout */}
//   <div className="flex flex-col lg:flex-row gap-4">
//     {/* Left Column */}
//     <div className="hidden lg:block lg:w-[200px] sticky top-24 self-start">
//       <Link to="/#" className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-sm font-medium block text-center">
//         ← Back to Blogs
//       </Link>
//       <RatingStars value={rating} onChange={setRating} />
//       <p className="text-xs text-gray-500 mt-1 text-right">Posted on: {blog.date}</p>
//     </div>

//     {/* Center Content */}
//     <div className="flex-1 pr-1">
//       <div className="prose max-w-full mb-8 text-[#495057] text-md leading-8">
//         <img src={blog.image} alt={blog.title} className="w-full h-100 object-cover rounded-xl mb-6" />
//         {blog.content}</div>

//       <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-3">{blog.category}</span>

//       <div className="mt-auto pt-5 border-t border-gray-200 flex items-center gap-3 min-h-[64px]">
//             <img
//             src={`https://i.pravatar.cc/48?u=${blog.id}`}
//             alt={blog.author}
//             className="w-10 h-10 rounded-full object-cover"
//             />
//             <div>
//             <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
//                 {blog.authorId}
//             </p>
//             <p className="text-xs text-gray-600 mt-0.5">{blog.category}</p>
            
//             </div>
//         </div>

//       {/* Comment Box */}
//       <Comments blogId={blog.id } blogAuthorId={blog.authorId || "someDefaultAuthor"} // prevent undefined
//   userId={userId}/>
      
//     </div>

//     {/* Right Actions */}
//     <div className="hidden lg:block lg:w-[200px] sticky top-24 self-start space-y-4">
//   <button
//     onClick={handleLikeToggle}
//     className={`w-full px-4 py-2 text-white text-sm rounded transition duration-200 ${
//       liked ? "bg-red-600" : "bg-red-500 hover:bg-red-600"
//     }`}
//   >
//     {liked ? "❤️ Liked" : "🤍 Like"}
//   </button>

//   <div className="text-center text-sm text-gray-600">
//     {likeCount} {likeCount === 1 ? "like" : "likes"}
//   </div>

//   <button className="w-full px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200">Share</button>
// </div>
//   </div>

//   {/* Related Blogs */}
//   <div className="mt-16 w-11/12 mx-auto">
//     <h2 className="text-2xl font-bold mb-4">Related Blogs</h2>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {relatedBlogs.map(blog => (
//         <BlogCard key={blog.id} blog={blog} />
//       ))}
//     </div>
//   </div>
// </div>
// </div>
//   );
// };

// export default BlogDetails;



import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { resourceService } from "../services/kmService";
import blogsData from "../data/mockBlogs";
import BlogCard from "../components/BlogCard";
import Comments from "../components/Comments"
import Breadcrumbs from "../components/atoms/navigation/breadcrumbs";
import RatingStars from "../components/atoms/media&display/RatingStars";

const {
like,unlike,getLikes,checkLike
} = resourceService;

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogsData.find(b => b.id === parseInt(id));
  const relatedBlogs = blogsData.filter(b => b.id !== blog?.id).slice(0, 3);
  const [liked, setLiked] = useState(false); // frontend toggle
  const [likeCount, setLikeCount] = useState(0);

  const userId = "abcd";

  const [rating, setRating] = useState(3);

  const breadcrumbItems = [
    { label: "Home", to: "/#" },
    { label: "Blogs", to: "/blogs" },
    { label: blog?.title || "Blog", to: null },
  ];


  useEffect(() => {
  const fetchLikeData = async () => {
    try {
      const count = await getLikes(blog.id);
      setLikeCount(count);
      const hasLiked = await checkLike(blog.id, userId);
      setLiked(hasLiked);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  fetchLikeData();
}, [blog.id]);

// const handleLikeToggle = async () => {
//   try {
//     if (liked) {
//       await unlike(blog.id, userId);
//       setLikeCount(prev => prev - 1);
//     } else {
//       await like(blog.id, userId);
//       setLikeCount(prev => prev + 1);
//     }
//     setLiked(!liked);
//   } catch (error) {
//     console.error("Error toggling like:", error);
//   }
// };

const handleLikeToggle = async () => {
  try {
    if (liked) {
      await unlike(blog.id, userId);
      setLikeCount(prev => Math.max(prev - 1, 0));
      setLiked(false);
    } else {
      await like(blog.id, userId);
      setLikeCount(prev => prev + 1);
      setLiked(true);
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    alert("Something went wrong while updating like status.");
  }
};


  if (!blog) return <div className="p-8 text-center">Blog not found.</div>;

  return (
    <div className="mt-20 px-4">
      {/* Centered Content Area */}
<div className="max-w-7xl mx-auto px-4 py-4">
  {/* Breadcrumbs */}
  <div className="w-11/12 mx-auto mb-4">
      <Breadcrumbs items={breadcrumbItems} />
    </div>

  {/* Category pill, title, and author */}
  <div className="mt-16 w-2/3 mx-auto ">
    
    <h1 className="text-4xl font-bold mb-4 text-left break-words">{blog.title}</h1>
    
  </div>

  {/* Top Image */}
  <div className="w-11/12 mx-auto">
    
  </div>

  {/* 3-column layout */}
  <div className="flex flex-col lg:flex-row gap-4">
    {/* Left Column */}
    <div className="hidden lg:block lg:w-[200px] sticky top-24 self-start">
      <Link to="/#" className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-sm font-medium block text-center">
        ← Back to Blogs
      </Link>
      <RatingStars value={rating} onChange={setRating} />
      <p className="text-xs text-gray-500 mt-1 text-right">Posted on: {blog.date}</p>
    </div>

    {/* Center Content */}
    <div className="flex-1 pr-1">
      <div className="prose max-w-full mb-8 text-[#495057] text-md leading-8">
        <img src={blog.image} alt={blog.title} className="w-full h-100 object-cover rounded-xl mb-6" />
        {blog.content}</div>

      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-3">{blog.category}</span>

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

      {/* Comment Box */}
      <Comments 
  resourceId={blog.id}
  resourceType="blogs"
  resourceOwnerId={blog.authorId || "someDefaultAuthor"} // fallback
  userId={userId}
/>
      
    </div>

    {/* Right Actions */}
    <div className="hidden lg:block lg:w-[200px] sticky top-24 self-start space-y-4">
  <button
    onClick={handleLikeToggle}
    className={`w-full px-4 py-2 text-white text-sm rounded transition duration-200 ${
      liked ? "bg-red-600" : "bg-red-500 hover:bg-red-600"
    }`}
  >
    {liked ? "❤️ Liked" : "🤍 Like"}
  </button>

  <div className="text-center text-sm text-gray-600">
    {likeCount} {likeCount === 1 ? "like" : "likes"}
  </div>

  <button className="w-full px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200">Share</button>
</div>
  </div>

  {/* Related Blogs */}
  <div className="mt-16 w-11/12 mx-auto">
    <h2 className="text-2xl font-bold mb-4">Related Blogs</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedBlogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  </div>
</div>
</div>
  );
};

export default BlogDetails;
