import { FormProvider, useForm } from "react-hook-form";
import * as signInApi from "@/entities/sign-in";
import { render, fireEvent, screen } from "@testing-library/react";
import { BusinessIdField } from "../ui/BusinessIdField";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<signInApi.SignInFormProps>({
    defaultValues: {
      businessNumber: "",
      password: "",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("아이디 인풋 필드 테스트", () => {
  test("input에 입력하면 변경된다", () => {
    const { container } = render(
      <Wrapper>
        <BusinessIdField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(input.value).toBe("1234567890");
  });

  test("blur 이벤트 이전, 에러메시지는 뜨지 않는다.", async () => {
    const { container } = render(
      <Wrapper>
        <BusinessIdField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "123456" } });
    const errorMessage = screen.queryByText("10자리 숫자를 입력해주세요.");
    expect(errorMessage).toBeNull();
  });

  test("blur 이벤트 이후, 에러메시지는 떠야 한다.", async () => {
    const { container } = render(
      <Wrapper>
        <BusinessIdField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "123456" } });
    fireEvent.blur(input);

    const errorMessage = await screen.findByText("10자리 숫자를 입력해주세요.");
    expect(errorMessage).toBeInTheDocument();   
  });

  test("blur 이벤트 이후, 올바르게 입력한 경우 에러메시지는 뜨지 않는다.", async () => {
    const { container } = render(
      <Wrapper>
        <BusinessIdField />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "0123456789" } });
    fireEvent.blur(input);

    const errorMessage = screen.queryByText("10자리 숫자를 입력해주세요.");
    expect(errorMessage).toBeNull();
  });
});
