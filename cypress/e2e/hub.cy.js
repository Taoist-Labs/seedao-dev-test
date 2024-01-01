/// <reference types="Cypress" />

describe("hub page", () => {
  beforeEach(() => {
    cy.visit("/hub");
  });
  it("fetch hub data, data should be visible", () => {
    // get hub list
    cy.intercept(
      "GET",
      "https://test-api.seedao.tech/v1/public_data/notion/database/73d83a0a-258d-4ac5-afa5-7a997114755a?page=1&size=30",
      {
        fixture: "hub.json",
      }
    ).as("getHub");
    cy.visit("/hub");
    cy.wait("@getHub").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    // check the hub is render
    cy.get(".sc-bCrHVQ > .sc-gZnPbQ > .libox")
      .should("be.visible")
      .each(($hub, index) => {
        cy.wrap($hub).within(() => {
          // cy.log($hub);
          cy.get($hub).should("be.visible");
        });
      });

    // single hub details
    cy.intercept(
      "GET",
      "https://test-api.seedao.tech/v1/public_data/notion/page/f4c6dcc2-6a8f-4755-8d7c-c0dd69ef3712",
      {
        fixture: "hubDetails.json",
      }
    ).as("getHubDetails");

    cy.get(".sc-bCrHVQ > .sc-gZnPbQ > :nth-child(1)").click();

    cy.wait("@getHubDetails").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(".sc-jGvJud > img").should("be.visible");
    cy.get(".sc-dfauwV").should("be.visible");
    cy.get(".sc-bzBgWG > .sc-drFUgV").should("be.visible");
    cy.get(".sc-dkmUuB").click();
    // pagination
  });
  it.only("pagination test", () => {
    cy.get(":nth-child(3) > .page-link").click();
    cy.wait(2000);
    cy.get(":nth-child(2) > .page-link").click();
    cy.wait(2000);
    // cy.get(".pageR").click();
    cy.get(".form-control").should("be.visible").type("3");
    cy.get(".sc-cWSHoV > .btn").click();
  });
});
