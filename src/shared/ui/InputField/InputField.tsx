/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Text } from "../Text/Text";

interface InputFieldProps {
  title: ReactNode;
  content: (field: any, fieldState: any) => ReactNode;
  footer: (field: any, fieldState: any) => ReactNode; // optional
  successMessage?: string;
  rules?: any;
  control: any;
  name: string;
  defaultValue?: string
}

export function InputField({
  title,
  content,
  rules,
  control,
  footer,
  name,
  defaultValue,
}: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            {title}
          </div>

          {content(field, fieldState)}

          {footer(field, fieldState)}
        </div>
      )}
    />
  );
}
