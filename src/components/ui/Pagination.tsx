// src/components/ui/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

const Pagination = ({
  page,
  total,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  /* ----- helpers ----- */
  const lastPage = Math.max(1, Math.ceil(total / pageSize));

  const go = (p: number) => {
    if (p < 1 || p > lastPage || p === page) return;
    onPageChange(p);
  };

  // range of page numbers to display
  const numbers = Array.from({ length: lastPage }, (_, i) => i + 1);

  const btn =
    "flex items-center gap-1 px-3 py-1.5 rounded border text-sm transition-all duration-300 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div className="flex items-center justify-center gap-1 mt-6 select-none">
      {/* Prev */}
      <button
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className={btn}
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Numbers */}
      {numbers.map((n) => (
        <button
          key={n}
          onClick={() => go(n)}
          className={`${btn} ${
            n === page
              ? "bg-purple-500 text-white hover:!bg-purple-500 hover:!text-white"
              : "border-transparent"
          }`}
        >
          {n}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => go(page + 1)}
        disabled={page === lastPage}
        className={btn}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default Pagination;
