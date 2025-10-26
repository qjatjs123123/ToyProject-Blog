"use client";
import { BusinessIdField, PasswordField } from "@/features/sign-in/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { SignInTitle } from "./SignInTitle";
import { LoginButton } from "@/features/sign-in/login";
import { GoToSignUpPageButton } from "@/features/sign-in/goToSignUp";
import {
  CheckProvider,
  getIdInLocalStorage,
  SaveIdCheckBox,
} from "@/features/sign-in/saveBusinessID";
import { SignInFormProps } from "@/entities/sign-in";

export function SingInForm() {
  const methods = useForm<SignInFormProps>({
    defaultValues: {
      businessNumber: getIdInLocalStorage(),
      password: "",
    },
    mode: "onChange",
  });
  return (
    <CheckProvider>
      <FormProvider {...methods}>
        <form className="flex flex-col">
          <SignInTitle />
          <BusinessIdField />
          <PasswordField />
          <SaveIdCheckBox />

          <LoginButton />
          <GoToSignUpPageButton />
        </form>
      </FormProvider>
    </CheckProvider>
  );
}
