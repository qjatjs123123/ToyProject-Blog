/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Text } from "../Text/Text";

interface InputFieldProps {
  title: ReactNode;
  content: (field: any, fieldState: any) => ReactNode;
  rules?: any;
  control: any;
  name: string;
}

export function InputField({
  title,
  content,
  rules,
  control,
  name,
}: InputFieldProps) {
  return (
    <Controller
      name={name as string}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          {
            <div className="flex items-center justify-between h-[32px]">
              {title}
            </div>
          }

          {/* Input */}
          {content(field, fieldState)}

          {/* Error Message */}
          {fieldState.isTouched && fieldState.error && (
            <Text
              align="left"
              type="caption"
              size="1"
              className="text-[var(--color-status-error)]"
            >
              {fieldState.error.message}
            </Text>
          )}
        </div>
      )}
    />
  );
}
