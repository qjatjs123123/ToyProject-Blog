import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { SingUpFormProps } from "../model/sign-up-form";
import { COMPANY } from "../config/constants";
import { BlankText } from "./BlankText";

interface CompanyFieldProps {
  company: string;
}

export function CompanyField({ company }: CompanyFieldProps) {
  const { control } = useFormContext<SingUpFormProps>();

  return (
    <InputField
      control={control}
      name={COMPANY.name}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {COMPANY.title}
        </Text>
      }
      content={(field) => (
        <Input {...field} value={company} type={"text"} readonly={true} />
      )}
      footer={() => <BlankText />}
    />
  );
}
