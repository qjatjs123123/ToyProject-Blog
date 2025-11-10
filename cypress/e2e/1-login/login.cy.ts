import {
  BUSINESS_ID,
  PASSWORD,
} from "../../../src/features/sign-in/InputField/config/constants";

describe("로그인 화면", () => {
  it("사용자는 아이디와 비밀번호를 사용해서 로그인한다", () => {
    // given - 로그인 페이지에 접근한다
    cy.visit("/sign-in");

    cy.get(`input[placeholder="${BUSINESS_ID.placeholder}"]`)
      .should("be.visible")
      .as("emailInput");

    cy.get(`input[placeholder="${PASSWORD.placeholder}"]`)
      .should("be.visible")
      .as("passwordInput");

    // when - 아이디와 비밀번호 입력한다
    cy.get("@emailInput").clear().type("1234567890");
    cy.get("@passwordInput").clear().type("password!@");

    cy.get("@emailInput").invoke("val").should("eq", "1234567890");
    cy.get("@passwordInput").invoke("val").should("eq", "password!@");

    // then - 로그인 버튼 클릭 후 URL 변경 된다.
    cy.get('[data-cy="login-button"]').should("be.enabled").click();
    cy.url().should("include", "http://localhost:3000/blogs");
  });
});
