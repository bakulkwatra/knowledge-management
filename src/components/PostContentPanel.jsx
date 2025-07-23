// import { FaFileAlt, FaFileUpload, FaQuestionCircle, FaPenNib } from "react-icons/fa";
// import { Outlet, useNavigate } from "react-router-dom";

// const PostContentPanel = () => {
//   const navigate = useNavigate();

//   const handleClick = (label) => {
//     if (label === "Blogs") {
//       navigate("blogs");
//     }
//     // Add more conditions if needed for other options
//   };
//   return (

    
//     <div className="bg-white border border-gray-200 shadow-md rounded overflow-hidden">
//       {/* Header */}
//       <div className="bg-gray-100 px-4 py-2">
//         <h2 className="text-base sm:text-lg font-bold text-black">Post a Content</h2>
//       </div>

//       {/* List of post options */}
//       <ul className="py-4 space-y-3">
//         {[
//           { label: "Articles", icon: <FaFileAlt /> },
//           { label: "Blogs", icon: <FaPenNib /> },
//           { label: "Documents", icon: <FaFileUpload /> },
//           { label: "Q & A", icon: <FaQuestionCircle /> },
//           { label: "Discussions", icon: <FaFileAlt /> },
//           { label: "Tags", icon: <FaFileAlt /> },
//         ].map((item, index) => (
//           <li
//             key={index}
//             onClick={()=>handleClick(item.label)}
//             className="flex items-center px-4 text-blue-700 hover:underline cursor-pointer text-sm sm:text-base"
//           >
//             <span className="text-base sm:text-lg mr-3 flex-shrink-0">{item.icon}</span>
//             <span className="break-words">{item.label}</span>
//           </li>
//         ))}
//       </ul>
//       <Outlet/>
//     </div>
//   );
// };

// export default PostContentPanel;


import { FaFileAlt, FaFileUpload, FaQuestionCircle, FaPenNib } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostContentPanel = () => {
  const navigate = useNavigate();

  const handleClick = (label) => {
    if (label === "Blogs") {
      navigate("blogs");
    }
     else if (label === "Documents") {
      navigate("docs");
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded overflow-hidden">
      <div className="bg-gray-100 px-4 py-2">
        <h2 className="text-base sm:text-lg font-bold text-black">Post a Content</h2>
      </div>

      <ul className="py-4 space-y-3">
        {[
          { label: "Articles", icon: <FaFileAlt /> },
          { label: "Blogs", icon: <FaPenNib /> },
          { label: "Documents", icon: <FaFileUpload /> },
          { label: "Q & A", icon: <FaQuestionCircle /> },
          { label: "Discussions", icon: <FaFileAlt /> },
          { label: "Tags", icon: <FaFileAlt /> },
        ].map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(item.label)}
            className="flex items-center px-4 text-blue-700 hover:underline cursor-pointer text-sm sm:text-base"
          >
            <span className="text-base sm:text-lg mr-3 flex-shrink-0">{item.icon}</span>
            <span className="break-words">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostContentPanel;
