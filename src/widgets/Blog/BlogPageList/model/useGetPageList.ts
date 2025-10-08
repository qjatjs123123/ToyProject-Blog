import { PAGE, useGetBlogsList } from "@/entities/blog";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const buttonCnt = 5;

export function useGetPageList() {
  const { data } = useGetBlogsList();
  const { page, totalPages } = data;
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get(PAGE)) ?? 1;
  const groupIndex = Math.floor((page - 1) / buttonCnt);

  const startPage = groupIndex * buttonCnt + 1;
  const endPage = Math.min(startPage + buttonCnt - 1, totalPages);
  const pageNumbers = useMemo(
    () =>
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    [startPage, endPage]
  );

  return {currentPage, pageNumbers, totalPages};
}
