"use client";
import { Control, Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Button from "../_components/Button";
import InputField from "../_components/InputField";
import { pwRegex } from "@/utils/constants";
import Checkbox from "../_components/CheckBox";
import { useRouter } from "next/navigation";
import { useLogin } from "../sign-in/hooks/useLogin";
import { useAtom } from "jotai";
import { snackMsg } from "@/utils/atoms";
import { LoginRequestProps } from "../sign-up/types/type";

export default function SignIn() {
  const router = useRouter();
  const { mutate } = useLogin();
  const [checked, setChecked] = useState(true);
  const [, setSnackMsg] = useAtom(snackMsg);

  const { control, handleSubmit, setError, reset } = useForm<LoginRequestProps>(
    {
      defaultValues: { businessNumber: "", password: "" },
      mode: "onChange",
    }
  );

  useEffect(() => {
    const savedId = localStorage.getItem("userID");
    if (savedId) {
      reset({ businessNumber: savedId, password: "" });
    }
  }, [reset]);

  const onSubmit = (data: LoginRequestProps) => {
    mutate({
      data,
      setError,
      checked,
      setSnackMsg,
      callback: () => router.push("/"),
    });
  };

  return (
    <article className="mx-auto  max-w-[550px] h-full max-md:w-full px-[0.8rem] ">
      <div className="pt-[80px] max-md:w-full pb-[2.5rem] relative mx-auto max-w-[500px] px-[1rem]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputField
            name="businessNumber"
            control={control}
            label="사업자등록번호(ID로 사용돼요)"
            placeholder="-제외 10자리 입력"
            rules={{
              pattern: {
                value: /^[0-9]{10}$/,
                message: "10자리 숫자를 입력해주세요.",
              },
            }}
            restrictor={(v) => /^[0-9]{0,10}$/.test(v)}
          />

          <InputField
            name="password"
            control={control}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            rules={{
              pattern: {
                value: pwRegex,
                message:
                  "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요",
              },
            }}
          />

          <Checkbox
            id={"아이디 저장"}
            index={0}
            type={"normal"}
            content="아이디 저장"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />

          <Button
            type="primary"
            style="fill"
            className="w-full mt-[30px]"
            onClick={handleSubmit(onSubmit)}
          >
            제출
          </Button>
        </form>
      </div>
    </article>
  );
}
