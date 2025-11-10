import {
  BUSINESS_ID,
  PASSWORD,
} from "../../../src/features/sign-in/InputField/config/constants";

describe("로그인 화면", () => {
  it("사용자는 올바른 아이디로 로그인 시 blogs 페이지로 이동한다.", () => {
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
        // 잠시 대기
    cy.wait(1000); // 1
    cy.url().should("include", "http://localhost:3000/blogs");
  });

  it("사용자는 유효성 맞지 않는 아이디, 비밀번호로 로그인 시도시 토스트 바에 뜬다.", () => {
    // given - 로그인 페이지에 접근한다
    cy.visit("/sign-in");

    cy.get(`input[placeholder="${BUSINESS_ID.placeholder}"]`)
      .should("be.visible")
      .as("emailInput");

    cy.get(`input[placeholder="${PASSWORD.placeholder}"]`)
      .should("be.visible")
      .as("passwordInput");

    // when - 아이디와 비밀번호 입력한다 (invalid)
    cy.get("@emailInput").clear().type("1234567890");
    cy.get("@passwordInput").clear().type("invalidPassword");

    cy.get("@emailInput").invoke("val").should("eq", "1234567890");
    cy.get("@passwordInput").invoke("val").should("eq", "invalidPassword");

    // then - 로그인 버튼 클릭 후 토스트창이 뜬다.
    cy.get('[data-cy="login-button"]').should("be.enabled").click();
    cy.get('[data-cy="toast"]') 
      .should("be.visible")
      .and("contain.text", "데이터 형식이 올바르지 않습니다.");
  });

  it("사용자는 계정 정보가 없는 아이디로 로그인 시도시 토스트 바에 뜬다.", () => {
    // given - 로그인 페이지에 접근한다
    cy.visit("/sign-in");

    cy.get(`input[placeholder="${BUSINESS_ID.placeholder}"]`)
      .should("be.visible")
      .as("emailInput");

    cy.get(`input[placeholder="${PASSWORD.placeholder}"]`)
      .should("be.visible")
      .as("passwordInput");

    // when - 아이디와 비밀번호 입력한다 (invalid)
    cy.get("@emailInput").clear().type("1234567890");
    cy.get("@passwordInput").clear().type("wrongPassword");

    cy.get("@emailInput").invoke("val").should("eq", "1234567890");
    cy.get("@passwordInput").invoke("val").should("eq", "wrongPassword");

    // then - 로그인 버튼 클릭 후 토스트창이 뜬다.
    cy.get('[data-cy="login-button"]').should("be.enabled").click();
    cy.get('[data-cy="toast"]') 
      .should("be.visible")
      .and("contain.text", "계정 정보를 다시 확인해주세요.");
  });

  it("사용자는 회원가입 버튼을 누르면 페이지가 이동한다.", () => {
    // given - 로그인 페이지에 접근한다
    cy.visit("/sign-in");

    // when - 회원가입 버튼을 클릭한다.
    cy.get('[data-cy="goToSingUp-button"]').should("be.visible").click();
    cy.wait(2000); // 2

    // then - 회원가입 URL 변경된다.
    cy.url().should("include", "http://localhost:3000/sign-up");

  });
});
