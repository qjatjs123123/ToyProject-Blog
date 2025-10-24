import { Input, InputField, InputWrapper } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { validateOwner } from "../lib/validate";
import { errorClass, OWNER } from "../config/constants";
import { useOwner } from "../model/useOwner";
import { BlankText } from "./BlankText";

interface OwnerFieldProps {
  owner: string;
}

export function OwnerField({ owner }: OwnerFieldProps) {
  const { control } = useOwner();

  return (
    <InputField
      control={control}
      name={OWNER.name}
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
          )}
        </InputWrapper>
      )}
      footer={(_, fieldState) => {
        const isError = fieldState.isTouched && fieldState.error;

        if (isError) {
          return (
            <Text align="left" type="caption" className={errorClass}>
              {fieldState.error.message}
            </Text>
          );
        }
        return <BlankText />;
      }}
    />
  );
}
