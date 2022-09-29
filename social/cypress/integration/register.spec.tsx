describe("Test the register validations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("test an empty username field", () => {
    cy.get('[data-testid="userName"]').click();
    cy.get("body").click(0, 0);

    cy.get('[data-testid="login__error-username"]').should(
      "contain",
      "username is required"
    );
  });

  it("test an empty first name field", () => {
    cy.get('[data-testid="firstName"]').click();
    cy.get("body").click(0, 0);

    cy.get('[data-testid="login__error-firstname"]').should(
      "contain",
      "first name is required"
    );
  });

  it("test an empty last name field", () => {
    cy.get('[data-testid="lastName"]').click();
    cy.get("body").click(0, 0);

    cy.get('[data-testid="login__error-lastname"]').should(
      "contain",
      "last name is required"
    );
  });

  it("test an empty email field", () => {
    cy.get('[data-testid="email"]').click();
    cy.get("body").click(0, 0);

    cy.get('[data-testid="login__error-email"]').should(
      "contain",
      "email is a required field"
    );
  });

  it("test an empty pasword field", () => {
    cy.get('[data-testid="password"]').click();
    cy.get("body").click(0, 0);

    cy.get('[data-testid="login__error-password"]').should(
      "contain",
      "password is a required field"
    );
  });

  it("test of regiter workflow already exist username", () => {
    cy.get('[data-testid="userName"]').type("georgijl");
    cy.get('[data-testid="firstName"]').type("Georgi");
    cy.get('[data-testid="lastName"]').type("Ivanov");
    cy.get('[data-testid="email"]').type("xaxasdasfasg@abv.bg");
    cy.get('[data-testid="password"]').type("95042591002020Mm");

    cy.get('[data-testid="submit-btn"]').click();

    cy.get('[data-testid="login__error-validation"]').should(
      "contain",
      `This username georgijl is already taken`
    );
  });

  it("test of regiter workflow with correct credentials", () => {
    cy.get('[data-testid="userName"]').type("sss");
    cy.get('[data-testid="firstName"]').type("Georgi");
    cy.get('[data-testid="lastName"]').type("Ivanov");
    cy.get('[data-testid="email"]').type("xaxa@abv.bg");
    cy.get('[data-testid="password"]').type("95042591002020Mm");

    cy.get('[data-testid="submit-btn"]').click();
    cy.url().should("be.equal", "http://localhost:3000/");
  });
});
