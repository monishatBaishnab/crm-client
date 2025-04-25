import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

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
  siblingCount = 1,
}: PaginationProps) => {
  const lastPage = Math.max(1, Math.ceil(total / pageSize));

  const go = (p: number) => {
    if (p < 1 || p > lastPage || p === page) return;
    onPageChange(p);
  };

  const range = () => {
    const totalPageNumbers = siblingCount * 2 + 5;
    if (totalPageNumbers >= lastPage) return Array.from({ length: lastPage }, (_, i) => i + 1);

    const leftSibling = Math.max(page - siblingCount, 2);
    const rightSibling = Math.min(page + siblingCount, lastPage - 1);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < lastPage - 1;

    const pages: (number | "...")[] = [1];

    if (showLeftDots) pages.push("...");
    for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);
    if (showRightDots) pages.push("...");

    pages.push(lastPage);
    return pages;
  };

  const btn =
    "flex items-center gap-1 px-3 py-1.5 rounded border text-sm transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div className="flex items-center justify-center gap-1 mt-6 select-none">
      {/* Prev */}
      <button
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className={btn}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page numbers */}
      {range().map((n, i) =>
        n === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400 dark:text-gray-500">
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <button
            key={n}
            onClick={() => go(n)}
            aria-current={n === page ? "page" : undefined}
            className={`${btn} ${
              n === page
                ? "bg-purple-500 text-white border-purple-500 hover:!bg-purple-500"
                : "border-transparent"
            }`}
          >
            {n}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => go(page + 1)}
        disabled={page === lastPage}
        className={btn}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default Pagination;
