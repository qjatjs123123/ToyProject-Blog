describe("블로그 페이지", () => {
  it("블로그 카드를 클릭하면 상세 페이지로 이동한다", () => {
    // given 블로그 리스트 페이지 방문
    cy.visit("/blogs");

    // then 특정 블로그 카드 클릭 (예: id가 1인 카드)
    cy.get('[data-cy="1"]')  // data-cy 값은 테스트용 id로 변경
      .should("be.visible")
      .click();
    cy.wait(10000);

    // then 상세 페이지 URL 확인
    cy.url().should("include", "http://localhost:3000/blogs/1");

  });
});