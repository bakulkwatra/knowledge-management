// import { useState } from "react";

// const CommentItem = ({
//   comment,
//   allComments,
//   onReply,
//   onEdit,
//   onDelete,
//   userId,
//   blogAuthorId,
// }) => {
//   const [showReplyBox, setShowReplyBox] = useState(false);
//   const [replyText, setReplyText] = useState("");
//   const [showReplies, setShowReplies] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState(comment.comment);

//   const replies = allComments.filter((c) => c.parent?.id === comment.id);

//   const handleReplySubmit = () => {
//     if (replyText.trim() === "") return;
//     onReply(replyText, comment.id);
//     setReplyText("");
//     setShowReplyBox(false);
//   };

//   const handleEditSubmit = () => {
//     if (editedText.trim() === "") return;
//     onEdit(comment.id, editedText);
//     setIsEditing(false);
//   };

//   const canEdit = comment.userId === userId;
//   const canDelete = comment.userId === userId || blogAuthorId === userId;

//   return (
//     <div className="border border-gray-200 p-2 rounded bg-white shadow-sm">
//       <p className="text-sm font-semibold text-gray-800">{comment.userId}</p>

//       {isEditing ? (
//         <>
//           <textarea
//             className="w-full border rounded p-1 text-sm my-2"
//             rows="3"
//             value={editedText}
//             onChange={(e) => setEditedText(e.target.value)}
//           />
//           <button
//             className="mr-2 px-3 py-1 text-xs bg-green-600 text-white rounded"
//             onClick={handleEditSubmit}
//           >
//             Save
//           </button>
//           <button
//             className="px-3 py-1 text-xs bg-gray-400 text-white rounded"
//             onClick={() => setIsEditing(false)}
//           >
//             Cancel
//           </button>
//         </>
//       ) : (
//         <p className="text-sm text-gray-700 mt-1">{typeof comment.comment === "string" ? comment.comment : JSON.stringify(comment.comment)}</p>
//       )}

//       <div className="flex gap-4 mt-2 text-xs">
//         <button
//           className="text-blue-600 hover:underline"
//           onClick={() => setShowReplyBox((prev) => !prev)}
//         >
//           {showReplyBox ? "Cancel" : "Reply"}
//         </button>

//         {canEdit && (
//           <button
//             className="text-yellow-600 hover:underline"
//             onClick={() => setIsEditing(true)}
//           >
//             Edit
//           </button>
//         )}

//         {canDelete && (
//           <button
//             className="text-red-600 hover:underline"
//             onClick={() => onDelete(comment.id)}
//           >
//             Delete
//           </button>
//         )}

//         {replies.length > 1 && (
//           <button
//             className="text-gray-600 hover:underline"
//             onClick={() => setShowReplies((prev) => !prev)}
//           >
//             {showReplies ? "Hide replies" : `View ${replies.length} replies`}
//           </button>
//         )}
//       </div>

//       {showReplyBox && (
//         <div className="mt-2">
//           <textarea
//             rows="2"
//             className="w-full border rounded p-2 text-sm"
//             placeholder="Write your reply..."
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//           />
//           <button
//             className="mt-1 px-3 py-1 bg-blue-600 text-white text-xs rounded"
//             onClick={handleReplySubmit}
//           >
//             Submit Reply
//           </button>
//         </div>
//       )}

//       {(replies.length === 1 || showReplies) && (
//         <div className="pl-4 mt-3 space-y-3 border-l-2 border-gray-200">
//           {replies.map((reply) => (
//             <CommentItem
//               key={reply.id}
//               comment={reply}
//               allComments={allComments}
//               onReply={onReply}
//               onEdit={onEdit}
//               onDelete={onDelete}
//               userId={userId}
//               blogAuthorId={blogAuthorId}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentItem;

// import React, { useState } from "react";

// const CommentItem = ({
//   comment,
//   collapsedComments,
//   toggleCollapse,
//   onAddReply,
//   onDelete,
//   onEdit,
//   userId,
//   isUserResourceOwner,
// }) => {
//   const [showReplyBox, setShowReplyBox] = useState(false);
//   const [replyText, setReplyText] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(comment.comment);

//   const isOwner = userId === comment.user_id || isUserResourceOwner;

//   const handleReplySubmit = () => {
//     if (replyText.trim()) {
//       onAddReply({ comment: replyText }, comment.id);
//       setReplyText("");
//       setShowReplyBox(false);
//     }
//   };

//   const handleEditSubmit = () => {
//     if (editText.trim()) {
//       onEdit(comment.id, editText);
//       setIsEditing(false);
//     }
//   };

