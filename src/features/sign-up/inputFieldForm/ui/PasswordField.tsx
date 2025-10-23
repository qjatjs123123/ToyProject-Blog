/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Text } from "@/shared/ui";
import { InputField } from "@/shared/ui";
import { handlePasswordFirst } from "../model/action";

interface PasswordFieldProps {
  control: any;
}
export function PasswordField({ control }: PasswordFieldProps) {
  return (
    <InputField
      control={control}
      name="password"
      rules={{
        pattern: {
          value:
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d\d!@#$%^&*(),.?":{}|<>]{8,15}$/,
          message: "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요",
        },
      }}
      title={
        <Text type="body" size="3" className="text-[var(--color-label-700)]">
          {"비밀번호"}
        </Text>
      }
      content={(field, fieldState) => (
        <div className="flex gap-2 w-full">
          <Input
            {...field}
            type="password"
            placeholder={"8~15자리/영문, 숫자, 특수문자 조합 입력"}
            error={fieldState.isTouched && fieldState.error}
            onChange={(e) => handlePasswordFirst(e, field)}
          />
        </div>
      )}
      footer={(_, fieldState) => {
        if (fieldState.isTouched && fieldState.error) {
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
        return 
      }}
    ></InputField>
  );
}
