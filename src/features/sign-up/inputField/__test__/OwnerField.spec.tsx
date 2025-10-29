/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { OwnerField } from "../ui/OwnerField";
import { OWNER } from "../config/constants";
import { ProgressProvider } from "@/shared/ui";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { birthDate: "" },
    mode: "onChange",
  });

  return (
    <ProgressProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </ProgressProvider>
  );
};

describe("OwnerField 테스트", () => {
  const errorMessage = OWNER.error_message;

  test("기본 owner 값이 표시된다", () => {
    // given -> 홍길동으로 props로 전달한다.
    const ownerValue = "홍길동";
    const { container } = render(
      <Wrapper>
        <OwnerField owner={ownerValue} />
      </Wrapper>
    );

    // when, then -> input 기본값으로 홍길동이 된다.
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe(ownerValue);
  });

  test("input에 값을 입력하면 변경된다", () => {
    // given -> OwnerField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <OwnerField owner={""} />
      </Wrapper>
    );

    // when -> input에 199를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "199" } });

    // then -> 199가 반영된다.
    expect(input.value).toBe("199");
  });

  test("공백 입력 후 에러 메시지가 표시된다", async () => {
    // given -> OwnerField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <OwnerField owner={"홍길동"} />
      </Wrapper>
    );

    // when -> input에 공백을 입력한다.(에러)
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "" } });

    // then -> 에러가 발생한다.
    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  test("유효성 검사가 통과하면 프로그래스가 11 증가한다.", async () => {
    // given -> OwnerField를 렌더링한다.
    let progressValue = 0;
    const ProgressWatcher = () => {
      const { progress } = useProgress();
      progressValue = progress;
      return null;
    };
    const { container } = render(
      <Wrapper>
        <OwnerField owner={""} />
        <ProgressWatcher />
      </Wrapper>
    );

    // when -> input에 홍범선을 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "홍범선" } });

    // then -> 프로그래스가 11 올라간다.
    expect(progressValue).toBe(11);
  });
});
