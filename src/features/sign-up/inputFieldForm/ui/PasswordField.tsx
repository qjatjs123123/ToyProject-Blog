"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputWrapper, Text } from "@/shared/ui";
import { InputField } from "@/shared/ui";
import { handlePassword } from "../lib/action";
import EyeOffIcon from "@/shared/ui/Icon/EyeOffIcon";
import EyeIcon from "@/shared/ui/Icon/EyeIcon";
import { useFormContext, useWatch } from "react-hook-form";
import { correctClass, errorClass, PASSWORD } from "../config/constants";
import { usePassword } from "../model/usePassword";
import { validateConfirmPassword, validatePassword } from "../lib/validate";
import { BlankText } from "./BlankText";

export function PasswordField() {
  const { control } = usePassword();
  const { trigger } = useFormContext();
  const password = useWatch({
    control,
    name: "password",
  });

  return (
    <div className="flex flex-col gap-1 w-full">
      <InputField
        control={control}
        name={PASSWORD.name.pw}
        rules={{
          required: PASSWORD.first_validation_error,
          validate: validatePassword,
        }}
        title={
          <Text type="body" size="3" className="text-[var(--color-label-700)]">
            {PASSWORD.title}
          </Text>
        }
        content={(field, fieldState) => (
          <div className="flex gap-2 w-full">
            <InputWrapper initalType="password">
              {({ type, setType }) => (
                <div className="relative w-full">
                  <Input
                    {...field}
                    type={type}
                    placeholder={PASSWORD.first_placeholder}
                    error={fieldState.isTouched && fieldState.error}
                    onChange={(e) => handlePassword(e, field)}
                    onBlur={async (e) => {
                      field.onBlur(e);
                      trigger("password");
                    }}
                  />

                  <WrapperIcon type={type} setType={setType} />
                </div>
              )}
            </InputWrapper>
          </div>
        )}
        footer={(_, fieldState) => {
          const isError = fieldState.isTouched && fieldState.error;

          if (isError) {
            return (
              <Text align="left" type="caption" className={errorClass}>
                {fieldState.error.message}
              </Text>
            );
          }
          return null;
        }}
      ></InputField>

      <InputField
        control={control}
        name={PASSWORD.name.pwc}
        rules={{
          validate: (value: string) => validateConfirmPassword(value, password),
        }}
        title={null}
        content={(field, fieldState) => (
          <InputWrapper initalType="password">
            {({ type, setType }) => (
              <div className="relative w-full">
                <Input
                  {...field}
                  type={type}
                  placeholder={PASSWORD.second_placeholder}
                  error={fieldState.isTouched && fieldState.error}
                  onChange={(e) => handlePassword(e, field)}
                  onFocus={() => field.onChange(field.value)}
                  onBlur={(e) => {
                    field.onBlur(e);
                    trigger("confirmPassword");
                  }}
                />

                <WrapperIcon type={type} setType={setType} />
              </div>
            )}
          </InputWrapper>
        )}
        footer={(field, fieldState) => {
          const isError = fieldState.isTouched && fieldState.invalid;
          const isSuccess = !fieldState.invalid && field.value;

          if (isError) {
            return (
              <Text align="left" type="caption" className={errorClass}>
                {fieldState.error.message}
              </Text>
            );
          }
          if (isSuccess) {
            return (
              <Text align="left" type="caption" className={correctClass}>
                {PASSWORD.success_message}
              </Text>
            );
          }
          return <BlankText />;
        }}
      />
    </div>
  );
}

interface WrapperIconProps {
  setType: any;
  type: string;
}

function WrapperIcon({ setType, type }: WrapperIconProps) {
  return (
    <div
      onClick={() => setType(type === "text" ? "password" : "text")}
      className="absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer "
    >
      {type === "text" ? <EyeOffIcon /> : <EyeIcon />}
    </div>
  );
}
