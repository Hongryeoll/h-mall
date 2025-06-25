// components/common/HrPagination.tsx

'use client';

interface HrPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export default function HrPagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: HrPaginationProps) {
  const DOTS = '...';

  const generatePageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const firstPage = 1;
    const lastPage = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => i + 1
      );
      return [...leftRange, DOTS, lastPage];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => totalPages - (3 + siblingCount * 2) + i + 1
      );
      return [firstPage, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: siblingCount * 2 + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
    }
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-2 py-1 ${
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:text-black'
        }`}
      >
        &lt;
      </button>

      {pages?.map((page, idx) => {
        if (page === DOTS) {
          return (
            <span key={idx} className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        return (
          <button
            key={idx}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'font-bold underline text-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 ${
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:text-black'
        }`}
      >
        &gt;
      </button>
    </div>
  );
}
