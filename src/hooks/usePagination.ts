import { useState, useCallback, useMemo } from 'react';

interface UsePaginationParams {
  total: number;
}

const PAGE_CNT = 5;
const DISPLAY_CNT = 10;

export const usePagination = (params?: UsePaginationParams) => {
  const [page, setPage] = useState<number>(-1);

  const lastPageFromTotal = useMemo(() => {
    const total = params?.total || 1;

    return Math.floor((total - 1) / DISPLAY_CNT) + 1;
  }, [params?.total]);

  const prevActive = useMemo(() => {
    return page > 1;
  }, [page]);

  const nextActive = useMemo(() => {
    return page < lastPageFromTotal;
  }, [page, lastPageFromTotal]);

  const startPage = useMemo(() => {
    return Math.floor((page - 1) / PAGE_CNT) * PAGE_CNT + 1;
  }, [page]);

  const endPage = useMemo(() => {
    const p = startPage + 4;
    return p < lastPageFromTotal ? p : lastPageFromTotal;
  }, [lastPageFromTotal, startPage]);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handlePrevPage = useCallback(() => {
    setPage(startPage === 1 ? 1 : startPage - 1);
  }, [startPage]);

  const handleNextPage = useCallback(() => {
    setPage(endPage + 1 < lastPageFromTotal ? endPage + 1 : lastPageFromTotal);
  }, [endPage, lastPageFromTotal]);

  return {
    page,
    setPage,
    handlePageChange,
    handlePrevPage,
    handleNextPage,
    prevActive,
    nextActive,
    startPage,
    endPage,
  };
};
