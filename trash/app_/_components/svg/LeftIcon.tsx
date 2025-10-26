import React from "react";

interface ChevronLeftIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const LeftIcon: React.FC<ChevronLeftIconProps> = ({
  size = 24,
  color = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export default LeftIcon;
