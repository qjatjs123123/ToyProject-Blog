import { ReactNode } from "react";

export const metadata = {
  title: "로그인",
  description: "Allra 로그인 페이지",
};

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <section className="h-full mt-[100px] pt-[80px] pb-10 relative mx-auto max-w-[520px] md:px-7 space-y-8">
      {children}
    </section>
  );
}
