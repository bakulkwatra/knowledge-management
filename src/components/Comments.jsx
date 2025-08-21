// import { useState, useEffect } from "react";
// import CommentItem from "./CommentItem";

// import { resourceService } from "../services/kmService";

// // const {
// //   getComments,
// //   addComment,
// //   editComment,
// //   deleteComment,
// // } = blogService;

// const {
//   getComments,
//   addComment,
//   editComment,
//   deleteComment,
// }= resourceService;

// const Comments = ({ blogId, blogAuthorId, userId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         setLoading(true);
//         const data = await blogService.getComments(blogId);
        
//         setComments(Array.isArray(data) ? data : []); // Ensure it's always an array
//       } catch (error) {
//         console.error("Failed to fetch comments", error);
//         setError("Failed to load comments");
//         setComments([]); // Fallback to empty array
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComments();
//   }, [blogId]);

//   const handleAddComment = async () => {
//     if (newComment.trim() === "") return;

//     try {
//       const saved = await blogService.addComment(blogId, {
//         userId,
//         comment: newComment,
//       });
//       setComments((prev) => [saved, ...(Array.isArray(prev) ? prev : [])]);
//       setNewComment("");
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting comment");
//     }
//   };

//   const handleReply = async (text, parentId) => {
//     const reply = {
//       userId,
//       comment: text,
//       parent: { id: parentId },
//     };

//     try {
//       const saved = await addComment(blogId, reply);
//       setComments((prev) => [...prev, saved]);
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting reply");
//     }
//   };

//   const handleEdit = async (id, newText) => {
//     try {
//       const updated = await editComment(id, { comment: newText }, userId);
//       setComments((prev) =>
//         prev.map((c) => (c.id === id ? { ...c, comment: updated.comment } : c))
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Error editing comment");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteComment(id, userId);
//       const removeNested = (list, targetId) =>
//         list.filter((c) => c.id !== targetId && c.parent?.id !== targetId);

//       setComments((prev) => removeNested(prev, id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting comment");
//     }
//   };

// const rootComments = Array.isArray(comments) 
//     ? comments.filter((c) => !c?.parent) 
//     : [];

//   if (loading) return <div>Loading comments...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="mt-12 max-h-[600px] rounded-md bg-gray-50 flex flex-col">
//       <div className="overflow-y-auto flex-grow px-2 py-2 space-y-4">
//         {rootComments.length === 0 ? (
//           <p className="text-sm text-gray-500">No comments yet.</p>
//         ) : (
//           rootComments.map((comment) => (
//             <CommentItem
//               key={comment.id}
//               comment={comment}
//               allComments={comments}
//               onReply={handleReply}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               userId={userId}
//               blogAuthorId={blogAuthorId}
//             />
//           ))
//         )}
//       </div>

//       <div className="border border-gray-200 rounded-md shadow-md px-2 py-2 bg-white sticky bottom-0 z-10">
//         <h3 className="text-sm font-semibold mb-1">Leave a Comment</h3>
//         <textarea
//           className="w-full border border-gray-500 rounded p-1 text-sm"
//           rows="3"
//           placeholder="Write your comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button
//           className="mt-2 px-4 py-2 bg-blue-600 text-white rounded text-sm"
//           onClick={handleAddComment}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Comments;


// import { useEffect, useState } from "react";
// import {resourceService} from "../services/kmService";
// import CommentItem from "./CommentItem";

// const Comments = ({ resourceType, resourceId, userId, isUserResourceOwner }) => {
//   const [comments, setComments] = useState([]);
//   const [collapsedComments, setCollapsedComments] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchComments();
//   }, [resourceId]);

//   const fetchComments = async () => {
//     setLoading(true);
//     try {
//       const response = await resourceService.getComments(resourceType, resourceId);
//       const sorted = sortComments(response.data.data);
//       setComments(sorted);
//     } catch (err) {
//       console.error("Error loading comments:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sortComments = (commentsList) => {
//     const map = {};
//     const roots = [];

