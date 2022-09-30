describe("Tests the login validations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should be in the document", () => {
    cy.get('[data-testid="login-form"]').should("exist");
    cy.get('[data-testid="login-form"]').should("have.length", 1);
  });

  it("should not loggin in wrong credentials and display error message", () => {
    cy.get('[data-testid="email"]').type("a@abv.bg");
    cy.get('[data-testid="password"]').type("123456");
    cy.get('[data-testid="submit-btn"]').click();

    cy.get('[data-testid="login__error"]').should(
      "contain",
      "Invalid email or password"
    );
  });

  it("should display error message on validation of the wrong type of email", () => {
    cy.get('[data-testid="email"]').type("a.bg");
    cy.get('[data-testid="password"]').type("123456789Mm");
    cy.get('[data-testid="submit-btn"]').click();

    cy.get('[data-testid="login__error"]').should(
      "contain",
      "Please enter a valid email"
    );
  });

  it("should display error message on empty password", () => {
    cy.get('[data-testid="email"]').type("georgijl@abv.bg");
    cy.get('[data-testid="submit-btn"]').click();

    cy.get('[data-testid="login__error"]').should(
      "contain",
      "password is required"
    );
  });

  it("should loggin in success with the correct credentials", () => {
    cy.get('[data-testid="email"]').type("oho@abv.bg");
    cy.get('[data-testid="password"]').type("123456789Mm");
    cy.get('[data-testid="submit-btn"]').click();

    cy.url().should("be.equal", "http://localhost:3000/");
  });
});
