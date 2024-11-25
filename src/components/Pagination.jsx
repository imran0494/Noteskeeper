import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-4">
    <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="px-4 py-[6px] bg-gray-200 rounded-lg font-semibold"
    >
      Prev
    </button>
    <span className="mx-2 text-white mt-2">{`${currentPage} / ${totalPages}`}</span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="px-4 py-[6px] bg-gray-200 rounded-lg font-semibold"
    >
      Next
    </button>
  </div>
);

export default Pagination;
