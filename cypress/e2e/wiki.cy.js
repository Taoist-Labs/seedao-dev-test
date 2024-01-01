/// <reference types="Cypress" />

describe("city hall member page", () => {
  beforeEach(() => {
    cy.visit("/wiki");
  });
  it("sedao wiki data", () => {
    cy.intercept(
      "GET",
      "https://kind-emu-97.deno.dev/page/0bad66817c464f04962b797b47056241"
      // {
      //   fixture: "wiki.json",
      // }
    ).as("getWikiDetails");
    cy.visit("/wiki");
    cy.wait("@getWikiDetails").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(".notion-page-icon-hero > .notion-page-icon").should("be.visible");
    cy.get(".notion-title").should("be.visible");
  });
});
