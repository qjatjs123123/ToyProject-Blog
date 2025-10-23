/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, InputField } from "@/shared/ui";
import { Text } from "@/shared/ui";
import {
  title,
  subtitle,
  link,
  placeholder,
  validation_error,
  success_message,
} from "../config/constants";
import { handleBusinessNumber } from "../model/action";

interface BusinessIdFieldProps {
  control: any;
  mutate: (v: string) => void;
  isSuccess: boolean;
}

export function BusinessIdField({
  control,
  mutate,
  isSuccess,
}: BusinessIdFieldProps) {
  return (
    <InputField
      control={control}
      name="businessNumber"
      rules={{
        pattern: {
          value: /^\d{10}$/,
          message: validation_error,
        },
      }}

      title={
        <>
          <Text type="body" size="3" className="text-[var(--color-label-700)]">
            {title}
          </Text>
          <a target="_blank" href={link} rel="noopener noreferrer">
            <Text type="body" size="3" className="text-[var(--color-label-700)] underline underline-offset-4 hover:bg-[var(--color-background-alternative)]">
              {subtitle}
            </Text>
          </a>
        </>
      }

      content={(field, fieldState) => (
        <div className="flex gap-2 w-full">
          <Input
            {...field}
            type="text"
            placeholder={placeholder}
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

      footer={(fieldState) => {
        if (isSuccess) {
          return (
            <Text align="left" type="caption" size="1" className="text-[var(--color-status-correct)]" >
              {success_message}
            </Text>
          );
        }

        if (fieldState.isTouched && fieldState.error) {
          return (
            <Text align="left" type="caption" size="1" className="text-[var(--color-status-error)]">
              {fieldState.error.message}
            </Text>
          );
        }

        return null;
      }}
    />
  );
}
