/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { SingUpFormProps } from "../model/sign-up-form";

interface CompanyFieldProps {
  company: string;
}

export function CompanyField({ company }: CompanyFieldProps) {
  const { control } = useFormContext<SingUpFormProps>();

  return (
    <InputField
      control={control}
      name="companyName"
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {"상호명"}
        </Text>
      }
      content={(field) => (
        <InputWrapper initialValue={company}>
          {() => (
            <div className="relative w-full">
              <Input
                {...field}
                value={company}
                type={"text"}
                readonly={true}
              />
            </div>
          )}
        </InputWrapper>
      )}
      footer={() => {
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
