/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { ProgressProvider } from "@/shared/ui";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { PhoneField } from "../ui/PhoneField";

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

describe("PhoneField 테스트", () => {
  test("input에 값을 입력하면 변경된다", () => {
    // given -> PhoneField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PhoneField />
      </Wrapper>
    );

    // when -> input에 010를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "010" } });

    // then -> 010가 반영된다.
    expect(input.value).toBe("010");
  });

  test("input에 자동으로 포맷팅 된다.", () => {
    // given -> PhoneField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PhoneField />
      </Wrapper>
    );

    // when -> input에 010829를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "010829" } });
    expect(input.value).toBe("010-829");

    // when -> input에 01082980를 입력한다.
    fireEvent.change(input, { target: { value: "01082980" } });
    expect(input.value).toBe("010-8298-0");

    // when -> input에 01082980199를 입력한다.
    fireEvent.change(input, { target: { value: "01082980199" } });
    expect(input.value).toBe("010-8298-0199");
  });

  test("blur 이전에는 에러 메시지가 표시되지 않는다", () => {
    // given -> PhoneField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PhoneField />
      </Wrapper>
    );

    // when -> input에 321를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "321" } });

    // then -> 에러 메시지가 표시되지 않는다.
    const error = screen.queryByText("전화번호는 010-1234-5678 형식입니다.");
    expect(error).toBeNull();
  });

  test("blur 이후 잘못된 입력에는 에러 메시지가 표시된다", async () => {
    // given -> PhoneField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PhoneField />
      </Wrapper>
    );

    // when -> input에 321를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "321" } });
    await act(async () => {
      fireEvent.blur(input);
    });

    // then -> 에러 메시지가 표시된다.
    const error = await screen.findByText(
      "전화번호는 010-1234-5678 형식입니다."
    );
    expect(error).toBeInTheDocument();
  });

  test("올바른 전화번호 입력 시 blur 후 에러 메시지가 표시되지 않는다", async () => {
    // given -> PhoneField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PhoneField />
      </Wrapper>
    );

    // when -> input에 01082980199를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "01082980199" } }); // 올바른 날짜
    await act(async () => {
      fireEvent.blur(input);
    });

    // then -> 에러 메시지가 표시되지 않는다.
    const error = screen.queryByText("전화번호는 010-1234-5678 형식입니다.");
    expect(error).toBeNull();
  });

  test("올바른 전화번호 입력 시 blur 후 프로그래스바 상태가 11 오른다.", async () => {
    // given -> PhoneField를 렌더링한다, 프로그래스 바 훅 사용한다.
      let progressValue = 0;
      const ProgressWatcher = () => {
        const { progress } = useProgress(); 
        progressValue = progress;
        return null;
      };
      const { container } = render(
        <Wrapper>
          <PhoneField />
          <ProgressWatcher />
        </Wrapper>
      );
      
      // when -> input에 01082980199를 입력한다.
      expect(progressValue).toBe(0);
      const input = container.querySelector("input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "01082980199" } }); // 올바른 날짜
      await act(async () => {
        fireEvent.blur(input);
      });
      
      // then -> 프로그래스가 10 오른다.
      expect(progressValue).toBe(10);
    });
});

describe("PhoneField 유효성 검사", () => {
  const invalidPhones = [
    { value: "010123", reason: "너무 짧은 번호" },
    { value: "0123456789", reason: "잘못된 앞자리 (01X 패턴 아님)" },
    { value: "010-12a4-5678", reason: "문자 포함" },
    { value: "010999999999", reason: "너무 긴 번호" },
    { value: "010 12 3456", reason: "공백 포함" },
  ];

  invalidPhones.forEach(({ value, reason }) => {
    test(`${reason} 입력 시 에러 메시지 표시`, async () => {
      const { container } = render(
        <Wrapper>
          <PhoneField />
        </Wrapper>
      );

      const input = container.querySelector("input") as HTMLInputElement;
      fireEvent.change(input, { target: { value } });
      await act(async () => {
        fireEvent.blur(input);
      });

      const error = await screen.findByText("전화번호는 010-1234-5678 형식입니다.");
      expect(error).toBeInTheDocument();
    });
  });
});
