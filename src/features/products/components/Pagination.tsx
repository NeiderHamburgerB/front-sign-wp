import React from 'react';

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        onClick={onPrevious}
        disabled={!hasPreviousPage}
        className="bg-gray-600 px-3 py-1 rounded disabled:bg-gray-400"
      >
        Anterior
      </button>
      <span className="text-sm">Página: {currentPage}</span>
      <button
        onClick={onNext}
        disabled={!hasNextPage}
        className="bg-gray-600 px-3 py-1 rounded disabled:bg-gray-400"
      >
        Siguiente
      </button>
    </div>
  );
};
