'use client'
import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { validatePhone } from "../lib/validate";
import { PHONE } from "../config/constants";
import { handlePhone } from "../lib/action";
import { usePhone } from "../model/usePhone";


export function PhoneField() {
  const { control } = usePhone();

  return (
    <InputField
      control={control}
      name={PHONE.name}
      rules={{
        validate: validatePhone,
      }}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {PHONE.title}
        </Text>
      }
      content={(field) => (
        <InputWrapper>
          {() => (
            <Input
              {...field}
              onChange={(e) => handlePhone(e, field)}
              placeholder={PHONE.placeholder}
              type={"text"}
            />
          )}
        </InputWrapper>
      )}
      footer={(_, fieldState) => {
        const isError = fieldState.isTouched && fieldState.error;

        if (isError) {
          return (
            <Text
              align="left"
              type="caption"
              size="1"
              className="text-[var(--color-status-error)]"
            >
              {fieldState.error.message}
            </Text>
          );
        }
        return (
          <Text
            align="left"
            type="caption"
            size="1"
            className="opacity-0 select-none"
          >
            placeholder
          </Text>
        );
      }}
    />
  );
}
