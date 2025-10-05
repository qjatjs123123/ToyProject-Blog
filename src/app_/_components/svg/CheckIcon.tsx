import React from "react";

type CheckIconProps = React.SVGProps<SVGSVGElement>;

const CheckIcon: React.FC<CheckIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-check absolute w-[13px] h-[13px]"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};

export default CheckIcon;
