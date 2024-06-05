import { useState } from "react";
interface SortOrder {
  sortOrder: string | null;
  sortType: "ASC" | "DESC" | null;
}

const useSortColumn = () => {
  const [sortOrderBy, setSortOrderBy] = useState<SortOrder>({
    sortOrder: null,
    sortType: null,
  });

  const handleSort = (key: string) => {
    setSortOrderBy((prev) => {
      if (prev.sortOrder === key) {
        switch (prev.sortType) {
          case "ASC":
            return {
              sortOrder: key,
              sortType: "DESC",
            };
          case "DESC":
            return {
              sortOrder: null,
              sortType: null,
            };
          default:
            return {
              sortOrder: key,
              sortType: "ASC",
            };
        }
      } else {
        return {
          sortOrder: key,
          sortType: "ASC",
        };
      }
    });
  };
  const sortParams = () => {
    return sortOrderBy.sortOrder
      ? `${sortOrderBy.sortOrder}_${sortOrderBy.sortType}`
      : null;
  };
  return { sortOrderBy, handleSort, sortParams };
};

export default useSortColumn;
