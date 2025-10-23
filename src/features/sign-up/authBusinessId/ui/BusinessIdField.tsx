/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, InputField } from "@/shared/ui";
import { Text } from "@/shared/ui";
import {
  title,
  subtitle,
  link,
  placeholder,
  validation_error,
} from "../config/constants";
import { handleBusinessNumber } from "../model/action";
import { useVerifyBusinessNumber } from "../model/useVerifyBusinessNumber";

interface BusinessIdFieldProps {
  control: any;
}

export function BusinessIdField({ control }: BusinessIdFieldProps) {
  const { mutate } = useVerifyBusinessNumber();
  return (
    <InputField
      control={control}
      name={"businessNumber"}
      rules={{
        pattern: {
          value: /^[0-9]{10}$/,
          message: validation_error,
        },
      }}
      title={
        <>
          <Text type="body" size="3" className="text-[var(--color-label-700)]">
            {title}
          </Text>
          <a target="_blank" href={link}>
            <Text
              type="body"
              size="3"
              className="text-[var(--color-label-700)] underline underline-offset-4 hover:bg-[var(--color-background-alternative)]"
            >
              {subtitle}
            </Text>
          </a>
        </>
      }
      content={(field, fieldState) => (
        <div className="flex gap-2 w-full">
          <Input
            {...field}
            type={"text"}
            placeholder={placeholder}
            error={fieldState.isTouched && fieldState.error}
            onChange={(e) => handleBusinessNumber(e, field)}
          />
          <Button
            onClick={() => mutate(field.value)}
            type={"primary"}
            style={"fill"}
            disabled={false}
            className="!h-[48px] whitespace-nowrap"
          >
            {"인증하기"}
            {/* {!isAuth ? "인증하기" : "인증성공"} */}
          </Button>
        </div>
      )}
    />
  );
}
