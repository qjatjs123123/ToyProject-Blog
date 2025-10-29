/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { BirthField } from "../ui/BirthField";
import { BIRTH } from "../config/constants";
import { ProgressProvider } from "@/shared/ui";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { birthDate: "" },
  });

  return (
    <ProgressProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </ProgressProvider>
  );
};

describe("BirthField 테스트", () => {
  const errorMessage = BIRTH.error_message;

  test("input에 값을 입력하면 변경된다", () => {
    const { container } = render(
      <Wrapper>
        <BirthField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "199" } });

    expect(input.value).toBe("199");
  });

  test("input에 자동으로 포맷팅 된다.", () => {
    const { container } = render(
      <Wrapper>
        <BirthField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "199001" } });
    expect(input.value).toBe("1990-01");

    fireEvent.change(input, { target: { value: "19900101" } });
    expect(input.value).toBe("1990-01-01");
  });

  test("blur 이전에는 에러 메시지가 표시되지 않는다", () => {
    const { container } = render(
      <Wrapper>
        <BirthField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "199901" } }); // 유효하지 않음 (6자리)

    const error = screen.queryByText(errorMessage);
    expect(error).toBeNull();
  });

  test("잘못된 생년월일 입력 시 blur 후 에러 메시지가 표시된다", async () => {
    const { container } = render(
      <Wrapper>
        <BirthField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "199901" } });
    await act(async () => {
      fireEvent.blur(input);
    });

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  test("올바른 생년월일 입력 시 blur 후 에러 메시지가 표시되지 않는다", async () => {
    const { container } = render(
      <Wrapper>
        <BirthField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "19990101" } }); // 올바른 날짜
    await act(async () => {
      fireEvent.blur(input);
    });

    await waitFor(() => {
      const error = screen.queryByText(errorMessage);
      expect(error).toBeNull();
    });
  });

  test("올바른 생년월일 입력 시 blur 후 프로그래스바 상태가 11 오른다.", async () => {
    let progressValue = 0;
    const ProgressWatcher = () => {
      const { progress } = useProgress(); // 훅은 여기서 호출
      progressValue = progress;
      return null;
    };
    const { container } = render(
      <Wrapper>
        <BirthField />
        <ProgressWatcher />
      </Wrapper>
    );

    expect(progressValue).toBe(0);
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "19990101" } }); // 올바른 날짜
    await act(async () => {
      fireEvent.blur(input);
    });

    await waitFor(() => {
      expect(progressValue).toBe(11);
    });
  });
});

describe("BirthField 유효성 검사", () => {
  const errorMessage = BIRTH.error_message;

  const invalidDates = [
    { value: "20230230", reason: "존재하지 않는 날짜 (2월 30일)" },
    { value: "20231301", reason: "잘못된 월 (13월)" },
    { value: "20230132", reason: "잘못된 일 (32일)" },
    { value: "1999abcd", reason: "문자 포함" },
    { value: "199901", reason: "8자리 미만" },
  ];

  invalidDates.forEach(({ value, reason }) => {
    test(`${reason} 입력 시 에러 메시지 표시`, async () => {
      const { container } = render(
        <Wrapper>
          <BirthField />
        </Wrapper>
      );

      const input = container.querySelector("input") as HTMLInputElement;
      fireEvent.change(input, { target: { value } });
      await act(async () => {
        fireEvent.blur(input);
      });

      const error = await screen.findByText(errorMessage);
      expect(error).toBeInTheDocument();
    });
  });

  test("윤년 2월 29일(2000-02-29)은 정상 처리", async () => {
    const { container } = render(
      <Wrapper>
        <BirthField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "20000229" } }); // 윤년
    await act(async () => {
      fireEvent.blur(input);
    });

    await waitFor(() => {
      const error = screen.queryByText(errorMessage);
      expect(error).toBeNull();
    });
  });
});