//   return (
//     <div className="ml-4 border-l pl-4 space-y-2">
//       <div className="bg-gray-100 p-2 rounded">
//         {isEditing ? (
//           <div className="space-y-2">
//             <textarea
//               className="w-full p-2 border rounded"
//               value={editText}
//               onChange={(e) => setEditText(e.target.value)}
//             />
//             <div className="flex gap-2">
//               <button onClick={handleEditSubmit} className="text-blue-500">Save</button>
//               <button onClick={() => setIsEditing(false)} className="text-gray-500">Cancel</button>
//             </div>
//           </div>
//         ) : (
//           <p>{comment.comment}</p>
//         )}
//         <div className="text-sm text-gray-600 flex gap-4 mt-2">
//           <button onClick={() => setShowReplyBox(!showReplyBox)} className="hover:underline">
//             Reply
//           </button>
//           {userId === comment.user_id && (
//             <button onClick={() => setIsEditing(true)} className="hover:underline text-yellow-600">
//               Edit
//             </button>
//           )}
//           {/* {isOwner && (
//             <button onClick={() => onDelete(comment.id)} className="hover:underline text-red-600">
//               Delete
//             </button>
//           )} */}
//           {comment.children.length > 0 && (
//             <button
//               onClick={() => toggleCollapse(comment.id)}
//               className="hover:underline text-blue-600"
//             >
//               {collapsedComments[comment.id] ? "Expand" : "Collapse"} ({comment.children.length})
//             </button>
//           )}
//         </div>
//       </div>

//       {showReplyBox && (
//         <div className="ml-4">
//           <textarea
//             className="w-full p-2 border rounded"
//             rows={2}
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             placeholder="Write your reply..."
//           />
//           <div className="flex gap-2 mt-1">
//             <button onClick={handleReplySubmit} className="text-green-600">Reply</button>
//             <button onClick={() => setShowReplyBox(false)} className="text-gray-500">Cancel</button>
//           </div>
//         </div>
//       )}

//       {!collapsedComments[comment.id] &&
//         comment.children.map((child) => (
//           <CommentItem
//             key={child.id}
//             comment={child}
//             collapsedComments={collapsedComments}
//             toggleCollapse={toggleCollapse}
//             onAddReply={onAddReply}
//             onDelete={onDelete}
//             onEdit={onEdit}
//             userId={userId}
//             isUserResourceOwner={isUserResourceOwner}
//           />
//         ))}
//     </div>
//   );
// };

// export default CommentItem;
import React, { useState } from "react";

const CommentItem = ({
  comment,
  collapsedComments,
  toggleCollapse,
  onAddReply,
  onDelete,
  onEdit,
  userId,
  isUserResourceOwner,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);

  const isOwner = userId === comment.userId || isUserResourceOwner;

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onAddReply({ comment: replyText }, comment.id);
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(comment.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="ml-4 border-l pl-4 space-y-2">
      <div className="bg-gray-100 p-2 rounded">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              className="w-full p-2 border rounded"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex gap-2">
              <button onClick={handleEditSubmit} className="text-blue-500">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>{comment.comment}</p>
        )}
        <div className="text-sm text-gray-600 flex gap-4 mt-2">
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="hover:underline"
          >
            Reply
          </button>
          {userId === comment.userId && (
            <button
              onClick={() => setIsEditing(true)}
              className="hover:underline text-yellow-600"
            >
              Edit
            </button>
          )}
          {isOwner && (
            <button
              onClick={() => onDelete(comment.id)}
              className="hover:underline text-red-600"
            >
              Delete
            </button>
          )}
          {comment.children.length > 0 && (
            <button
              onClick={() => toggleCollapse(comment.id)}
              className="hover:underline text-blue-600"
            >
              {collapsedComments[comment.id]
                ? "Expand"
                : "Collapse"}{" "}
              ({comment.children.length})
            </button>
          )}
        </div>
      </div>

      {showReplyBox && (
        <div className="ml-4">
          <textarea
            className="w-full p-2 border rounded"
            rows={2}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <div className="flex gap-2 mt-1">
            <button onClick={handleReplySubmit} className="text-green-600">
              Reply
            </button>
            <button
              onClick={() => setShowReplyBox(false)}
              className="text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!collapsedComments[comment.id] &&
        comment.children.map((child) => (
          <CommentItem
            key={child.id}
            comment={child}
            collapsedComments={collapsedComments}
            toggleCollapse={toggleCollapse}
            onAddReply={onAddReply}
            onDelete={onDelete}
            onEdit={onEdit}
            userId={userId}
            isUserResourceOwner={isUserResourceOwner}
          />
        ))}
    </div>
  );
};

export default CommentItem;
