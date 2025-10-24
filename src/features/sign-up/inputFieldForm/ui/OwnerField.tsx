/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { SingUpFormProps } from "../model/sign-up-form";
import { validateOwner } from "../model/validate";
import { OWNER } from "../config/constants";

interface OwnerFieldProps {
  owner: string;
}

export function OwnerField({ owner }: OwnerFieldProps) {
  const { control } = useFormContext<SingUpFormProps>();

  return (
    <InputField
      control={control}
      name="userName"
      rules={{
        validate: validateOwner,
      }}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {OWNER.title}
        </Text>
      }
      content={(field) => (
        <InputWrapper initialValue={owner}>
          {({ value, onChange }) => (
            <div className="relative w-full">
              <Input
                {...field}
                value={value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onChange(e);
                }}
                placeholder={OWNER.placeholder}
                type={"text"}
              />
            </div>
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
