"use client";
import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { validateEmail } from "../lib/validate";
import { EMAIL, errorClass } from "../config/constants";
import { handleEmail } from "../lib/action";
import { useEmail } from "../model/useEmail";
import { BlankText } from "./BlankText";
import { useFormContext } from "react-hook-form";

export function EmailField() {
  const { control } = useEmail();
  const { trigger } = useFormContext();
  return (
    <InputField
      control={control}
      name={EMAIL.name}
      rules={{
        validate: validateEmail,
      }}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {EMAIL.title}
        </Text>
      }
      content={(field) => (
        <Input
          {...field}
          onChange={(e) => handleEmail(e, field)}
          onBlur={async (e) => {
            field.onBlur(e);
            trigger(EMAIL.name);
          }}
          placeholder={EMAIL.placeholder}
          type={"text"}
        />
      )}
      footer={(_, fieldState) => {
        const isError = fieldState.isTouched && fieldState.error;

        if (isError)
          return (
            <Text align="left" type="caption" className={errorClass}>
              {fieldState.error.message}
            </Text>
          );

        return <BlankText />;
      }}
    />
  );
}
