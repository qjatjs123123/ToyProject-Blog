import { BusinessIdField } from "@/features/sign-up/authBusinessId";
import { SingUpFormProps } from "@/features/sign-up/signUpForm";
import { useForm } from "react-hook-form";

export function SignUpForm() {
  const { control, handleSubmit, setError, reset } = useForm<SingUpFormProps>({
    defaultValues: { businessNumber: "", password: "" },
    mode: "onChange",
  });

  return <BusinessIdField control={control}/>;
}
