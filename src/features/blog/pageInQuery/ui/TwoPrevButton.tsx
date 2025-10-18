import { GroupingProps } from "@/entities/blog/model/types";
import TwoLeftIcon from "@/shared/ui/Icon/TwoLeftIcon";
import { useChangePageQuery } from "../model/actions";

interface TwoPrevButtonProps {
  grouping: GroupingProps;
}

export function TwoPrevButton({ grouping }: TwoPrevButtonProps) {
  const { currentGroupIndex, getStartPageByGroup } = grouping;
    const newStartPage = getStartPageByGroup(currentGroupIndex - 1);
    const changePageQuery = useChangePageQuery();

  return (
    <button
      disabled={currentGroupIndex === 0}
      onClick={() => changePageQuery(newStartPage)}
      className={`px-2 py-1 rounded cursor-pointer ${
        currentGroupIndex === 0 &&
        "text-[var(--color-status-disable)] cursor-not-allowed"
      }`}
    >
      <TwoLeftIcon />
    </button>
  );
}
