import RightIcon from "@/shared/ui/Icon/RightIcon";
import { useChangePageQuery } from "../model/actions";

interface NextButtonProps {
  currentPage: number;
  totalPages: number;
}

export function NextButton({ currentPage, totalPages }: NextButtonProps) {
  const changePageQuery = useChangePageQuery();

  return (
    <button
      disabled={currentPage === totalPages}
      onClick={() => changePageQuery(currentPage + 1)}
      className={`px-2 py-1 rounded cursor-pointer ${
        currentPage === totalPages &&
        "!text-[var(--color-status-disable)] cursor-not-allowed"
      }`}
    >
      <RightIcon color={currentPage === totalPages ? "#cbd5e1" : "black"} />
    </button>
  );
}
