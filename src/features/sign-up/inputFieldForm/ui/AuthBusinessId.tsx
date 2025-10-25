import { FormProvider, useForm } from "react-hook-form";
import { useVerifyBusinessNumber } from "../model/useVerifyBusinessNumber";
import { BusinessIdField } from "./BusinessIdField";
import { PasswordField } from "./PasswordField";
import { SingUpFormProps } from "../model/sign-up-form";
import { CompanyField } from "./CompanyField";
import { OwnerField } from "./OwnerField";
import { BirthField } from "./BirthField";
import { PhoneField } from "./PhoneField";
import { EmailFieldWithSuggest } from "./EmailField/EmailFieldWithSuggest";

export function AuthBusinessId() {
  const { mutate, isSuccess, data } = useVerifyBusinessNumber();

  const methods = useForm<SingUpFormProps>({
    defaultValues: {
      businessNumber: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      userName: "",
      birthDate: "",
      phone: "",
      email: "" 
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-5">
        <BusinessIdField isSuccess={isSuccess} mutate={mutate} />
        <PasswordField />
        {isSuccess && (
          <>
            <CompanyField company={data.company} />
            <OwnerField owner={data.owner} />
            <BirthField />
            <PhoneField />
            <EmailFieldWithSuggest />
          </>
        )}
      </form>
    </FormProvider>
  );
}
