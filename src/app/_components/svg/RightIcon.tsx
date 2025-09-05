
interface ChevronsRightIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const RightIcon: React.FC<ChevronsRightIconProps> = ({
  size = 24,
  color = "#9CA3AF",
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
    className="lucide lucide-chevron-right"
    aria-hidden="true"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default RightIcon;
