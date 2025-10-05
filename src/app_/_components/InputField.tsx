/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller } from "react-hook-form";
import Text from "./Text";
import Input from "./Input";

type InputFieldProps = {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  rules?: any;
  type?: "text" | "password";
  restrictor?: (value: string) => boolean;
  onChange?: (value: string) => void;
};

export default function InputField({
  name,
  control,
  label,
  placeholder,
  rules,
  type = "text",
  restrictor = () => true,
  onChange = () => {}
}: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          {/* Label */}
          <div className="flex items-center justify-between h-[32px]">
            <Text
              type="body"
              size="3"
              className="text-[var(--color-label-700)]"
            >
              {label}
            </Text>
          </div>
          {/* Input */}
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            error={!!fieldState.error}
            onChange={(e) => {
              const value = e.target.value;
              if (restrictor(value)) field.onChange(value);
            }}

          />

          {/* Error Message */}
          {fieldState.error && (
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
