'use client';

import { useGetPageList } from "../model/useGetPageList";
import { PageButton } from "@/features/blog/pageInQuery/ui/PageButton";

export function PageList() {
  const { currentPage, pageNumbers } = useGetPageList();

  return (
    <div className="flex items-center gap-2 justify-center mt-[50px] pb-[50px]">
      {pageNumbers.map((page) => (
        <PageButton key={page} page={page} currentPage={currentPage} />
      ))}
    </div>
  );
}
