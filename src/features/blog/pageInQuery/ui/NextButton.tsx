import RightIcon from "@/shared/ui/Icon/RightIcon";
import { useChangePageQuery } from "../model/actions";
import { PageNationProps } from "@/widgets/Blog/BlogPageList/model/type";

interface NextButtonProps {
  pagination : PageNationProps
}

export function NextButton({ pagination }: NextButtonProps) {
  const changePageQuery = useChangePageQuery();
  const {currentPage, totalPages} = pagination;

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
