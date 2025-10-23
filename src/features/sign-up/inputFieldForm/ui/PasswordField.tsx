/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputWrapper, Text } from "@/shared/ui";
import { InputField } from "@/shared/ui";
import { handlePasswordFirst } from "../model/action";
import EyeOffIcon from "@/shared/ui/Icon/EyeOffIcon";
import EyeIcon from "@/shared/ui/Icon/EyeIcon";
import { useWatch } from "react-hook-form";

interface PasswordFieldProps {
  control: any;
}
export function PasswordField({ control }: PasswordFieldProps) {
  const password = useWatch({
    control,
    name: "password",
  });

  return (
    <div className="flex flex-col gap-1 w-full">
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
            <InputWrapper initalType="password">
              {({ type, setType }) => (
                <div className="relative w-full">
                  <Input
                    {...field}
                    type={type}
                    placeholder={"8~15자리/영문, 숫자, 특수문자 조합 입력"}
                    error={fieldState.isTouched && fieldState.error}
                    onChange={(e) => handlePasswordFirst(e, field)}
                  />
                  <div
                    onClick={() =>
                      setType(type === "text" ? "password" : "text")
                    }
                    className="absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer "
                  >
                    {type === "text" ? <EyeOffIcon /> : <EyeIcon />}
                  </div>
                </div>
              )}
            </InputWrapper>
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
          return;
        }}
      ></InputField>

      <InputField
        control={control}
        name="confirmPassword"
        rules={{
          validate: (value: string) =>
            value === password || "비밀번호가 일치하지 않습니다",
        }}
        title={null}
        content={(field, fieldState) => (
          <InputWrapper initalType="password">
            {({ type, setType }) => (
              <div className="relative w-full">
                <Input
                  {...field}
                  type={type}
                  placeholder={"재입력"}
                  error={fieldState.isTouched && fieldState.error}
                  onChange={(e) => handlePasswordFirst(e, field)}
                />
                <div
                  onClick={() => setType(type === "text" ? "password" : "text")}
                  className="absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer "
                >
                  {type === "text" ? <EyeOffIcon /> : <EyeIcon />}
                </div>
              </div>
            )}
          </InputWrapper>
        )}
        footer={(field, fieldState) => {
          if (fieldState.isTouched && fieldState.invalid) {
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
          if (!fieldState.invalid && field.value) {
            return (
              <Text
                align="left"
                type="caption"
                size="1"
                className="text-[var(--color-status-correct)]"
              >
                비밀번호가 일치합니다.
              </Text>
            );
          }
          return null;
        }}
      />
    </div>
  );
}
