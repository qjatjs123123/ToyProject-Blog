/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, InputField } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { BUSINESS_ID } from "../config/constants";
import { handleBusinessNumber } from "../lib/action";
import { useFormContext } from "react-hook-form";
import { SingUpFormProps } from "../model/sign-up-form";

interface BusinessIdFieldProps {
  mutate: (v: string) => void;
  isSuccess: boolean;
}

export function BusinessIdField({ mutate, isSuccess }: BusinessIdFieldProps) {
  const { control } = useFormContext<SingUpFormProps>();

  return (
    <InputField
      control={control}
      name="businessNumber"
      rules={{
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
            type="text"
            placeholder={BUSINESS_ID.placeholder}
            error={fieldState.isTouched && fieldState.error}
            onChange={(e) => handleBusinessNumber(e, field)}
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
            <Text
              align="left"
              type="caption"
              size="1"
              className="text-[var(--color-status-correct)]"
            >
              {BUSINESS_ID.success_message}
            </Text>
          );
        }
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
