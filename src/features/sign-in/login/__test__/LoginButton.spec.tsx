/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { Provider as JotaiProvider } from "jotai"; // jotai provider
import { CheckProvider } from "../../saveBusinessID/model/CheckProvider";
import { LoginButton } from "../ui/LoginButton";
import mockRouter from "next-router-mock";
import { Toast } from "../../../../shared/ui/Toast/ui/Toast";
import * as signInApi from "@/entities/sign-in";

const queryClient = new QueryClient();

jest.mock("@/entities/sign-in", () => ({
  ...jest.requireActual("@/entities/sign-in"),
  postSignInForm: jest.fn(),
}));

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<signInApi.SignInFormProps>({
    defaultValues: {
      businessNumber: "",
      password: "",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <CheckProvider>
          <FormProvider {...methods}>
            {children}
            <Toast /> {/* 실제 Toast UI 렌더링 */}
          </FormProvider>
        </CheckProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};

describe("로그인 테스트", () => {
  beforeAll(() => {
    // 공통 mock 설정
    mockRouter.push("/login");
  });

  test("로그인 폼 데이터 형식이 올바르지 않을 경우, 토스트바에 해당 ErrorMessage가 떠야 한다", async () => {
    // given -> 로그인 API가 실패하도록 mock
    (signInApi.postSignInForm as jest.Mock).mockRejectedValue({
      response: {
        data: {
          errorCode: "INVALID_REQUEST",
          errorMessage: "데이터 형식이 올바르지 않습니다.",
        },
        status: 400
      },
    });

    // when -> 로그인 버튼 그리고 버튼 클릭
    render(
      <Wrapper>
        <LoginButton />
      </Wrapper>
    );
    const button = screen.getByText("로그인");
    fireEvent.click(button);

    // then: toast 메시지가 화면에 표시되는지 확인
    const toastMessage = await screen.findByText(
      "데이터 형식이 올바르지 않습니다."
    );
    expect(toastMessage).toBeInTheDocument();
  });

  test("로그인 시 계정 정보가 없을 경우, 토스트바에 해당 ErrorMessage가 떠야 한다", async () => {
    // given -> 로그인 API가 실패하도록 mock
    (signInApi.postSignInForm as jest.Mock).mockRejectedValue({
      response: {
        data: {
          errorCode: "NOT_FOUND",
          errorMessage: "계정 정보를 다시 확인해주세요.",
        },
        status: 401
      },
    });

    // when -> 로그인 버튼 그리고 버튼 클릭
    render(
      <Wrapper>
        <LoginButton />
      </Wrapper>
    );
    const button = screen.getByText("로그인");
    fireEvent.click(button);

    // then: toast 메시지가 화면에 표시되는지 확인
    const toastMessage = await screen.findByText(
      "계정 정보를 다시 확인해주세요."
    );
    expect(toastMessage).toBeInTheDocument();
  });

  test("그 외 에러일 경우, 토스트바에 해당 ErrorMessage가 떠야 한다", async () => {
    // given -> 로그인 API가 실패하도록 mock
    (signInApi.postSignInForm as jest.Mock).mockRejectedValue({
      response: {
        data: {
          errorCode: "SERVER_ERROR",
          errorMessage: "서버 에러입니다.",
        },
        status: 500
      },
    });

    // when -> 로그인 버튼 그리고 버튼 클릭
    render(
      <Wrapper>
        <LoginButton />
      </Wrapper>
    );
    const button = screen.getByText("로그인");
    fireEvent.click(button);

    // then: toast 메시지가 화면에 표시되는지 확인
    const toastMessage = await screen.findByText("로그인 실패했어요");
    expect(toastMessage).toBeInTheDocument();
  });

  test("로그인 시 성공 시, 토스트바에 성공 메시지가 떠야 한다", async () => {
    // given -> 로그인 API가 성공하도록 mock
    (signInApi.postSignInForm as jest.Mock).mockResolvedValue({
      response: {
        data: {
          accessToken: "mock_access_token_123",
          refreshToken: "mock_refresh_token_123",
          accessTokenExpiresIn: 30, // 30초
          refreshTokenExpiresIn: 300,
        },
      },
    });

    // when -> 로그인 버튼 그리고 버튼 클릭
    render(
      <Wrapper>
        <LoginButton />
      </Wrapper>
    );
    const button = screen.getByText("로그인");
    fireEvent.click(button);

    // then: toast 메시지가 화면에 표시되는지 확인
    const toastMessage = await screen.findByText("로그인 성공했어요");
    expect(toastMessage).toBeInTheDocument();
  });
});
