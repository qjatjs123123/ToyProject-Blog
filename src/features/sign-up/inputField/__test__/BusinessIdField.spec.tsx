/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { BusinessIdField } from "../ui/BusinessIdField";
import { BUSINESS_ID } from "../config/constants";
import { ProgressProvider } from "@/shared/ui";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { businessNumber: "" },
  });
  return (
    <ProgressProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </ProgressProvider>
  );
};

describe("BusinessIdField", () => {
  const errorMessage = BUSINESS_ID.validation_error;
  const successMessage = BUSINESS_ID.success_message;

  test("input 값 변경 시 반영된다", () => {
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(input.value).toBe("1234567890");
  });

  test("10자리 미만 입력 후 blur 시 에러 메시지가 표시된다", async () => {
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12345" } });
    fireEvent.blur(input);

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  test("10자리 올바르게 입력하면 에러 메시지가 표시되지 않는다", async () => {
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1234567890" } });
    fireEvent.blur(input);

    await waitFor(() => {
      const error = screen.queryByText(errorMessage);
      expect(error).toBeNull();
    });
  });

  test("버튼 클릭 시 mutate가 호출된다", async () => {
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1234567890" } });

    const button = screen.getByRole("button", { name: "인증하기" });
    fireEvent.click(button);

    expect(mockMutate).toHaveBeenCalledWith("1234567890");
  });

  test("isSuccess가 true면 readonly 처리되고 성공 메시지 표시된다", () => {
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={true} />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "인증성공" });

    expect(input).toHaveAttribute("readonly");
    expect(button).toBeDisabled();
    expect(screen.getByText(successMessage)).toBeInTheDocument();
  });

  test("에러 상태이거나 값이 비어있을 때 버튼은 비활성화된다", async () => {
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "인증하기" });

    // 비어있을 때 비활성화
    expect(button).toBeDisabled();

    // 에러일 때 비활성화
    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.blur(input);
    await screen.findByText(errorMessage);
    expect(button).toBeDisabled();
  });

  
  test("유효한 10자리 숫자 입력 시 버튼이 활성화된다", async () => {
    const mockMutate = jest.fn();
    const { container } = render(
      <Wrapper>
        <BusinessIdField mutate={mockMutate} isSuccess={false} />
      </Wrapper>
    );

    const input = container.querySelector("input") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "인증하기" });

    // 유효한 입력값
    fireEvent.change(input, { target: { value: "1234567890" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
