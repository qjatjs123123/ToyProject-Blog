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
import { BusinessIdField } from "../ui/BusinessIdField";
import { BUSINESS_ID } from "../config/constants";
import { ProgressProvider, Toast } from "@/shared/ui";
import { useVerifyBusinessNumber } from "../model/useVerifyBusinessNumber";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { postVerifyBusinessNumber } from "@/entities/sign-up/api/post-verify-business-number";

const queryClient = new QueryClient();
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { businessNumber: "" },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider>
        <FormProvider {...methods}>{children}</FormProvider>
        <Toast />
      </ProgressProvider>
    </QueryClientProvider>
  );
};

describe("BusinessIdField 테스트", () => {
  const errorMessage = BUSINESS_ID.validation_error;
  const successMessage = BUSINESS_ID.success_message;

  test("input 값 변경 시 반영된다", () => {
    // given -> BusinessIdField를 렌더링 한다.
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    // when -> 값을 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1234567890" } });

    // then -> 값이 반영된다.
    expect(input.value).toBe("1234567890");
  });

  test("10자리 미만 입력 후 blur 시 에러 메시지가 표시된다", async () => {
    // given -> BusinessIdField를 렌더링 한다.
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    // when -> 10자 미만을 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12345" } });
    fireEvent.blur(input);

    // then -> 유효성 에러 메시지가 뜬다.
    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  test("10자리 올바르게 입력하면 에러 메시지가 표시되지 않는다", async () => {
    // given -> BusinessIdField를 렌더링 한다.
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    // when -> 올바르게 입력하고 blur한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1234567890" } });
    fireEvent.blur(input);

    // then -> 유효성 에러 메시지가 뜨지 않는다.
    await waitFor(() => {
      const error = screen.queryByText(errorMessage);
      expect(error).toBeNull();
    });
  });

  test("isSuccess가 true면 readonly 처리되고 성공 메시지 표시된다", () => {
    // given && when -> BusinessIdField를 렌더링 한다. 그리고 isSuccess가 true이다.
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={true} />
      </Wrapper>
    );
    const input = container.querySelector("input") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "인증성공" });


    // then -> readonly되고, 유효성 성공 메시지가 뜬다.
    expect(input).toHaveAttribute("readonly");
    expect(button).toBeDisabled();
    expect(screen.getByText(successMessage)).toBeInTheDocument();
  });

  test("blur 된 이후 버튼은 비활성화되고 에러 메시지 뜬다", async () => {
    // given -> BusinessIdField를 렌더링 한다.
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    // when -> 유효성 만족하지 않는 값을 입력후 blur한다.
    const input = container.querySelector("input") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "인증하기" });
    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.blur(input);

    // then -> 유효성 에러 메시지 뜨고 버튼은 비활성화 된다.
    await screen.findByText(errorMessage);
    expect(button).toBeDisabled();
  });

  test("유효한 10자리 숫자 입력 시 버튼이 활성화된다", async () => {
    // given -> BusinessIdField를 렌더링 한다.
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );


    // when -> 유효한 입력값을 입력한다.
    const input = container.querySelector("input") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "인증하기" });
    fireEvent.change(input, { target: { value: "1234567890" } });
    fireEvent.blur(input);

    // then -> 버튼이 활성화 된다.
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});

jest.mock("@/entities/sign-up/api/post-verify-business-number");

describe("BusinessId 인증 테스트", () => {
  const errorMessage = BUSINESS_ID.validation_error;
  const successMessage = BUSINESS_ID.success_message;
  let progressValue = 0;

  const TestComponent = () => {
    const { mutate } = useVerifyBusinessNumber();
    const { progress } = useProgress();
    progressValue = progress;
    return <BusinessIdField mutate={mutate} isSuccess={false} />;
  };

  test("mutate 성공 시 progress 상태가 21 오르고, Toast에 성공메시지가 떠야 한다.", async () => {
    // given -> 비즈니스ID 인증 API가 성공하도록 mock
    (postVerifyBusinessNumber as jest.Mock).mockResolvedValue({
      company: "올라핀테크",
      owner: "김올라",
      businessNumberVerifyToken: "token_1234567890_abc123def",
    });

    const { container } = render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    );

    // when -> 10자 입력 후, 인증하기 버튼을 클릭한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(progressValue).toBe(0);

    const button = screen.getByRole("button", { name: "인증하기" });
    await act(async () => {
      fireEvent.click(button);
    });

    // then -> 상태가 21 오른다. 성공 토스트 메시지 보인다.
    const toastMessage = await screen.findByText(successMessage);
    expect(toastMessage).toBeInTheDocument();
    expect(progressValue).toBe(21);
  });

  test("mutate 400 관련 실패 시 progress 상태는 변함없고, Toast에 ErrorCode에 맞는 에러메시지가 떠야 한다.", async () => {
    // given -> 비즈니스ID 인증 API가 실패하도록 mock
    (postVerifyBusinessNumber as jest.Mock).mockRejectedValue({
      response: {
        data: {
          errorCode: "INVALID_REQUEST",
          errorMessage: "사업자등록번호가 올바르지 않습니다.",
        },
        status: 400,
      },
    });

    const { container } = render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    );

    // when -> 10자 입력 후, 인증하기 버튼을 클릭한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(progressValue).toBe(0);

    const button = screen.getByRole("button", { name: "인증하기" });
    await act(async () => {
      fireEvent.click(button);
    });

    // then -> 상태가 0 그대로다. 400 에러 관련 토스트 메시지 보인다.
    const toastMessage = await screen.findByText(
      "사업자등록번호가 올바르지 않습니다."
    );
    expect(toastMessage).toBeInTheDocument();
    expect(progressValue).toBe(0);
  });

  test("mutate 400 이 외 실패 시 progress 상태는 변함없고, Toast에 ErrorCode에 맞는 에러메시지가 떠야 한다.", async () => {
    // given -> 비즈니스ID 인증 API가 실패하도록 mock
    (postVerifyBusinessNumber as jest.Mock).mockRejectedValue({
      response: {
        data: {
          errorCode: "SERVER_ERROR",
          errorMessage: "서버 오류가 발생했습니다",
        },
        status: 500,
      },
    });

    const { container } = render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    );

    // when -> 10자 입력 후, 인증하기 버튼을 클릭한다.
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(progressValue).toBe(0);

    const button = screen.getByRole("button", { name: "인증하기" });
    await act(async () => {
      fireEvent.click(button);
    });

    // then -> 상태가 0 그대로다. 500 에러 관련 토스트 메시지 보인다.
    const toastMessage = await screen.findByText("서버 오류가 발생했습니다");
    expect(toastMessage).toBeInTheDocument();
    expect(progressValue).toBe(0);
  });
});
