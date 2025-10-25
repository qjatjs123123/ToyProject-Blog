import {
  BusinessIdField,
  PasswordField,
  SignUpFormProps,
  useVerifyBusinessNumber,
} from "@/features/sign-up/inputFieldForm";
import { FormProvider, useForm } from "react-hook-form";
import { AuthSuccessForm } from "./AuthSuccessForm";

export function SignUpForm() {
  const { mutate, isSuccess, data } = useVerifyBusinessNumber();

  const methods = useForm<SignUpFormProps>({
    defaultValues: {
      businessNumber: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      userName: "",
      birthDate: "",
      phone: "",
      email: "",
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-5">
        <BusinessIdField isSuccess={isSuccess} mutate={mutate} />
        <PasswordField />
        {isSuccess && (
          <AuthSuccessForm company={data.company} owner={data.owner} />
        )}
      </form>
    </FormProvider>
  );
}
