// features/policyForm/usePolicyFormUseCase.ts
import { useStep } from "../../changeStep/model/StepProvider";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";

export function usePolicyFormService() {
  const { setStep } = useStep();
  const { setProgress } = useProgress();

  const goToForm = () => {
    setStep("form");
    setProgress(15);
  };

  return { goToForm };
}
