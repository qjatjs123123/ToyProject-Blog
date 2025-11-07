import {
  BUSINESS_ID,
  PASSWORD,
} from "../../../src/features/sign-in/InputField/config/constants";

describe("로그인 화면", () => {
  it("사용자는 아이디와 비밀번호를 사용해서 로그인한다", () => {
    // given - 로그인 페이지에 접근한다
    cy.visit("/sign-in");
    cy.get(`input[placeholder="${BUSINESS_ID.placeholder}"]`).as("emailInput");
    cy.get(`input[placeholder="${PASSWORD.placeholder}"]`).as("passwordInput");

    // when - 아아디와 비밀번호를 입력하고 로그인 버튼을 클릭한다
    cy.get("@emailInput").type("1234567890");
    cy.get("@passwordInput").type("password!@");

    cy.get("@emailInput").invoke("val").should("eq", "1234567890");

    // then - 로그인에 성공하고 메인화면으로 이동한다
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', 'http://localhost:3000')
  });
});
