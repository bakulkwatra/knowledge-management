// import React, { useState, useRef, useEffect } from "react";
// import { resourceService } from "../services/kmService";

// export default function CardBannerUploader({
//   resourceId,
//   resourceType,
//   onUploaded,
// }) {
//   const [cardImg, setCardImg] = useState(null);
//   const [bannerImg, setBannerImg] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const cardRef = useRef(null);
//   const bannerRef = useRef(null);

//   // ✅ Fetch persisted images on mount
//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const cards = await resourceService.getCards(resourceType, resourceId);
//         if (cards && cards.length > 0) {
//           // Assuming one card per resourceId
//           setCardImg(cards[0].cardImg);
//           setBannerImg(cards[0].bannerImg);
//         }
//       } catch (err) {
//         console.error("Failed to load card images:", err);
//       }
//     };
//     fetchCards();
//   }, [resourceId, resourceType]);

//   const handleSelectImage = (type) => {
//     if (type === "card") cardRef.current?.click();
//     else bannerRef.current?.click();
//   };

//   const handleUploadImage = async (e, type) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
//     try {
//       let uploadedCard;
//       if (type === "card") {
//         uploadedCard = await resourceService.uploadCard(resourceType, resourceId, file, null);
//         setCardImg(uploadedCard.cardImg);
//       } else {
//         uploadedCard = await resourceService.uploadCard(resourceType, resourceId, null, file);
//         setBannerImg(uploadedCard.bannerImg);
//       }

//       if (onUploaded) onUploaded(uploadedCard);
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Image upload failed");
//     } finally {
//       setUploading(false);
//       e.target.value = "";
//     }
//   };

//   const removeImage = (type) => {
//     if (type === "card") setCardImg(null);
//     else setBannerImg(null);
//   };

//   if (resourceType !== "blog") return null;

//   return (
//     <div className="flex flex-col lg:flex-row gap-4 mb-4">
//       {/* Card Image */}
//       <div className="flex-1 flex flex-col items-center p-2 border rounded">
//         <h4 className="mb-2 font-medium">Card Image</h4>
//         {cardImg ? (
//           <div className="relative">
//             <img src={cardImg} alt="Card" className="w-64 h-40 object-cover rounded" />
//             <button
//               className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded"
//               onClick={() => removeImage("card")}
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <button
//             className="w-64 h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
//             onClick={() => handleSelectImage("card")}
//             disabled={uploading}
//           >
//             {uploading ? "Uploading..." : "Upload Card Image"}
//           </button>
//         )}
//         <input
//           ref={cardRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleUploadImage(e, "card")}
//         />
//       </div>

//       {/* Banner Image */}
//       <div className="flex-1 flex flex-col items-center p-2 border rounded">
//         <h4 className="mb-2 font-medium">Banner Image</h4>
//         {bannerImg ? (
//           <div className="relative">
//             <img src={bannerImg} alt="Banner" className="w-64 h-40 object-cover rounded" />
//             <button
//               className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded"
//               onClick={() => removeImage("banner")}
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <button
//             className="w-64 h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
//             onClick={() => handleSelectImage("banner")}
//             disabled={uploading}
//           >
//             {uploading ? "Uploading..." : "Upload Banner Image"}
//           </button>
//         )}
//         <input
//           ref={bannerRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleUploadImage(e, "banner")}
//         />
//       </div>
//     </div>
//   );
// }
//======================================
// import React, { useState, useRef, useEffect } from "react";
// import { resourceService } from "../services/kmService";

// export default function CardBannerUploader({
//   resourceId,
//   resourceType,
//   onUploaded,
// }) {
//   // Use distinct state variables for client-side files and server-side previews
//   const [cardFile, setCardFile] = useState(null);
//   const [cardPreview, setCardPreview] = useState(null);
//   const [bannerFile, setBannerFile] = useState(null);
//   const [bannerPreview, setBannerPreview] = useState(null);

//   // A single loading state for both fetching and uploading
//   const [isLoading, setIsLoading] = useState(true);

//   const cardRef = useRef(null);
//   const bannerRef = useRef(null);

