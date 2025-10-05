import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const SearchIcon: React.FC<Props> = (props) => (
  <svg
    className="w-[16px] h-[16px] text-[var(--color-label-700)]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m21 21-4.34-4.34" />
    <circle cx={11} cy={11} r={8} />
  </svg>
);

export default SearchIcon;
