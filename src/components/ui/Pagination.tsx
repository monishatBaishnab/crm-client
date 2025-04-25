import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, total, pageSize, onPageChange }: PaginationProps) => {
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  const btn =
    "px-3 py-1.5 text-sm rounded border transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div className="flex items-center justify-center gap-1 mt-6 select-none">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className={btn}>
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`${btn} ${
            n === page ? "bg-purple-500 text-white border-purple-500" : "border-transparent"
          }`}
        >
          {n}
        </button>
      ))}

      <button onClick={() => onPageChange(page + 1)} disabled={page === lastPage} className={btn}>
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default Pagination;
