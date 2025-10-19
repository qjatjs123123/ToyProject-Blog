import TwoRightIcon from "@/shared/ui/Icon/TwoRightIcon";
import { GroupingProps } from "@/entities/blog";
import { useChangePageQuery } from "../model/actions";

interface TwoNextButtonProps {
  grouping: GroupingProps;
}

export function TwoNextButton({ grouping }: TwoNextButtonProps) {
  const { currentGroupIndex, lastGroupIndex, getStartPageByGroup } = grouping;
  const newStartPage = getStartPageByGroup(currentGroupIndex + 1);
  const changePageQuery = useChangePageQuery();

  return (
    <button
      disabled={currentGroupIndex === lastGroupIndex}
      onClick={() => changePageQuery(newStartPage)}
      className={`px-2 py-1 rounded cursor-pointer ${
        currentGroupIndex === lastGroupIndex &&
        "text-[var(--color-status-disable)] cursor-not-allowed"
      }`}
    >
      <TwoRightIcon />
    </button>
  );
}
