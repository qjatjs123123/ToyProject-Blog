"use client";

import { TwoPrevButton } from "@/features/blog/pageInQuery/ui/TwoPrevButton";
import { useGetPagiNation } from "@/entities/blog";
import { PageButton } from "@/features/blog/pageInQuery/ui/PageButton";
import { PrevButton } from "@/features/blog/pageInQuery/ui/PrevButton";
import { NextButton } from "@/features/blog/pageInQuery/ui/NextButton";
import { TwoNextButton } from "@/features/blog/pageInQuery/ui/TwoNextButton";

export function PageList() {
  const { pagination, grouping } = useGetPagiNation();

  return (
    <div className="flex items-center gap-2 justify-center mt-[50px] pb-[50px]">
      <TwoPrevButton page={pagination.currentPage} />
      <PrevButton pagination={pagination} />
      {pagination.pageNumbers.map((page: number) => (
        <PageButton
          key={page}
          page={page}
          currentPage={pagination.currentPage}
        />
      ))}
      <NextButton pagination={pagination} />
      <TwoNextButton grouping={grouping} />
    </div>
  );
}