//     commentsList.forEach(comment => {
//       comment.children = [];
//       map[comment.id] = comment;
//     });

//     commentsList.forEach(comment => {
//       if (comment.parent_id) {
//         if (map[comment.parent_id]) {
//           map[comment.parent_id].children.push(comment);
//         }
//       } else {
//         roots.push(comment);
//       }
//     });

//     return roots;
//   };

//   const handleAdd = async (newComment, parentId = null) => {
//     try {
//       await resourceService.addComment(resourceType, resourceId, {
//         ...newComment,
//         parent_id: parentId,
//         user_id: userId,
//       });
//       fetchComments();
//     } catch (err) {
//       console.error("Add failed", err);
//     }
//   };

//   const handleDelete = async (commentId) => {
//     try {
//       await resourceService.deleteComment(commentId, userId);
//       fetchComments();
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   const handleEdit = async (commentId, updatedText) => {
//     try {
//       await resourceService.editComment(commentId, { comment: updatedText });
//       fetchComments();
//     } catch (err) {
//       console.error("Edit failed", err);
//     }
//   };

//   const toggleCollapse = (commentId) => {
//     setCollapsedComments(prev => ({
//       ...prev,
//       [commentId]: !prev[commentId],
//     }));
//   };

//   return (
//     <div className="space-y-4">
//       {loading ? (
//         <p>Loading comments...</p>
//       ) : (
//         comments.map(comment => (
//           <CommentItem
//             key={comment.id}
//             comment={comment}
//             collapsedComments={collapsedComments}
//             toggleCollapse={toggleCollapse}
//             onAddReply={handleAdd}
//             onDelete={handleDelete}
//             onEdit={handleEdit}
//             userId={userId}
//             isUserResourceOwner={isUserResourceOwner}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default Comments;

import { useEffect, useState } from "react";
import { resourceService } from "../services/kmService";
import CommentItem from "./CommentItem";

const Comments = ({ resourceType, resourceId, userId, isUserResourceOwner }) => {
  const [comments, setComments] = useState([]);
  const [collapsedComments, setCollapsedComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [newRootComment, setNewRootComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [resourceId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await resourceService.getComments(resourceType, resourceId);
      const sorted = sortComments(response.data.data);
      setComments(sorted);
    } catch (err) {
      console.error("Error loading comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const sortComments = (commentsList) => {
    const map = {};
    const roots = [];

    commentsList.forEach(comment => {
      comment.children = [];
      map[comment.id] = comment;
    });

    commentsList.forEach(comment => {
      if (comment.parent_id) {
        if (map[comment.parent_id]) {
          map[comment.parent_id].children.push(comment);
        }
      } else {
        roots.push(comment);
      }
    });

    return roots;
  };

  const handleAdd = async (newComment, parentId = null) => {
    try {
      await resourceService.addComment(resourceType, resourceId, {
        id: Math.floor(Math.random() * 10000), // Generate a temporary IDx
        ...newComment,
        parentId: parentId,
        userId: userId,
      });
      fetchComments();
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await resourceService.deleteComment(commentId, userId);
      fetchComments();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = async (commentId, updatedText) => {
    try {
      await resourceService.editComment(commentId, { comment: updatedText });
      fetchComments();
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  const toggleCollapse = (commentId) => {
    setCollapsedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleAddRootComment = () => {
    if (newRootComment.trim()) {
      handleAdd({ comment: newRootComment });
      setNewRootComment("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Root Comment Input */}
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={newRootComment}
          onChange={(e) => setNewRootComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddRootComment}
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
        >
          Add Comment
        </button>
      </div>

      {/* Comment List */}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            collapsedComments={collapsedComments}
            toggleCollapse={toggleCollapse}
            onAddReply={handleAdd}
            onDelete={handleDelete}
            onEdit={handleEdit}
            userId={userId}
            isUserResourceOwner={isUserResourceOwner}
          />
        ))
      )}
    </div>
  );
};

export default Comments;