//   // 1. Fetch existing images on mount
//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const cards = await resourceService.getCards(resourceType, resourceId);
//         if (cards && cards.length > 0) {
//           const card = cards[0];
//           setCardPreview(card.cardImg || null);
//           setBannerPreview(card.bannerImg || null);
//         }
//       } catch (err) {
//         console.error("Failed to load card images:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCards();
//   }, [resourceId, resourceType]);

//   // 2. Handle file selection and client-side preview
//   const handleFileChange = (e, type) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (type === "card") {
//         setCardFile(file);
//         setCardPreview(reader.result);
//       } else {
//         setBannerFile(file);
//         setBannerPreview(reader.result);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   // 3. Handle combined upload on button click
//   const handleUpload = async () => {
//     if (!cardFile && !bannerFile) {
//       alert("Please select at least one image to upload.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const existingCards = await resourceService.getCards(resourceType, resourceId);
//       const existingCardId = existingCards.length > 0 ? existingCards[0].id : null;

//       let uploadedCard;
//       if (existingCardId) {
//         uploadedCard = await resourceService.updateCard(resourceType,existingCardId, cardFile, bannerFile );
//       } else {
//         uploadedCard = await resourceService.uploadCard(resourceType, resourceId, cardFile, bannerFile);
//       }

//       // Since backend now returns Base64, we can use the response to update state
//       if (uploadedCard) {
//         setCardFile(null);
//         setBannerFile(null);
//         setCardPreview(uploadedCard.cardImg || null);
//         setBannerPreview(uploadedCard.bannerImg || null);
//       }

//       if (onUploaded) onUploaded(uploadedCard);
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Image upload failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 4. Remove functionality
//   const removeImage = async (type) => {
//     setIsLoading(true);
//     try {
//       const existingCards = await resourceService.getCards(resourceType, resourceId);
//       const existingCardId = existingCards.length > 0 ? existingCards[0].id : null;

//       if (existingCardId) {
//         // Send a request to the backend to remove the image by its ID
//         await resourceService.updateCard(existingCardId, type === 'card' ? null : bannerFile, type === 'banner' ? null : cardFile, resourceType);

//         // Update state to reflect the removal
//         if (type === 'card') {
//           setCardPreview(null);
//           setCardFile(null);
//         } else {
//           setBannerPreview(null);
//           setBannerFile(null);
//         }
//       }
//     } catch (err) {
//       console.error("Remove failed:", err);
//       alert("Image removal failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (resourceType !== "blog") return null;

//   return (
//     <div className="flex flex-col lg:flex-row gap-4 mb-4">
//       {/* Card Image */}
//       <div className="flex-1 flex flex-col items-center p-2 border rounded">
//         <h4 className="mb-2 font-medium">Card Image</h4>
//         {isLoading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : cardPreview ? (
//           <div className="relative">
//             <img src={cardPreview} alt="Card" className="w-64 h-40 object-cover rounded" />
//             <button
//               className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded"
//               onClick={() => removeImage("card")}
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <button
//             className="w-64 h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
//             onClick={() => cardRef.current?.click()}
//             disabled={isLoading}
//           >
//             Upload Card Image
//           </button>
//         )}
//         <input
//           ref={cardRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleFileChange(e, "card")}
//         />
//       </div>

//       {/* Banner Image */}
//       <div className="flex-1 flex flex-col items-center p-2 border rounded">
//         <h4 className="mb-2 font-medium">Banner Image</h4>
//         {isLoading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : bannerPreview ? (
//           <div className="relative">
//             <img src={bannerPreview} alt="Banner" className="w-64 h-40 object-cover rounded" />
//             <button
//               className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded"
//               onClick={() => removeImage("banner")}
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <button
//             className="w-64 h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
//             onClick={() => bannerRef.current?.click()}
//             disabled={isLoading}
//           >
//             Upload Banner Image
//           </button>
//         )}
//         <input
//           ref={bannerRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleFileChange(e, "banner")}
//         />
//       </div>
//       <button
//         onClick={handleUpload}
//         disabled={isLoading || (!cardFile && !bannerFile)}
//         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//       >
//         {isLoading ? "Uploading..." : "Save Images"}
//       </button>
//     </div>
//   );
// }
// import React, { useState, useRef, useEffect } from "react";
// import { resourceService } from "../services/kmService";

