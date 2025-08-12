// import { useState } from "react";
// import { Star } from "lucide-react"; // Replace with any icon system if preferred
// import PropTypes from "prop-types";

// const RatingStars = ({ value = 0, onChange, max = 5, size = 24 }) => {
//   const [hoverValue, setHoverValue] = useState(undefined);

//   const handleClick = (index) => {
//     if (onChange) onChange(index + 1);
//   };

//   const handleMouseEnter = (index) => {
//     setHoverValue(index + 1);
//   };

//   const handleMouseLeave = () => {
//     setHoverValue(undefined);
//   };

//   return (
//     <div className="flex gap-1">
//       {Array.from({ length: max }, (_, index) => {
//         const isFilled = hoverValue != null ? index < hoverValue : index < value;
//         return (
//           <button
//             key={index}
//             type="button"
//             onClick={() => handleClick(index)}
//             onMouseEnter={() => handleMouseEnter(index)}
//             onMouseLeave={handleMouseLeave}
//             className="p-1 focus:outline-none"
//             aria-label={`Rate ${index + 1}`}
//           >
//             <Star
//               size={size}
//               fill={isFilled ? "#facc15" : "none"} // Tailwind's yellow-400
//               stroke="#facc15"
//             />
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// RatingStars.propTypes = {
//   value: PropTypes.number,
//   onChange: PropTypes.func,
//   max: PropTypes.number,
//   size: PropTypes.number,
// };

// export default RatingStars;

import { useState } from "react";
import { Star } from "lucide-react";
import PropTypes from "prop-types";
import axios from "axios";
import { resourceService } from "../../../services/kmService";// Adjust the import path as needed

const RatingStars = ({
  value = 0,
  onChange,
  max = 5,
  size = 24,
  resourceType,
  resourceId,
  userId
}) => {
  const [hoverValue, setHoverValue] = useState(undefined);
  const [rating, setRating] = useState(value);
  const [loading, setLoading] = useState(false);

  const handleClick = async (index) => {
    const newRating = index + 1;

    // Optimistic UI update
    setRating(newRating);
    if (onChange) onChange(newRating);

    try {
      setLoading(true);
      await resourceService.addRating(resourceType, resourceId, newRating, userId);
    } catch (err) {
      console.error("Error adding rating:", err);
      // Optional rollback
      setRating(value);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (index) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, index) => {
        const isFilled =
          hoverValue != null ? index < hoverValue : index < rating;
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="p-1 focus:outline-none"
            aria-label={`Rate ${index + 1}`}
            disabled={loading}
          >
            <Star
              size={size}
              fill={isFilled ? "#facc15" : "none"}
              stroke="#facc15"
            />
          </button>
        );
      })}
    </div>
  );
};

RatingStars.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  max: PropTypes.number,
  size: PropTypes.number,
  resourceType: PropTypes.string.isRequired,
  resourceId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

export default RatingStars;
