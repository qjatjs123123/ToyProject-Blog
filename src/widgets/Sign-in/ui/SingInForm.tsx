"use client";
import {
  BusinessIdField,
  PasswordField,
  SignInFormProps,
} from "@/features/sign-in/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { SignInTitle } from "./SignInTitle";
import { LoginButton } from "@/features/sign-in/login";
import { GoToSignUpPageButton } from "@/features/sign-in/goToSignUp";
import { SaveIdCheckBox } from "@/features/sign-in/saveBusinessID";

export function SingInForm() {
  const methods = useForm<SignInFormProps>({
    defaultValues: {
      businessNumber: "",
      password: "",
    },
    mode: "onChange",
  });
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4">
        <div className="mb-[10px] ">
          <SignInTitle />
        </div>
        <BusinessIdField />
        <PasswordField />
        <SaveIdCheckBox />
        <div className="flex flex-col gap-2">
          <LoginButton />
          <GoToSignUpPageButton />
        </div>
      </form>
    </FormProvider>
  );
}
