"use client";
import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { validateBirth } from "../lib/validate";
import { BIRTH, errorClass } from "../config/constants";
import { useBirth } from "../model/useBirth";
import { handleBirth } from "../lib/action";
import { BlankText } from "./BlankText";

export function BirthField() {
  const { control } = useBirth();

  return (
    <InputField
      control={control}
      name={BIRTH.name}
      rules={{
        validate: validateBirth,
      }}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {BIRTH.title}
        </Text>
      }
      content={(field) => (
        <InputWrapper>
          {() => (
            <Input
              {...field}
              onChange={(e) => handleBirth(e, field)}
              placeholder={BIRTH.placeholder}
              type={"text"}
            />
          )}
        </InputWrapper>
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
