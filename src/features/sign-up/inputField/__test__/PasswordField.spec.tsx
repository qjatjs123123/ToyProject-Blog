/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { PASSWORD } from "../config/constants";
import { ProgressProvider } from "@/shared/ui";
import { PasswordField } from "../ui/PasswordField";
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

describe("PasswordField 테스트", () => {
  test("input에 값을 입력하면 변경된다", () => {
    // given -> PasswordField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

    // when -> 비밀번호 입력창에 firstPassword를 입력한다. / 비밀번호 재입력창에 secondPassword를 입력한다.
    const first_input = container.querySelector(
      `input[placeholder="${PASSWORD.first_placeholder}"]`
    ) as HTMLInputElement;
    fireEvent.change(first_input, { target: { value: "firstPassword" } });
    const second_input = container.querySelector(
      `input[placeholder="${PASSWORD.second_placeholder}"]`
    ) as HTMLInputElement;
    fireEvent.change(second_input, { target: { value: "secondPassowrd" } });

    // then -> firstPassword / secondPassword가 반영된다.
    expect(first_input.value).toBe("firstPassword");
    expect(second_input.value).toBe("secondPassowrd");
  });

  test("blur 이전에는 에러 메시지가 표시되지 않는다", async () => {
    // given -> PasswordField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

    // when -> 비밀번호 입력창에 wrongPassword를 입력한다. / 비밀번호 재입력창에 wrongPassword를 입력한다.
    const first_input = screen.getByPlaceholderText(PASSWORD.first_placeholder);
    fireEvent.change(first_input, { target: { value: "wrongPassword" } });
    const second_input = screen.getByPlaceholderText(
      PASSWORD.second_placeholder
    );
    fireEvent.change(second_input, { target: { value: "wrongPassword" } });

    // then -> 에러 메시지가 발생하지 않는다.
    const error = screen.queryByText(
      "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요"
    );
    expect(error).toBeNull();
  });

  test("blur 이후 첫번째 비밀번호 유효성 실패하면 에러 메시지가 표시된다.", async () => {
    // given -> PasswordField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

    // when -> 비밀번호 입력창에 wrongPassword를 입력한다.
    const first_input = screen.getByPlaceholderText(PASSWORD.first_placeholder);
    fireEvent.change(first_input, { target: { value: "wrongPassword" } });
    await act(async () => {
      fireEvent.blur(first_input);
    });

    // then -> 비밀번호 에러 메시지가 발생한다.
    const error = await screen.findByText(
      "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요"
    );
    expect(error).toBeInTheDocument();
  });

  test("blur 이후 두번째 비밀번호 유효성 실패하면 에러 메시지가 표시된다.", async () => {
    // given -> PasswordField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

    // when -> 비밀번호 재입력창에 wrongPassword를 입력한다.
    const second_input = screen.getByPlaceholderText(
      PASSWORD.second_placeholder
    );
    fireEvent.change(second_input, { target: { value: "wrongPassword" } });
    await act(async () => {
      fireEvent.blur(second_input);
    });
    // then -> 비밀번호 에러 메시지가 발생한다.
    const error = await screen.findByText(
      "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요"
    );
    expect(error).toBeInTheDocument();
  });

  test("첫번째 패스워드 입력과 두번째 패스워드 입력이 다르면, 그에 맞는 에러 메시지가 표시된다.", async () => {
    // given -> PasswordField를 렌더링한다.
    const { container } = render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

    // when -> 비밀번호 입력창에 Password9!@를 입력한다. / 비밀번호 재입력창에 Password9!를 입력한다.
    const first_input = screen.getByPlaceholderText(PASSWORD.first_placeholder);
    fireEvent.change(first_input, { target: { value: "Password9!@" } });
    await act(async () => {
      fireEvent.blur(first_input);
    });

    const second_input = screen.getByPlaceholderText(
      PASSWORD.second_placeholder
    );
    fireEvent.change(second_input, { target: { value: "Password9!" } });
    await act(async () => {
      fireEvent.blur(second_input);
    });

    // then -> 비밀번호 에러 메시지가 발생한다.
    const error = await screen.findByText("비밀번호가 일치하지 않습니다.");
    expect(error).toBeInTheDocument();
  });

  test("성공적으로 첫번째, 두번째 패스워드 입력한 후, 성공 메시지가 표시되고, 프로그래스가 21 증가한다.", async () => {
    // given -> PasswordField를 렌더링한다.
    let progressValue = 0;
    const ProgressWatcher = () => {
      const { progress } = useProgress();
      progressValue = progress;
      return null;
    };
    const { container } = render(
      <Wrapper>
        <PasswordField />
        <ProgressWatcher />
      </Wrapper>
    );

    // when -> 비밀번호 입력창에 Password9!@를 입력한다. / 비밀번호 재입력창에 Password9!@를 입력한다.
    const first_input = screen.getByPlaceholderText(PASSWORD.first_placeholder);
    fireEvent.change(first_input, { target: { value: "Password9!@" } });
    await act(async () => {
      fireEvent.blur(first_input);
    });

    const second_input = screen.getByPlaceholderText(
      PASSWORD.second_placeholder
    );
    fireEvent.change(second_input, { target: { value: "Password9!@" } });
    await act(async () => {
      fireEvent.blur(second_input);
    });

    // then -> 성공메시지가 출력된다.
    const error = await screen.findByText("사용 가능한 비밀번호에요");
    expect(error).toBeInTheDocument();
    expect(progressValue).toBe(21);
  });
});

describe("PasswordField 유효성 검사", () => {
  const invalidPasswords = [
    "short", // 8자리 미만
    "NoNumber!", // 숫자 없음
    "NoSpecial123", // 특수문자 없음
    "toolongpassword123!", // 15자리 초과
  ];

  invalidPasswords.forEach((pw) => {
    test(`비밀번호 "${pw}" 입력 시 에러 메시지가 표시된다`, async () => {
      // given -> PasswordField를 렌더링한다.
      const { container } = render(
        <Wrapper>
          <PasswordField />
        </Wrapper>
      );

      // when -> 비밀번호 입력창에 에러 케이스 입력한다.
      const first_input = screen.getByPlaceholderText(
        PASSWORD.first_placeholder
      );
      fireEvent.change(first_input, { target: { value: pw } });
      await act(async () => {
        fireEvent.blur(first_input);
      });

      // then -> 비밀번호 에러 메시지가 발생한다.
      const error = await screen.findByText(
        "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요"
      );
      expect(error).toBeInTheDocument();
    });
  });
});
