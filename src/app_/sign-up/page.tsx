"use client";

import Text from "../_components/Text";
import ProgressBar from "../_components/ProgressBar";
import PolicyCheckBoxForm from "./_components/PolicyForm/PolicyCheckBoxForm";
import { useState } from "react";
import SignupForm from "./_components/SignupForm/SignupForm";
import ProgressStatusText from "./_components/SignupForm/ProgressStatusText";

export default function SignUp() {
  const [step, setStep] = useState(0);
  return (
    <>
      <header>
        <h1>
          <Text type="title" size="1" className="block">
            지금 회원가입하면
          </Text>
          <Text type="title" size="1" weight="bold" className="block">
            수수료 지원금 3만원 지급!
          </Text>
        </h1>
      </header>

      <div>
        <div className="flex items-center justify-between ">
          <Text type="body" size="3" className="text-[var(--color-primary)]">
            최대 1,250만원까지 무료 선정산이 가능해요.
          </Text>
          <ProgressStatusText />
        </div>
        <ProgressBar />
      </div>

      {step === 0 && <PolicyCheckBoxForm setStep={setStep} />}
      {step === 1 && <SignupForm />}
    </>
  );
}