// export default function CardBannerUploader({ resourceId, resourceType, onUploaded }) {
//   const [cardFile, setCardFile] = useState(null);
//   const [cardPreview, setCardPreview] = useState(null);
//   const [bannerFile, setBannerFile] = useState(null);
//   const [bannerPreview, setBannerPreview] = useState(null);

//   const [cardSaved, setCardSaved] = useState(false);
//   const [bannerSaved, setBannerSaved] = useState(false);

//   const [isLoading, setIsLoading] = useState(true);

//   const cardRef = useRef(null);
//   const bannerRef = useRef(null);

//   // Fetch existing images from backend
//   const fetchCards = async () => {
//     setIsLoading(true);
//     try {
//       const res = await resourceService.getCards(resourceType, resourceId);
//       if (res?.data?.length > 0) {
//         const card = res.data[0];
//         setCardPreview(card.cardImg || null);
//         setBannerPreview(card.bannerImg || null);
//         setCardSaved(!!card.cardImg);
//         setBannerSaved(!!card.bannerImg);
//       } else {
//         setCardPreview(null);
//         setBannerPreview(null);
//         setCardSaved(false);
//         setBannerSaved(false);
//       }
//     } catch (err) {
//       console.error("Failed to fetch cards:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (resourceType === "blog") fetchCards();
//   }, [resourceId, resourceType]);

//   // Handle file selection
//   const handleFileChange = (e, type) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (type === "card") {
//         setCardFile(file);
//         setCardPreview(reader.result);
//       } else {
//         setBannerFile(file);
//         setBannerPreview(reader.result);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   // Remove image logic
//   const removeImage = async (type) => {
//     // Unsaved local file -> just clear
//     if ((type === "card" && !cardSaved) || (type === "banner" && !bannerSaved)) {
//       if (type === "card") setCardFile(null), setCardPreview(null);
//       else setBannerFile(null), setBannerPreview(null);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const existingCards = await resourceService.getCards(resourceType, resourceId);
//       const existingCardId = existingCards.length > 0 ? existingCards[0].id : null;
//       if (existingCardId) {
//         await resourceService.updateCard(
//           resourceType,
//           existingCardId,
//           type === "card" ? null : cardFile ?? cardPreview,
//           type === "banner" ? null : bannerFile ?? bannerPreview
//         );

//         if (type === "card") setCardSaved(false), setCardFile(null), setCardPreview(null);
//         else setBannerSaved(false), setBannerFile(null), setBannerPreview(null);

//         await fetchCards();
//       }
//     } catch (err) {
//       console.error("Remove failed:", err);
//       alert("Image removal failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Upload logic
//   const handleUpload = async () => {
//     // Ensure at least one image exists
//     if (
//       (!cardFile && !bannerFile) &&
//       (!cardSaved && !bannerSaved)
//     ) {
//       alert("At least one image is required.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const existingCards = await resourceService.getCards(resourceType, resourceId);
//       const existingCardId = existingCards.length > 0 ? existingCards[0].id : null;

//       if (existingCardId) {
//         await resourceService.updateCard(
//           resourceType,
//           existingCardId,
//           cardFile ?? (cardSaved ? cardPreview : null),
//           bannerFile ?? (bannerSaved ? bannerPreview : null)
//         );
//       } else {
//         await resourceService.uploadCard(
//           resourceType,
//           resourceId,
//           cardFile,
//           bannerFile
//         );
//       }

//       // Refresh state from backend
//       await fetchCards();

//       // Reset local files
//       setCardFile(null);
//       setBannerFile(null);

//       if (onUploaded) onUploaded({
//         cardPreview,
//         bannerPreview
//       });
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Image upload failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (resourceType !== "blog") return null;

