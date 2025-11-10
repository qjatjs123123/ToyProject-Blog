describe("블로그 페이지", () => {
  it("블로그 카드를 클릭하면 상세 페이지로 이동한다", () => {
    // given 블로그 리스트 페이지 방문
    cy.visit("/blogs");

    // then 특정 블로그 카드 클릭 (예: id가 1인 카드)
    cy.get('[data-cy="1"]') // data-cy 값은 테스트용 id로 변경
      .should("be.visible")
      .click();
    cy.wait(10000);

    // then 상세 페이지 URL 확인
    cy.url().should("include", "http://localhost:3000/blogs/1");
  });

  it("사용자가 카테고리를 클릭하면 URL이 변경된다.", () => {
    // given 블로그 리스트 페이지 방문한다.
    cy.visit("/blogs");

    // then 트렌드 카테고리 클릭한다.
    cy.get('[data-cy="트렌드"]') // data-cy 값은 테스트용 id로 변경
      .should("be.visible")
      .click();
    cy.wait(2000);

    // then 쿼리 파라미터 URL 변경된다.
    cy.url().should("include", "http://localhost:3000/blogs?category=TREND");
  });

  it("사용자가 키워드로 블로그를 검색하면 URL이 변경된다.", () => {
    // given 블로그 리스트 페이지 방문한다.
    cy.visit("/blogs");

    // then 뉴스를 입력후 엔터를 클릭한다.
    cy.get('input[placeholder="입력해주세요"]') // 테스트용 data-cy로 변경 가능
      .should("be.visible")
      .clear()
      .type("news{enter}");

    // then 쿼리 파라미터 URL 변경된다.
    cy.url().should("include", "http://localhost:3000/blogs?term=news");
  });
});
