"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputWrapper, Text } from "@/shared/ui";
import { InputField } from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { SignInFormProps } from "../model/sign-in-form";
import { PASSWORD } from "../config/constants";
import { validatePassword } from "../lib/validate";
import EyeOffIcon from "@/shared/ui/Icon/EyeOffIcon";
import EyeIcon from "@/shared/ui/Icon/EyeIcon";
import { errorClass } from "@/shared/config/constants";

export function PasswordField() {
  const { control } = useFormContext<SignInFormProps>();
  const { trigger } = useFormContext();

  return (
    <InputField
      control={control}
      name={PASSWORD.name}
      rules={{
        required: PASSWORD.error_message,
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
                  placeholder={PASSWORD.placeholder}
                  error={fieldState.isTouched && fieldState.error}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={async (e) => {
                    await trigger("password");
                    field.onBlur(e);
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
