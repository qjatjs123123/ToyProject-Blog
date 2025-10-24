import { FormProvider, useForm } from "react-hook-form";
import { useVerifyBusinessNumber } from "../model/useVerifyBusinessNumber";
import { BusinessIdField } from "./BusinessIdField";
import { PasswordField } from "./PasswordField";
import { SingUpFormProps } from "../model/sign-up-form";
import { CompanyField } from "./CompanyField";
import { OwnerField } from "./OwnerField";

export function AuthBusinessId() {
  const { mutate, isSuccess, data } = useVerifyBusinessNumber();

  const methods = useForm<SingUpFormProps>({
    defaultValues: {
      businessNumber: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      userName: "",
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-5">
        <BusinessIdField isSuccess={isSuccess} mutate={mutate} />
        <PasswordField />
        {isSuccess && (
          <div>
            <CompanyField company={data.company} />
            <OwnerField owner={data.owner} />
          </div>
        )}
      </form>
    </FormProvider>
  );
}
