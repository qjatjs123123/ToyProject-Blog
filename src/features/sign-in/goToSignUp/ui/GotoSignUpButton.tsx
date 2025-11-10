"use client";

import { useNavigationHistory } from "@/shared/model/useNavigationHistory";
import { Button } from "@/shared/ui";

export function GoToSignUpPageButton() {
  const { goTo } = useNavigationHistory();

  return (
    <Button
      dataCypress="goToSingUp-button"
      type="primary"
      style="outline"
      className="w-full mt-[8px]"
      onClick={() => goTo("/sign-up")}
    >
      회원가입
    </Button>
  );
}
