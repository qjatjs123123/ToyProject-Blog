"use client";
import { Input, InputField } from "@/shared/ui";
import { Text } from "@/shared/ui";
import { validateEmail } from "../../lib/validate";
import { EMAIL, errorClass } from "../../config/constants";
import { handleEmail } from "../../lib/action";
import { useEmail } from "../../model/useEmail";
import { BlankText } from "../BlankText";
import { useFormContext } from "react-hook-form";
import { EmailFieldWrapper } from "./EmailFieldWrapper";

export function EmailFieldWithSuggest() {
  const { control } = useEmail();
  const { trigger } = useFormContext();

  return (
    <EmailFieldWrapper>
      {({ setShowEmailSuggest }) => (
        <InputField
          control={control}
          name={EMAIL.name}
          rules={{
            validate: validateEmail,
          }}
          title={
            <Text
              type="body"
              size="3"
              className="text-[var(--color-label-700)]"
            >
              {EMAIL.title}
            </Text>
          }
          content={(field) => (
            <Input
              {...field}
              onChange={(e) => {
                handleEmail(e, field);
                setShowEmailSuggest(true);
              }}
              onBlur={(e) => {
                field.onBlur(e);
                trigger(EMAIL.name);
                setShowEmailSuggest(false);
              }}
              placeholder={EMAIL.placeholder}
              type={"text"}
            />
          )}
          footer={(_, fieldState) => {
            const isError = fieldState.isTouched && fieldState.error;

            if (isError)
              return (
                <Text align="left" type="caption" className={errorClass}>
                  {fieldState.error.message}
                </Text>
              );

            return <BlankText />;
          }}
        />
      )}
    </EmailFieldWrapper>
  );
}
