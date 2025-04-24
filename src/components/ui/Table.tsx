/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import sortItems from "../../utils/sortItems";

type TableProps<T> = {
  columns: { label: string; key: string }[];
  data: T[];
  isLoading?: boolean;
};

const Table = <T,>({
  columns,
  data,
  isLoading = false,
}: TableProps<T>)=> {
  const [sortCfg, setSortCfg] = useState<{ key: string; order: "asc" | "desc" } | null>(
    null,
  );

  const toggleSort = (key: string) =>
    setSortCfg((prev) =>
      prev?.key === key
        ? { key, order: prev.order === "asc" ? "desc" : "asc" }
        : { key, order: "asc" },
    );

    const sorted = sortCfg ? sortItems(sortCfg, data as Record<string, unknown>[]) : data;

  const renderSortIcon = (key: string) => {
    if (!sortCfg || sortCfg.key !== key) return <ArrowUpDown className="size-4" />;
    return sortCfg.order === "asc" ? <ArrowUp className="size-4" /> : <ArrowDown className="size-4" />;
  };

  const renderBody = () => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, r) => (
        <tr key={r} className="animate-pulse">
          {columns.map((c) => (
            <td key={c.key} className="px-4 py-2 border bg-gray-100">
              <div className="h-5 w-full rounded bg-gray-200" />
            </td>
          ))}
        </tr>
      ));
    }

    if (sorted.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length} className="text-center px-4 py-2 border">
            No data found
          </td>
        </tr>
      );
    }

    return sorted.map((row: any, i) => (
      <tr key={i}>
        {columns.map((c) => (
          <td key={c.key} className="px-4 py-2 text-sm border whitespace-nowrap">
            {row[c.key] as React.ReactNode}
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
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {columns.map(({ label, key }) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  className="border border-gray-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between px-4 py-2 text-sm">
                    <span className="whitespace-nowrap">{label}</span>
                    {renderSortIcon(key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-600">{renderBody()}</tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
