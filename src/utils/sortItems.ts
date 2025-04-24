// src/utils/sortItems.ts
export type SortConfig = { key: string; order: "asc" | "desc" };

/**
 * Returns a new, sorted copy of `items`.
 * Handles numbers, strings, and ISO‑date strings (when columnKey === "created_at").
 */
const sortItems = <T extends Record<string, unknown>>(
  config: SortConfig,
  items: T[],
): T[] => {
  const { key, order } = config;

  return [...items].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    // 1. Date sorting for "created_at"
    if (key === "created_at") {
      const dateA = new Date(valA as string);
      const dateB = new Date(valB as string);

      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
      return order === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }

    // 2. Number sorting
    if (typeof valA === "number" && typeof valB === "number") {
      return order === "asc" ? valA - valB : valB - valA;
    }

    // 3. String sorting
    if (typeof valA === "string" && typeof valB === "string") {
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    // 4. Fallback (boolean, null, undefined, mixed types…)
    return 0;
  });
};

export default sortItems;
