import { FormProvider, useForm } from "react-hook-form";
import * as signInApi from "@/entities/sign-in";
import { render, fireEvent, screen } from "@testing-library/react";
import { PasswordField } from "../ui/PasswordField";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<signInApi.SignInFormProps>({
    defaultValues: {
      businessNumber: "",
      password: "",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("PasswordField blur 검사", () => {
  test("input에 입력하면 변경된다", () => {
    const { container } = render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "password!@" } });
    expect(input.value).toBe("password!@");
  });

  test("blur 이벤트 이전, 에러메시지는 뜨지 않는다.", async () => {
    const { container } = render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "password!@" } });
    const errorMessage = screen.queryByText("8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요");
    expect(errorMessage).toBeNull();
  });

  test("blur 이벤트 이후, 에러메시지는 떠야 한다.", async () => {
    const { container } = render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "wrongPassword" } });
    fireEvent.blur(input);

    const errorMessage = await screen.findByText("8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요");
    expect(errorMessage).toBeInTheDocument();   
  });

  test("blur 이벤트 이후, 올바르게 입력한 경우 에러메시지는 뜨지 않는다.", async () => {
    const { container } = render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "password!@" } });
    fireEvent.blur(input);

    const errorMessage = screen.queryByText("8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요");
    expect(errorMessage).toBeNull();
  });
});




describe("PasswordField 유효성 검사", () => {
  const errorMessage = "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요";

  const renderField = () =>
    render(
      <Wrapper>
        <PasswordField />
      </Wrapper>
    );

  test("8자리 미만일 경우 에러 메시지 표시", async () => {
    const { container } = renderField();
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Ab1!" } }); // 4자리
    fireEvent.blur(input);

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  test("영문이 없으면 에러 메시지 표시", async () => {
    const { container } = renderField();
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "12345678!" } }); // 영문 없음
    fireEvent.blur(input);

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  test("숫자가 없으면 에러 메시지 표시", async () => {
    const { container } = renderField();
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Abcdefgh!" } }); // 숫자 없음
    fireEvent.blur(input);

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  test("특수문자가 없으면 에러 메시지 표시", async () => {
    const { container } = renderField();
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Abcdefg1" } }); // 특수문자 없음
    fireEvent.blur(input);

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  test("조건 충족 시 에러 메시지 없음", async () => {
    const { container } = renderField();
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Abc123!@" } });
    fireEvent.blur(input);

    const error = screen.queryByText(errorMessage);
    expect(error).toBeNull();
  });
});
