"use client";

import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { Button } from "@/shared/ui";
import { useSelected } from "../model/SelectedProvider";

export function PolicyFormButton() {
  const { setProgress } = useProgress();
  const { enabled } = useSelected();
  const disabled = !enabled;

  const clickBtn = () => {
    // setStep(1);
    setProgress(15);
  };
  return (
    <Button
      type={"primary"}
      style={"fill"}
      className="w-full"
      disabled={disabled}
      onClick={clickBtn}
    >
      다음
    </Button>
  );
}
