import LeftIcon from "@/shared/ui/Icon/LeftIcon";
import RightIcon from "@/shared/ui/Icon/RightIcon";

interface PrevButtonProps {
  page: number;
}

export function PrevButton({ page }: PrevButtonProps) {
  return (
    <button
      disabled={page === 1}
      // onClick={goPrev}
      className={`px-2 py-1 rounded cursor-pointer ${
        page === 1 && "text-[var(--color-status-disable)] cursor-not-allowed"
      }`}
    >
      <LeftIcon />
    </button>
  );
}
