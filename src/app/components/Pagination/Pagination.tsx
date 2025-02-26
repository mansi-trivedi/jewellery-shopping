import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-center my-3 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded-md font-semibold text-sm ${
          currentPage === 1
            ? "bg-gray-50 text-gray-300 cursor-not-allowed"
            : "bg-offWhite text-darkBlue hover:bg-orange hover:text-white"
        }`}
      >
        {`<`}
      </button>

      {/* Current Page */}
      <span className="px-2 py-1 rounded-md font-semibold text-sm bg-orange text-white">
        {currentPage}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded-md font-semibold text-sm ${
          currentPage === totalPages
            ? "bg-gray-50 text-gray-300 cursor-not-allowed"
            : "bg-offWhite text-darkBlue hover:bg-orange hover:text-white"
        }`}
      >
        {`>`}
      </button>
    </div>
  );
};

export default Pagination;
