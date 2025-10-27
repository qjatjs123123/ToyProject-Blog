"use client";

import { Button } from "@/shared/ui";
import { useNavigationHistory } from "@/shared/model/useNavigationHistory";

export function BackToBlogButton() {
  const { goBack } = useNavigationHistory();

  return (
    <Button type="default" style="outline" onClick={goBack}>
      목록으로 돌아가기
    </Button>
  );
}
