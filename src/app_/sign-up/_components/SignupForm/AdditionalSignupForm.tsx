import { Field } from "@/app_/_components/Field";
import { BusinessDataProps, FormValues } from "../../types/type";
import { formatBirth, formatPhone } from "@/utils/format";
import { invalidBirth, invalidEmail, invalidPhone } from "@/utils/validations";
import { useProgress } from "../../_providers/ProgressProvider";
import { EmailSuggest } from "./EmailSuggest";
import { RefObject } from "react";

export default function AdditionalSignupForm({
  businessData,
  formData
}: {
  businessData: BusinessDataProps;
  formData: RefObject<FormValues>
}) {
  const { handleProgress } = useProgress();

  return (
    <>
      {/**상호명 */}
      <Field init={businessData.company}>
        <Field.Label left="상호명" />
        <Field.Input readonly type="text" />
      </Field>

      {/**대표자 */}
      <Field init={businessData.owner}>
        <Field.Label left="대표자" />
        <Field.Input
          type="text"
          placeholder="사업자등록증에 기재된 대표자명 입력"
          validator={(value: string) => value.length === 0}
          errorMessage="대표자명을 입력해주세요"
          callback={(isError, isIncrease, newValue) => {
            handleProgress(11, isError, isIncrease);
            formData.current["userName"] = newValue
          }}
        />
        <Field.Message />
      </Field>

      {/**생년월일 */}
      <Field>
        <Field.Label left="대표자 생년월일" />
        <Field.Input
          type="text"
          placeholder="생년월일 8자리 입력 (19900101)"
          restrictor={(value: string) => /^[0-9]{0,8}$/.test(value)}
          validator={(value) => invalidBirth(value)}
          format={(value) => formatBirth(value)}
          charRemover={(value: string) => value.replace(/-/g, "")}
          errorMessage="생년월일은 YYYYMMDD 형식입니다."
          callback={(isError, isIncrease, newValue) => {
            handleProgress(11, isError, isIncrease);
            formData.current["birthDate"] = newValue
          }}
        />
        <Field.Message />
      </Field>

      {/**휴대폰 번호 */}
      <Field>
        <Field.Label left="대표자 휴대폰 번호" />
        <Field.Input
          type="text"
          placeholder="계약서 송부를 위해 꼭 본인정보 입력"
          restrictor={(value: string) => /^[0-9]{0,11}$/.test(value)}
          validator={(value) => invalidPhone(value)}
          format={(value) => formatPhone(value)}
          charRemover={(value: string) => value.replace(/-/g, "")}
          errorMessage="전화번호는 010-1234-5678 형식입니다."
          callback={(isError, isIncrease, newValue) => {
            handleProgress(10, isError, isIncrease);
            formData.current["phone"] = newValue
          }}
        />
        <Field.Message />
      </Field>

      {/**이메일 */}
      <Field>
        <Field.Label left={"대표자 이메일"} />
        <Field.Input
          type="email"
          placeholder="이메일 입력"
          validator={(value) => invalidEmail(value)}
          errorMessage="이메일 형식이 올바르지 않습니다."
          callback={(isError, isIncrease, newValue) => {
            handleProgress(11, isError, isIncrease);
            formData.current["email"] = newValue
          }}
        />
        <EmailSuggest />
        <Field.Message />
      </Field>
    </>
  );
}
