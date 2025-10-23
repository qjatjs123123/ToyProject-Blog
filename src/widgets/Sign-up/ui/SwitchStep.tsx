import { useStep } from "@/features/sign-up/stepSignUpForm/model/StepProvider";
import { PolicyForm } from "./PolicyForm";

export function SwitchStep() {
  const { step } = useStep();

  switch (step) {
    case "policy":
      return <PolicyForm />;
    case "form":
      return <div>rgi</div>;
    default:
      return null;
  }
}
