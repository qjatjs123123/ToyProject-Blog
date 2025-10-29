/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { ProgressProvider } from "@/shared/ui";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { EmailFieldWithSuggest } from "../ui/EmailField/EmailFieldWithSuggest";

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

describe("EmailField 테스트", () => {
  test("input에 값을 입력하면 변경된다", () => {
    // given -> EmailField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <EmailFieldWithSuggest />
      </Wrapper>
    );

    // when -> input에 qjatjs123123@naver.com를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "qjatjs123123@naver.com" } });

    // then -> qjatjs123123@naver.com가 반영된다.
    expect(input.value).toBe("qjatjs123123@naver.com");
  });

  test("blur 이전에는 에러 메시지가 표시되지 않는다", () => {
    // given -> EmailField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <EmailFieldWithSuggest />
      </Wrapper>
    );

    // when -> input에 wrong를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "wrong" } }); // 유효하지 않음 (6자리)

    // then -> 에러가 표시되지 않는다.
    const error = screen.queryByText("이메일 형식이 올바르지 않습니다.");
    expect(error).toBeNull();
  });

  test("잘못된 이메일 입력 시 blur 후 에러 메시지가 표시된다", async () => {
    // given -> EmailField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <EmailFieldWithSuggest />
      </Wrapper>
    );

    // when -> input에 wrong를 입력한 후 blur처리 한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "wrong" } });
    await act(async () => {
      fireEvent.blur(input);
    });

    // then -> 에러가 표시된다.
    const error = await screen.findByText("이메일 형식이 올바르지 않습니다.");
    expect(error).toBeInTheDocument();
  });

  test("올바른 이메일 입력 시 blur 후 에러 메시지가 표시되지 않는다", async () => {
    // given -> EmailField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <EmailFieldWithSuggest />
      </Wrapper>
    );

    // when -> input에 qjatjs123123@naver.com를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "qjatjs123123@naver.com" } }); // 올바른 날짜
    await act(async () => {
      fireEvent.blur(input);
    });

    // then -> 에러가 표시되지 않는다.
    const error = screen.queryByText("이메일 형식이 올바르지 않습니다.");
    expect(error).toBeNull();
  });

  test("올바른 이메일 입력 시 blur 후 프로그래스바 상태가 11 오른다.", async () => {
    let progressValue = 0;
    const ProgressWatcher = () => {
      const { progress } = useProgress(); // 훅은 여기서 호출
      progressValue = progress;
      return null;
    };
    const { container } = render(
      <Wrapper>
        <EmailFieldWithSuggest />
        <ProgressWatcher />
      </Wrapper>
    );

    // when -> input에 qjatjs123123@naver.com를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "qjatjs123123@naver.com" } }); // 올바른 날짜
    await act(async () => {
      fireEvent.blur(input);
    });

    // then -> 프로그래스가 11 상승한다.
    expect(progressValue).toBe(11);
  });
});

describe("EmailField 유효성 검사", () => {
  const invalidEmails = [
    { value: "plainaddress", reason: "도메인(@) 누락" },
    { value: "missingatsign.com", reason: "@ 기호 누락" },
    { value: "@missingusername.com", reason: "아이디 누락" },
    { value: "user@.com", reason: "도메인명 누락" },
    { value: "user@domain", reason: "도메인 끝에 TLD 누락" },
    { value: "user@domain,com", reason: "도메인에 쉼표 포함" },
    { value: "user domain@com", reason: "공백 포함" },
  ];

  invalidEmails.forEach(({ value, reason }) => {
    test(`${reason} 입력 시 에러 메시지가 표시된다`, async () => {
      // given -> EmailField 렌더링
      const { container } = render(
        <Wrapper>
          <EmailFieldWithSuggest />
        </Wrapper>
      );

      // when -> 이메일 입력창에 value 입력 후 blur
      const input = container.querySelector("input") as HTMLInputElement;
      fireEvent.change(input, { target: { value } });
      await act(async () => {
        fireEvent.blur(input);
      });

      // then -> 에러 메시지가 표시된다.
      const error = await screen.findByText("이메일 형식이 올바르지 않습니다.");
      expect(error).toBeInTheDocument();
    });
  });
});

describe("EmailSuggest 테스트", () => {
  test("초기 렌더링 시 EmailSuggest 컴포넌트가 표시된다", async () => {
    // given -> EmailField 렌더링
    const { container } = render(
      <Wrapper>
        <EmailFieldWithSuggest />
      </Wrapper>
    );

    // when -> input에 qjatjs123123@n를 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "qjatjs123123@n" } }); // 올바른 날짜

    // when -> input에 EmailSuggest가 렌더링 된다.
    const list = await screen.findByTestId("email-suggest-list");
    expect(list).toBeInTheDocument();
  });

  test("EmailSuggest 제공된 데이터를 클릭하면 이메일 인풋에 반영된다.", async () => {
    // given -> EmailField 렌더링
    const { container } = render(
      <Wrapper>
        <EmailFieldWithSuggest />
      </Wrapper>
    );

    // when -> input에 qjatjs123123@n를 입력후 첫번쨰 제안(qjatjs123123@naver.com)을 클릭한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "qjatjs123123@n" } }); // 올바른 날짜
    const list = await screen.findByTestId("email-suggest-list");
    const firstSuggestion = list.querySelector("li");
    act(() => {
      fireEvent.mouseDown(firstSuggestion!);
    });

    // then -> qjatjs123123@naver.com가 반영된다.
    expect(input.value).toBe("qjatjs123123@naver.com");
  });
});
