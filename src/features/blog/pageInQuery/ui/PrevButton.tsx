import LeftIcon from "@/shared/ui/Icon/LeftIcon";
import { useChangePageQuery } from "../model/actions";
import { PageNationProps } from "@/entities/blog/model/types";

interface PrevButtonProps {
  pagination: PageNationProps
}

export function PrevButton({ pagination }: PrevButtonProps) {
  const changePageQuery = useChangePageQuery();
  const { currentPage } = pagination;

  return (
    <button
      disabled={currentPage === 1}
      onClick={() => changePageQuery(currentPage - 1)}
      className={`px-2 py-1 rounded cursor-pointer ${
        currentPage === 1 && "text-[var(--color-status-disable)] cursor-not-allowed"
      }`}
    >
      <LeftIcon />
    </button>
  );
}
