import { Button, Input, InputField } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { SignInFormProps } from "@/entities/sign-in";
import { useFormContext } from "react-hook-form";
import { BUSINESS_ID } from "../config/constants";
import { handleBusinessNumber } from "../lib/action";
import { errorClass } from "@/shared/config/constants";
import { BlankText } from "@/shared/ui/Blank/BlankText";

export function BusinessIdField() {
  const { control } = useFormContext<SignInFormProps>();
  const { trigger } = useFormContext();

  return (
    <InputField
      control={control}
      name={BUSINESS_ID.name}
      rules={{
        required: BUSINESS_ID.error_message,
        pattern: {
          value: /^\d{10}$/,
          message: BUSINESS_ID.error_message,
        },
      }}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {BUSINESS_ID.title}
        </Text>
      }
      content={(field, fieldState) => (
        <Input
          {...field}
          value={field.value}
          type="text"
          placeholder={BUSINESS_ID.placeholder}
          error={fieldState.isTouched && fieldState.error}
          onChange={(e) => handleBusinessNumber(e, field)}
          onBlur={async (e) => {
            await trigger(BUSINESS_ID.name);
            field.onBlur(e);
          }}
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
      }}
    />
  );
}
