import { Button, Input, InputField } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { BUSINESS_ID, correctClass, errorClass } from "../config/constants";
import { handleBusinessNumber } from "../lib/action";
import { useFormContext } from "react-hook-form";
import { SignUpFormProps } from "../model/sign-up-form";
import { BlankText } from "./BlankText";

interface BusinessIdFieldProps {
  mutate: (v: string) => void;
  isSuccess: boolean;
}

export function BusinessIdField({ mutate, isSuccess }: BusinessIdFieldProps) {
  const { control } = useFormContext<SignUpFormProps>();
  const { trigger } = useFormContext();

  return (
    <InputField
      control={control}
      name={BUSINESS_ID.name}
      rules={{
        required: BUSINESS_ID.validation_error,
        pattern: {
          value: /^\d{10}$/,
          message: BUSINESS_ID.validation_error,
        },
      }}
      title={
        <>
          <Text type="body" size="3" className="text-[var(--color-label-700)]">
            {BUSINESS_ID.title}
          </Text>
          <a target="_blank" href={BUSINESS_ID.link} rel="noopener noreferrer">
            <Text
              type="body"
              size="3"
              className="text-[var(--color-label-700)] underline underline-offset-4 hover:bg-[var(--color-background-alternative)]"
            >
              {BUSINESS_ID.subtitle}
            </Text>
          </a>
        </>
      }
      content={(field, fieldState) => (
        <div className="flex gap-2 w-full">
          <Input
            {...field}
            readonly={isSuccess}
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
          <Button
            onClick={() => mutate(field.value)}
            type="primary"
            style="fill"
            disabled={fieldState.error || isSuccess || field.value === ""}
            className="!h-[48px] whitespace-nowrap"
          >
            {isSuccess ? "인증성공" : "인증하기"}
          </Button>
        </div>
      )}
      footer={(_, fieldState) => {
        const isError = fieldState.isTouched && fieldState.error;

        if (isSuccess) {
          return (
            <Text align="left" type="caption" className={correctClass}>
              {BUSINESS_ID.success_message}
            </Text>
          );
        }
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
