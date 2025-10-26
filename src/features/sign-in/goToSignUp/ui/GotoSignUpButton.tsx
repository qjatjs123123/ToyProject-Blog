"use client";

import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

export function GoToSignUpPageButton() {
  const router = useRouter();

  return (
    <Button
      type="primary"
      style="outline"
      className="w-full"
      onClick={() => router.push("/sign-up")}
    >
      회원가입
    </Button>
  );
}
