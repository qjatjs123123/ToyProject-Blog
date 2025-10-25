import { PolicyCheckBoxForm, PolicyFormButton } from "@/features/sign-up/checkPolicyForm";
import { SelectedProvider } from "@/features/sign-up/checkPolicyForm/model/SelectedProvider";

export function PolicyForm() {
  return (
    <SelectedProvider>
      <PolicyCheckBoxForm />
      <PolicyFormButton />
    </SelectedProvider>
  );
}
