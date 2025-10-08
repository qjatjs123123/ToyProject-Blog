import RightIcon from "@/shared/ui/Icon/RightIcon";

interface NextButtonProps {
  page: number;
  totalPages: number;
}

export function NextButton({page, totalPages}: NextButtonProps) {
  return (
    <button
      disabled={page === totalPages}
      // onClick={goNext}
      className={`px-2 py-1 rounded cursor-pointer ${
       page === totalPages &&
        "!text-[var(--color-status-disable)] cursor-not-allowed"
      }`}
    >
      <RightIcon color={page=== totalPages ? "#cbd5e1" : "black"} />
    </button>
  );
}
