import { useStep } from "@/features/sign-up/stepSignUpForm/model/StepProvider";
import { PolicyForm } from "./PolicyForm";
import { SignUpForm } from "./SignUpForm";

export function SwitchStep() {
  const { step } = useStep();

  switch (step) {
    case "policy":
      return <PolicyForm />;
    case "form":
      return <SignUpForm />;
    default:
      return null;
  }
}
