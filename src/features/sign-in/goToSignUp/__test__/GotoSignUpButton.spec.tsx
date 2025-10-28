/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { GoToSignUpPageButton } from '../ui/GotoSignUpButton';

// useNavigationHistory 모듈을 mock
jest.mock("@/shared/model/useNavigationHistory", () => ({
  useNavigationHistory: () => ({
    goTo: jest.fn(), // spy/mock
  }),
}));

describe("회원가입 버튼 테스트", () => {
  beforeEach(() => {

  })
  test("버튼 클릭 시 /sign-up으로 이동하도록 goTo가 호출된다", () => {
    // given GoToSignUpPageButton를 그린다.
    const goToMock = jest.fn();
    jest.spyOn(require("@/shared/model/useNavigationHistory"), "useNavigationHistory").mockReturnValue({
      goTo: goToMock,
    });
    render(<GoToSignUpPageButton />);

    // when 회원가입 버튼을 누른다.
    const button = screen.getByText("회원가입");
    fireEvent.click(button);

    // then /sign-up로 가는 goTo함수가 한번 호출된다.
    expect(goToMock).toHaveBeenCalledWith("/sign-up");
    expect(goToMock).toHaveBeenCalledTimes(1);
  });
});
