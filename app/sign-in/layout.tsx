import { ReactNode } from "react";

export const metadata = {
  title: "로그인",
  description: "Allra 로그인 페이지",
};

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <section className="h-full mt-[100px] pt-[80px] pb-10 relative mx-auto max-w-[520px] md:px-7 space-y-8">
      <article className="mx-auto  max-w-[550px] h-full max-md:w-full px-[0.8rem] ">
        <div className="pt-[80px] max-md:w-full pb-[2.5rem] relative mx-auto max-w-[500px] px-[1rem]">
          {children}
        </div>
      </article>
    </section>
  );
}
