import RightIcon from "./svg/RightIcon";

export default function Nav() {
  return (
    <div className="fixed top-[60px] w-full h-[40px]  bg-[var(--color-label-100)] text-[0.875rem] text-[var(--color-label-700)] z-[100]">
      <div className="container flex items-center justify-end h-full">
        홈 <RightIcon /> 로그인
      </div>
    </div>
  );
}
