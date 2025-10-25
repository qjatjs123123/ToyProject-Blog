import { useStep } from "@/features/sign-up/changeStep/model/StepProvider";
import { PolicyForm } from "./PolicyStep/PolicyForm";
import { SignUpForm } from "./SignUpStep/SignUpForm";

export function SwitchStep() {
  const { step } = useStep();

  switch (step) {
    case "policy":
      return <PolicyForm />;
    case "form":
      return <SignUpForm />
    default:
      return null;
  }
}
