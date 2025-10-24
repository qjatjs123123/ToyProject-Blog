import { FormProvider, useForm } from "react-hook-form";
import { useVerifyBusinessNumber } from "../model/useVerifyBusinessNumber";
import { BusinessIdField } from "./BusinessIdField";
import { PasswordField } from "./PasswordField";
import { SingUpFormProps } from "../model/sign-up-form";

export function AuthBusinessId() {
  const { mutate, isSuccess } = useVerifyBusinessNumber();

  const methods = useForm<SingUpFormProps>({
    defaultValues: { businessNumber: "", password: "",confirmPassword:"" },
    mode: "onChange",
  });


  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-8">
        <BusinessIdField isSuccess={isSuccess} mutate={mutate}/>
        <PasswordField />
        {isSuccess && <div>성공</div>}
      </form>
    </FormProvider>
  );
}
