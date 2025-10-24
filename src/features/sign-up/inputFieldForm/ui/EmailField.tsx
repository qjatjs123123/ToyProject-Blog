'use client'
import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { validateEmail } from "../lib/validate";
import { EMAIL } from "../config/constants";
import { handleEmail } from "../lib/action";
import { useEmail } from "../model/useEmail";


export function EmailField() {
  const { control } = useEmail();

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
        <InputWrapper>
          {() => (
            <Input
              {...field}
              onChange={(e) => handleEmail(e, field)}
              placeholder={EMAIL.placeholder}
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
