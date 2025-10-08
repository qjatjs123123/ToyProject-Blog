
import TwoRightIcon from "@/shared/ui/Icon/TwoRightIcon";

interface TwoNextButtonProps {
  page: number;
  totalPages: number;
}

export function TwoNextButton({ page, totalPages }: TwoNextButtonProps) {
  return (
    <button
      disabled={Math.floor((page - 1) / 5) === Math.floor((totalPages - 1) / 5)}
      // onClick={goLast}
      className={`px-2 py-1 rounded cursor-pointer ${
        Math.floor((page - 1) / 5) === Math.floor((totalPages - 1) / 5) &&
        "text-[var(--color-status-disable)] cursor-not-allowed"
      }`}
    >
      <TwoRightIcon />
    </button>
  );
}
