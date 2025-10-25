import {
  PolicyCheckBoxForm,
  PolicyFormButton,
} from "@/features/sign-up/checkPolicy";
import { SelectedProvider } from "@/features/sign-up/checkPolicy/model/SelectedProvider";

export function PolicyForm() {
  return (
    <SelectedProvider>
      <PolicyCheckBoxForm />
      <PolicyFormButton />
    </SelectedProvider>
  );
}
