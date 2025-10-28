/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { Provider as JotaiProvider } from "jotai"; // jotai provider
import { CheckProvider } from "../../saveBusinessID/model/CheckProvider";
import mockRouter from "next-router-mock";
import { Toast } from "../../../../shared/ui/Toast/ui/Toast";
import * as signInApi from "@/entities/sign-in";
import { LoginButton } from "../../login";
import { SaveIdCheckBox } from "../ui/CheckBoxId";

const queryClient = new QueryClient();

jest.mock("@/entities/sign-in", () => ({
  ...jest.requireActual("@/entities/sign-in"),
  postSignInForm: jest.fn(),
}));

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<signInApi.SignInFormProps>({
    defaultValues: {
      businessNumber: "1234567890",
      password: "password123",
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

describe("로그인 실패 후 아이디 저장 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
    (signInApi.postSignInForm as jest.Mock).mockRejectedValue({
      response: {
        data: {
          errorCode: "SERVER_ERROR",
          errorMessage: "서버 에러입니다.",
        },
        status: 500,
      },
    });
  });

  test("아이디 저장 체크 하더라도 로컬 스토리지 저장 함수는 호출되지 않는다.", async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    // given 서버에서는 로그인 API가 실패하도록 mock
    // given 로그인 버튼과 아이디 저장 체크박스를 그린다.
    render(
      <Wrapper>
        <LoginButton />
        <SaveIdCheckBox />
      </Wrapper>
    );

    // when 아이디 저장 체크되어 있는 상태에서 로그인을 한다.
    const loginButton = screen.getByText("로그인");
    fireEvent.click(loginButton);

    // then 로컬스토리지 함수는 호출되지 않는다.
    await waitFor(() => {
      expect(setItemSpy).not.toHaveBeenCalledWith("businessID", "1234567890");
    });
    setItemSpy.mockRestore();
  });

  test("아이디 저장 체크 해제 하더라도 로컬 스토리지 저장 함수는 호출되지 않는다.", async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    // given 서버에서는 로그인 API가 실패하도록 mock
    // given 로그인 버튼과 아이디 저장 체크박스를 그린다.
    render(
      <Wrapper>
        <LoginButton />
        <SaveIdCheckBox />
      </Wrapper>
    );

    // when 아이디 저장 체크를 해제한 후, 로그인 버튼을 클릭한다.
    const checkbox = screen.getByLabelText("아이디 저장");
    fireEvent.click(checkbox);

    const loginButton = screen.getByText("로그인");
    fireEvent.click(loginButton);

    // then 로컬스토리지 함수는 호출되지 않는다.
    await waitFor(() => {
      expect(setItemSpy).not.toHaveBeenCalledWith("businessID", "1234567890");
    });
  });
});


describe("로그인 성공 후 아이디 저장 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, "setItem");
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
  });

  test("아이디 저장 체크 후 localStorage에 아이디가 저장된다", async () => {
    // given 로그인 버튼과 아이디 저장 체크박스를 그린다.
    render(
      <Wrapper>
        <LoginButton />
        <SaveIdCheckBox />
      </Wrapper>
    );

    // when 아이디 저장 체크되어 있는 상태에서 로그인을 한다.
    const loginButton = screen.getByText("로그인");
    fireEvent.click(loginButton);

    // then 로컬스토리지 값은 1234567890이여야 한다.
    await waitFor(() => {
      expect(localStorage.getItem("businessID")).toBe("1234567890");
    });
  });

  test("아이디 저장 체크 해제 후 localStorage에 아이디는 삭제된다", async () => {
    // given 로그인 버튼과 아이디 저장 체크박스를 그린다.
    // given 서버에서는 로그인 API가 성공하도록 mock
    render(
      <Wrapper>
        <LoginButton />
        <SaveIdCheckBox />
      </Wrapper>
    );

    // when 아이디 저장 체크를 해제한 후, 로그인 버튼을 클릭한다.
    const checkbox = screen.getByLabelText("아이디 저장");
    fireEvent.click(checkbox);

    const loginButton = screen.getByText("로그인");
    fireEvent.click(loginButton);

    // then 로컬스토리지 값은 null 이여야 한다.
    await waitFor(() => {
      expect(localStorage.getItem("businessID")).toBe(null);
    });
  });
});