import TwoLeftIcon from "@/shared/ui/Icon/TwoLeftIcon";

interface TwoPrevButtonProps {
  page: number;
}

export function TwoPrevButton({ page }: TwoPrevButtonProps) {
  return (
    <button
      disabled={Math.floor((page - 1) / 5) === 0}
      // onClick={goFirst}
      className={`px-2 py-1 rounded cursor-pointer ${
        Math.floor((page - 1) / 5) === 0 &&
        "text-[var(--color-status-disable)] cursor-not-allowed"
      }`}
    >
      <TwoLeftIcon />
    </button>
  );
}