//   return (
//     <div className="flex flex-col lg:flex-row gap-4 mb-4">
//       {/* Card Image */}
//       <div className="flex-1 flex flex-col items-center p-2 border rounded">
//         <h4 className="mb-2 font-medium">Card Image</h4>
//         {isLoading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : cardPreview ? (
//           <div className="relative">
//             <img
//               src={cardPreview}
//               alt="Card"
//               className="w-64 h-40 object-cover rounded"
//             />
//             <button
//               className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded"
//               onClick={() => removeImage("card")}
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <button
//             className="w-64 h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
//             onClick={() => cardRef.current?.click()}
//             disabled={isLoading}
//           >
//             Upload Card Image
//           </button>
//         )}
//         <input
//           ref={cardRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleFileChange(e, "card")}
//         />
//       </div>

//       {/* Banner Image */}
//       <div className="flex-1 flex flex-col items-center p-2 border rounded">
//         <h4 className="mb-2 font-medium">Banner Image</h4>
//         {isLoading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : bannerPreview ? (
//           <div className="relative">
//             <img
//               src={bannerPreview}
//               alt="Banner"
//               className="w-64 h-40 object-cover rounded"
//             />
//             <button
//               className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded"
//               onClick={() => removeImage("banner")}
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <button
//             className="w-64 h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
//             onClick={() => bannerRef.current?.click()}
//             disabled={isLoading}
//           >
//             Upload Banner Image
//           </button>
//         )}
//         <input
//           ref={bannerRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleFileChange(e, "banner")}
//         />
//       </div>

//       <button
//         onClick={handleUpload}
//         disabled={isLoading || (!cardFile && !bannerFile && !cardSaved && !bannerSaved)}
//         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//       >
//         {isLoading ? "Saving..." : "Save Images"}
//       </button>
//     </div>
//   );
// }

// import React, { useState, useRef, useEffect } from "react";
// import { resourceService } from "../services/kmService";

// export default function CardBannerUploader({ resourceId, resourceType, onUploaded }) {
//   const [cardFile, setCardFile] = useState(null);
//   const [cardPreview, setCardPreview] = useState(null);
//   const [bannerFile, setBannerFile] = useState(null);
//   const [bannerPreview, setBannerPreview] = useState(null);

//   const [cardSaved, setCardSaved] = useState(false);
//   const [bannerSaved, setBannerSaved] = useState(false);
//   const [existingCardId, setExistingCardId] = useState(null);

//   const [isLoading, setIsLoading] = useState(true);

//   const cardRef = useRef(null);
//   const bannerRef = useRef(null);

//   // Fetch existing images from backend
//   const fetchCards = async () => {
//     setIsLoading(true);
//     try {
//       const res = await resourceService.getCards(resourceType, resourceId);
//       if (res?.data?.length > 0) {
//         const card = res.data[0];
//         setExistingCardId(card.id);
//         setCardPreview(card.cardImg || null);
//         setBannerPreview(card.bannerImg || null);
//         setCardSaved(!!card.cardImg);
//         setBannerSaved(!!card.bannerImg);
//       } else {
//         setExistingCardId(null);
//         setCardPreview(null);
//         setBannerPreview(null);
//         setCardSaved(false);
//         setBannerSaved(false);
//       }
//     } catch (err) {
//       console.error("Failed to fetch cards:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (resourceType === "blog") fetchCards();
//   }, [resourceId, resourceType]);

//   const handleFileChange = (e, type) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (type === "card") {
//         setCardFile(file);
//         setCardPreview(reader.result);
//       } else {
//         setBannerFile(file);
//         setBannerPreview(reader.result);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeImage = async (type) => {
//     // If local only, just clear UI
//     if ((type === "card" && !cardSaved) || (type === "banner" && !bannerSaved)) {
//       if (type === "card") setCardFile(null), setCardPreview(null);
//       else setBannerFile(null), setBannerPreview(null);
//       return;
//     }

//     // Update UI immediately
//     if (type === "card") setCardPreview(null), setCardFile(null), setCardSaved(false);
//     else setBannerPreview(null), setBannerFile(null), setBannerSaved(false);

