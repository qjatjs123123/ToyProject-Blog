'use client'

import { useRouter } from "next/navigation";
import { goPage } from "../model/actions";

interface PageButtonProps {
  page: number;
  currentPage: string;
}

export function PageButton({page, currentPage} : PageButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => goPage(page, router)}
      className={`px-3 py-1 rounded-full cursor-pointer ${
        currentPage === String(page)
          ? "bg-[#f1f5f9] text-[var(--color-label-900)] font-bold"
          : "text-[var(--color-label-700)] hover:bg-[var(--color-label-100)] hover:text-[var(--color-label-700)]"
      }`}
    >
      {page}
    </button>
  );
}
