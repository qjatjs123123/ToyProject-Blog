"use client";

import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { Button } from "@/shared/ui";
import { useSelected } from "../model/SelectedProvider";
import { useStep } from "../../changeStep/model/StepProvider";
import { usePolicyFormService } from "../model/usePolicyFormService";

export function PolicyFormButton() {
  const { allSelected } = useSelected();
  const { goToForm } = usePolicyFormService();

  return (
    <Button
      type={"primary"}
      style={"fill"}
      className="w-full"
      disabled={!allSelected}
      onClick={goToForm}
    >
      다음
    </Button>
  );
}