//     setIsLoading(true);
//     try {
//       if (existingCardId) {
//         await resourceService.updateCard(
//           resourceType,
//           existingCardId,
//           type === "card" ? null : cardFile ?? cardPreview,
//           type === "banner" ? null : bannerFile ?? bannerPreview
//         );
//       }
//     } catch (err) {
//       console.error("Remove failed:", err);
//       alert("Image removal failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUpload = async () => {
//     // Ensure at least one image exists (either saved or new)
//     if (
//       (!cardFile && !bannerFile) &&
//       (!cardSaved && !bannerSaved)
//     ) {
//       alert("At least one image is required.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       if (existingCardId) {
//         // Update existing backend record
//         await resourceService.updateCard(
//           resourceType,
//           existingCardId,
//           cardFile ?? (cardSaved ? cardPreview : null),
//           bannerFile ?? (bannerSaved ? bannerPreview : null)
//         );
//       } else {
//         // First time upload
//         await resourceService.uploadCard(
//           resourceType,
//           resourceId,
//           cardFile,
//           bannerFile
//         );
//       }

//       // Refresh UI from backend
//       await fetchCards();

//       // Reset local files
//       setCardFile(null);
//       setBannerFile(null);

//       if (onUploaded) onUploaded({
//         cardPreview,
//         bannerPreview
//       });
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Image upload failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (resourceType !== "blog") return null;

//   return (
//     <div className="flex flex-col lg:flex-row gap-4 mb-4">
//       {/* Card Image */}
//     <div className="flex-1 flex flex-col items-center p-2 border rounded">
//         <h4 className="mb-2 font-medium">Card Image</h4>
//         {isLoading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : cardPreview ? (
//           <div className="relative">
//             <img
//               src={cardPreview}
//               alt="Card"
//               className="w-64 h-40 object-cover rounded"
//             />
//             <button
//               className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded"
//               onClick={() => removeImage("card")}
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <button
//             className="w-64 h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
//             onClick={() => cardRef.current?.click()}
//             disabled={isLoading}
//           >
//             Upload Card Image
//           </button>
//         )}
//         <input
//           ref={cardRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleFileChange(e, "card")}
//         />
//       </div>

//       {/* Banner Image */}
//       <div className="flex-1 flex flex-col items-center p-2 border rounded">
//         <h4 className="mb-2 font-medium">Banner Image</h4>
//         {isLoading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : bannerPreview ? (
//           <div className="relative">
//             <img
//               src={bannerPreview}
//               alt="Banner"
//               className="w-64 h-40 object-cover rounded"
//             />
//             <button
//               className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded"
//               onClick={() => removeImage("banner")}
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <button
//             className="w-64 h-40 border-dashed border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
//             onClick={() => bannerRef.current?.click()}
//             disabled={isLoading}
//           >
//             Upload Banner Image
//           </button>
//         )}
//         <input
//           ref={bannerRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => handleFileChange(e, "banner")}
//         />
//       </div>

//       <button
//         onClick={handleUpload}
//         disabled={isLoading || (!cardFile && !bannerFile && !cardSaved && !bannerSaved)}
//         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//       >
//         {isLoading ? "Saving..." : "Save Images"}
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { resourceService } from "../services/kmService";
import ImageUploader from "./ImageUploader";

export default function CardBannerUploader({ resourceId, resourceType, type }) {
  const [existingCardId, setExistingCardId] = useState(null);
  const [cardPreview, setCardPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await resourceService.getCards(resourceType, resourceId);
        if (res?.data?.length > 0) {
          const card = res.data[0];
          setExistingCardId(card.id);
          setCardPreview(card.cardImg || null);
          setBannerPreview(card.bannerImg || null);
        }
      } catch (err) {
        console.error("Failed to fetch cards:", err);
      }
    };
    fetchCards();
  }, [resourceId, resourceType]);

  if (type === "banner") {
    return (
      <ImageUploader
        type="banner"
        resourceId={resourceId}
        resourceType={resourceType}
        existingCardId={existingCardId}
        initialPreview={bannerPreview}
        onChange={setBannerPreview}
      />
    );
  }

  if (type === "card") {
    return (
      <div className="self-center w-64">
        <ImageUploader
          type="card"
          resourceId={resourceId}
          resourceType={resourceType}
          existingCardId={existingCardId}
          initialPreview={cardPreview}
          onChange={setCardPreview}
        />
      </div>
    );
  }

  // fallback if no type is provided
  return null;
}
