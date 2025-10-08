"use client";

import { TwoPrevButton } from "@/features/blog/pageInQuery/ui/TwoPrevButton";
import { useGetPageList } from "../model/useGetPageList";
import { PageButton } from "@/features/blog/pageInQuery/ui/PageButton";
import { PrevButton } from "@/features/blog/pageInQuery/ui/PrevButton";
import { NextButton } from "@/features/blog/pageInQuery/ui/NextButton";
import { TwoNextButton } from "@/features/blog/pageInQuery/ui/TwoNextButton";

export function PageList() {
  const { currentPage, pageNumbers, totalPages } = useGetPageList();

  return (
    <div className="flex items-center gap-2 justify-center mt-[50px] pb-[50px]">
      <TwoPrevButton page={currentPage} />
      <PrevButton page={currentPage} />
      {pageNumbers.map((page) => (
        <PageButton key={page} page={page} currentPage={currentPage} />
      ))}
      <NextButton page={0} totalPages={totalPages} />
      <TwoNextButton page={currentPage} totalPages={totalPages} />
    </div>
  );
}
