import { FaQuestionCircle } from "react-icons/fa";

const HaveAQuestion = () => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded px-6 py-6 flex items-center gap-4 w-full max-w-4xl mx-auto mt-18">
      <FaQuestionCircle className="text-gray-500 text-2xl" />
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <span className="font-semibold text-gray-700 text-base sm:text-lg">
          Have a question?
        </span>
        <span className="text-gray-400 italic text-sm sm:text-base whitespace-nowrap">
          Click here to start typing.
        </span>
      </div>
    </div>
  );
};

export default HaveAQuestion;
