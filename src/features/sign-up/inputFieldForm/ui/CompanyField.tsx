/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { SingUpFormProps } from "../model/sign-up-form";
import { COMPANY } from "../config/constants";

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
          {COMPANY.title}
        </Text>
      }
      content={(field) => (
        <InputWrapper initialValue={company}>
          {() => (
            <Input {...field} value={company} type={"text"} readonly={true} />
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
