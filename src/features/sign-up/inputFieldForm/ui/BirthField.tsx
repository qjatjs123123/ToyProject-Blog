"use client";
import { Input, InputField } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { validateBirth } from "../lib/validate";
import { BIRTH, errorClass } from "../config/constants";
import { useBirth } from "../model/useBirth";
import { handleBirth } from "../lib/action";
import { BlankText } from "./BlankText";
import { useFormContext } from "react-hook-form";

export function BirthField() {
  const { control } = useBirth();
  const { trigger } = useFormContext();
  return (
    <InputField
      control={control}
      name={"birthDate"}
      rules={{
        required: BIRTH.error_message,
        validate: validateBirth,
      }}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {BIRTH.title}
        </Text>
      }
      content={(field, fieldState) => (
        <Input
          {...field}
          error={fieldState.isTouched && fieldState.error}
          onChange={(e) => handleBirth(e, field)}
          onBlur={(e) => {
            field.onBlur(e);
            trigger("birthDate");
          }}
          placeholder={BIRTH.placeholder}
          type={"text"}
        />
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
        return <BlankText />;
      }}
    />
  );
}
