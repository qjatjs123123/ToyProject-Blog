"use client";

import LeftIcon from "@/app/_components/svg/LeftIcon";
import RightIcon from "@/app/_components/svg/RightIcon";
import TwoLeftIcon from "@/app/_components/svg/TwoLeftIcon";
import TwoRightIcon from "@/app/_components/svg/TwoRightIcon";
import { useEffect, useMemo, useState } from "react";
import { useBlogsQuery } from "../hooks/useBlogsQuery";

export default function Pagination() {
  const buttonCnt = 5;
  const { data } = useBlogsQuery();
  const { page, totalPages } = data;
  const [currentPage, setCurrentPage] = useState(page);
  const groupIndex = useMemo(() => Math.floor((page - 1) / buttonCnt), [page]);
  const startPage = groupIndex * buttonCnt + 1;
  const endPage = Math.min(startPage + buttonCnt - 1, totalPages);
  const pageNumbers = useMemo(
    () =>
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    [startPage, endPage]
  );

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, "", newUrl);
  }, [currentPage]);

  const goFirst = () => setCurrentPage((groupIndex - 1) * buttonCnt + 1);
  const goLast = () => setCurrentPage(Math.min((groupIndex + 1) * buttonCnt + 1, totalPages));
  const goPrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const goNext = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goPage = (page: number) => setCurrentPage(page);

  return (
    <div className="flex items-center gap-2 justify-center mt-[50px] pb-[50px]">
      {/* 첫 페이지, 이전 페이지 */}
      <button
        disabled={Math.floor((page - 1) / 5) === 0}
        onClick={goFirst}
        className={`px-2 py-1 rounded cursor-pointer ${
          Math.floor((page - 1) / 5) === 0 &&
          "text-[var(--color-status-disable)] cursor-not-allowed"
        }`}
      >
        <TwoLeftIcon />
      </button>

      <button
        disabled={page === 1}
        onClick={goPrev}
        className={`px-2 py-1 rounded cursor-pointer ${
          page === 1 && "text-[var(--color-status-disable)] cursor-not-allowed"
        }`}
      >
        <LeftIcon />
      </button>

      {/* 페이지 버튼 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => goPage(page)}
          className={`px-3 py-1 rounded-full cursor-pointer ${
            currentPage === page
              ? "bg-[#f1f5f9] text-[var(--color-label-900)] font-bold"
              : "text-[var(--color-label-700)] hover:bg-[var(--color-label-100)] hover:text-[var(--color-label-700)]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지, 마지막 페이지 */}
      <button
        disabled={page === totalPages}
        onClick={goNext}
        className={`px-2 py-1 rounded cursor-pointer ${
          page === totalPages &&
          "!text-[var(--color-status-disable)] cursor-not-allowed"
        }`}
      >
        <RightIcon color={page === totalPages ? "#cbd5e1" : "black"} />
      </button>

      <button
        disabled={
          Math.floor((page - 1) / 5) === Math.floor((totalPages - 1) / 5)
        }
        onClick={goLast}
        className={`px-2 py-1 rounded cursor-pointer ${
          Math.floor((page - 1) / 5) === Math.floor((totalPages - 1) / 5) &&
          "text-[var(--color-status-disable)] cursor-not-allowed"
        }`}
      >
        <TwoRightIcon />
      </button>
    </div>
  );
}
