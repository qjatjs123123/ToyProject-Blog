import { useForm } from "react-hook-form";
import { useVerifyBusinessNumber } from "../model/useVerifyBusinessNumber";
import { BusinessIdField } from "./BusinessIdField";
import { SingUpFormProps } from "../../signUpForm";

export function AuthBusinessId() {
  const { mutate, isSuccess } = useVerifyBusinessNumber();
  const { control, handleSubmit, setError, reset } = useForm<SingUpFormProps>({
    defaultValues: { businessNumber: "", password: "" },
    mode: "all",
  });
  return (
    <>
      <BusinessIdField
        control={control}
        mutate={mutate}
        isSuccess={isSuccess}
      />
      {isSuccess && <div>성공</div>}
    </>
  );
}
