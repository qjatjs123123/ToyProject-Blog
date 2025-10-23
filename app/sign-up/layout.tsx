import { ReactNode } from "react";
import { ProgressProvider } from "../../src/shared/ui/Progress/model/ProgressProvider";
import { StepProvider } from "@/features/sign-up/stepSignUpForm";
type Props = { children: ReactNode };

export const metadata = {
  title: "회원가입",
  description: "Allra 회원가입 페이지",
};

export default function Layout({ children }: Props) {
  return (
    <section className="mt-[100px] pt-[80px] pb-10 relative mx-auto max-w-[520px] md:px-7 space-y-8">
      <ProgressProvider>
        <StepProvider>
          {children}
        </StepProvider>
      </ProgressProvider>
    </section>
  );
}
