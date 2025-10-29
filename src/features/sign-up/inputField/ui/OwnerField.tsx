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
  const { control } = useOwner(owner);
  
  return (
    <InputField
      control={control}
      name={OWNER.name}
      defaultValue={owner}
      rules={{
        required: OWNER.error_message,
        validate: validateOwner,
      }}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {OWNER.title}
        </Text>
      }
      content={(field, fieldState) => (
        <Input
          {...field}
          value={field.value}
          error={fieldState.isTouched && fieldState.error}
          onChange={(e) => field.onChange(e.target.value)}
          placeholder={OWNER.placeholder}
          type={"text"}
        />
      )}
      footer={(_, fieldState) => {
        const isError = fieldState.error;

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
