"use client";

import Button from "@/app/_components/Button";
import { Field, useFieldContext } from "@/app/_components/Field";
import { useVerifyBusinessNumber } from "../../hooks/useVerifyBusinessNumber";
import { RefObject, useState } from "react";
import { formatBusinessId } from "@/utils/format";
import { useAtom } from "jotai";
import { useProgress } from "../../_providers/ProgressProvider";
import { snackMsg } from "@/utils/atoms";
import { BusinessDataProps, FormValues } from "../../types/type";
import { BusinessIdMSG } from "@/utils/constants";

type AuthProps = {
  isAuth: boolean;
  setAuth: (a: boolean) => void;
  setBusinessData: (a: BusinessDataProps) => void;
  formData: RefObject<FormValues>
};

export default function BusinessIdField({
  isAuth,
  setAuth,
  setBusinessData,
  formData
}: AuthProps) {
  return (
    <Field>
      <Field.Label
        left="사업자등록번호 (ID)"
        right="사업자 번호가 기억나지 않아요"
        link="https://www.ftc.go.kr/www/selectBizCommList.do?key=253&token=71FB05C5-4829-80F4-C230-B0FB890B3E892EB62DA22EDEFB1080D78429A22093C1"
      />

      <FieldInput
        isAuth={isAuth}
        setAuth={setAuth}
        setBusinessData={setBusinessData}
        formData={formData}
      />
      <Field.Message />
    </Field>
  );
}

function FieldInput({ isAuth, setAuth, setBusinessData, formData }: AuthProps) {
  const { value, setValue, setStatus } = useFieldContext();
  const { setProgress, progress } = useProgress();
  const [, setSnackMsg] = useAtom(snackMsg);
  const { mutate } = useVerifyBusinessNumber();
  const disabled = isAuth || value.length < 10;

  const onClick = () => {
    mutate(value, {
      onSuccess: (data: BusinessDataProps) => {
        setValue(formatBusinessId(value));
        setStatus({isError : 0, message : BusinessIdMSG.API_SUCCESS})
        setBusinessData(data);
        setSnackMsg(BusinessIdMSG.API_SUCCESS);
        setProgress(progress + 21);
        setAuth(true);
        formData.current["companyName"] = data["company"];
        formData.current["businessNumberVerifyToken"] = data["businessNumberVerifyToken"];
        formData.current["userName"] = data["owner"];
        formData.current["businessNumber"] = value;
      },
      onError: (err) => {
        setStatus({isError : 1, message : BusinessIdMSG.API_ERROR})
        setSnackMsg(BusinessIdMSG.API_ERROR);
        setAuth(false);
      },
    });
  };

  return (
    <>
      <div className="flex gap-2 w-full">
        <Field.Input
          type="text"
          autoFocus={true}
          placeholder="-제외 10자리 입력"
          readonly={isAuth}
          restrictor={(value: string) => /^[0-9]{0,10}$/.test(value)}
          validator={(value: string) => value.length < 10}
          errorMessage={BusinessIdMSG.VALID_ERROR}
        />
        <Button
          onClick={onClick}
          type={"primary"}
          style={"fill"}
          disabled={disabled}
          className="!h-[48px] whitespace-nowrap"
        >
          {!isAuth ? "인증하기" : "인증성공"}
        </Button>
      </div>
    </>
  );
}
