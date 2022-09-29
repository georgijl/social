describe("go to the profile page workflow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.login();
  });

  it("handle profile dropdown to visit the profile page", () => {
    cy.get('[data-testid="account"]').click();
    cy.get('[data-testid="account__dropdown-anchor"]').click();
    cy.url().should("be.equal", "http://localhost:3000/profile/test");
  });
});
