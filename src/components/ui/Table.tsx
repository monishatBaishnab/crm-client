/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

type TableProps<T> = {
  columns: { label: string; key: string }[];
  data: T[];
  isLoading?: boolean;
  path?: string;
  renderActions?: (row: T) => ReactNode;
};

const Table = <T,>({
  columns,
  data,
  isLoading = false,
  renderActions,
}: TableProps<T>) => {
  const renderBody = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, r) => (
        <tr key={r} className="animate-pulse">
          {columns.map((c) => (
            <td
              key={c.key}
              className="px-4 py-2 border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-700"
            >
              <div className="h-5 w-full rounded bg-gray-200 dark:bg-gray-600" />
            </td>
          ))}
        </tr>
      ));
    }

    if (data.length === 0) {
      return (
        <tr>
          <td
            colSpan={columns.length}
            className="text-center px-4 py-16 border border-gray-200 dark:border-gray-800 dark:bg-gray-700"
          >
            <div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-300">
              <AlertCircle />
              <span className="text-base font-medium">No data found</span>
            </div>
          </td>
        </tr>
      );
    }

    return data.map((row: any, i) => (
      <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-600">
        {columns.map((c) => (
          <td
            key={c.key}
            className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-800 whitespace-nowrap dark:bg-gray-700 dark:text-gray-300"
          >
            {c.key === "action"
              ? renderActions
                ? renderActions(row)
                : ""
              : row[c.key]}
          </td>
        ))}
      </tr>
    ));
  };

  /* ────────── render ────────── */
  return (
    <section>
      <div className="w-full overflow-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              {columns.map(({ label, key }) => (
                <th
                  key={key}
                  className="border border-gray-200 dark:border-gray-700 py-2"
                >
                  <span className="whitespace-nowrap">{label}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-600 dark:text-gray-300">
            {renderBody()}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
