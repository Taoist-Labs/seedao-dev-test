/// <reference types="Cypress" />

describe("apps page", () => {
  beforeEach(() => {
    cy.visit("/apps");
  });
  it.only("render app card ", () => {
    cy.get(".sc-erUUZj").should("exist");
    cy.get(".sc-erUUZj > :nth-child(1)").should("exist");
    cy.get(".sc-erUUZj > :nth-child(2)").should("exist");
    cy.get(".sc-erUUZj > :nth-child(3)").should("exist");
    cy.get(".sc-erUUZj > :nth-child(4)").should("exist");
    cy.get(".sc-erUUZj > :nth-child(5)").should("exist");
    cy.get(".sc-erUUZj > :nth-child(6)").should("exist");
    cy.get(".sc-erUUZj > :nth-child(7)").should("exist");
    cy.get(".sc-erUUZj > :nth-child(8)").should("exist");
  });
  it("click the item and redirect", () => {
    cy.get(".sc-erUUZj > :nth-child(1)").click();
    cy.get(".sc-erUUZj > :nth-child(2)").click();
    cy.get(".sc-erUUZj > :nth-child(3)").click();
    cy.get(".sc-erUUZj > :nth-child(4)").click();
    cy.get(".sc-erUUZj > :nth-child(5)").click();
    cy.get(".sc-erUUZj > :nth-child(6)").click();
    cy.get(".sc-erUUZj > :nth-child(7)").click();
    cy.get(".sc-erUUZj > :nth-child(8)").click();
  });
});
