"use client";
import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { validatePhone } from "../lib/validate";
import { errorClass, PHONE } from "../config/constants";
import { handlePhone } from "../lib/action";
import { usePhone } from "../model/usePhone";
import { BlankText } from "./BlankText";
import { useFormContext } from "react-hook-form";

export function PhoneField() {
  const { control } = usePhone();
  const { trigger } = useFormContext();
  return (
    <InputField
      control={control}
      name={PHONE.name}
      rules={{
        required: PHONE.error_message,
        validate: validatePhone,
      }}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {PHONE.title}
        </Text>
      }
      content={(field, fieldState) => (
        <Input
          {...field}
          onChange={(e) => handlePhone(e, field)}
          error={fieldState.isTouched && fieldState.error}
          onBlur={(e) => {
            field.onBlur(e);
            trigger(PHONE.name);
          }}
          placeholder={PHONE.placeholder}
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
