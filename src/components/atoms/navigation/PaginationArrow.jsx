import IconButton from '../buttons/IconButton';
import { ArrowLeft, ArrowRight } from "lucide-react";

const PaginationArrow = ({ direction = "left", onClick, disabled = false }) => {
  const isLeft = direction === "left";
  const label = isLeft ? "Previous" : "Next";
  const Icon = isLeft ? ArrowLeft : ArrowRight;

  return (
    <IconButton
      onClick={onClick}
      // icon={Icon}
      label={label}
      disabled={disabled}
      className="text-blue-600 hover:underline font-medium text-lg disabled:text-gray-400 disabled:cursor-not-allowed"
    >
      {isLeft ? (
        <>
          <Icon/>
          <span>{label}</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          <Icon/>
        </>
      )}
    </IconButton>
  );
};

export default PaginationArrow;