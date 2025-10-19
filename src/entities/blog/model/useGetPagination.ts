'use client'

import { useGetBlogsList } from "@/entities/blog";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { getCurrentPage } from "../lib/getCurrentPage";
import { PageListProps } from "@/entities/blog";
import { buttonCnt } from "../config/constants";


export function useGetPagiNation(): PageListProps {
  const { data } = useGetBlogsList();
  const { page, totalPages } = data;
  const searchParams = useSearchParams();
  const currentPage = getCurrentPage(searchParams);

  const currentGroupIndex = Math.floor((page - 1) / buttonCnt);
  const lastGroupIndex = Math.floor((totalPages - 1) / buttonCnt);

  const startPage = currentGroupIndex * buttonCnt + 1;
  const endPage = Math.min(startPage + buttonCnt - 1, totalPages);

  const pageNumbers = useMemo(
    () =>
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    [startPage, endPage]
  );

  const getStartPageByGroup = useCallback(
    (groupIndex: number) => groupIndex * buttonCnt + 1,
    []
  );

  return {
    pagination: {
      currentPage,
      pageNumbers,
      totalPages,
    },
    grouping: {
      currentGroupIndex,
      lastGroupIndex,
      getStartPageByGroup
    },
  };
}
