describe("SinUpページ", () => {
  it("メールアドレスが不正", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get('[type="email"]').type("test");
    cy.get('[type="password"]').type("test");
    cy.get(".emailError").should("be.visible");
  });

  it("メールアドレスが正常", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get('[type="email"]').type("test@gmail.com");
    cy.get('[type="password"]').type("test");
    cy.get(".emailError").should("not.exist");
  });
});
