/// <reference types="Cypress" />

describe("header section", () => {
  it("all the header sections should be visible", () => {
    cy.visit("/home");
    cy.get(".sc-dAlyuH > img").should("be.visible");
    cy.get(".sc-dhKdcB > img").should("be.visible");
    cy.get(".react-select__control").should("be.visible");
    cy.get(".sc-jEACwC").should("be.visible");
  });
  it("all the header sections functionality works", () => {
    cy.visit("/home");
    cy.get(".sc-dhKdcB > img").click();
    cy.get(".sc-dhKdcB > img").click();
    cy.get(".react-select__control").click();
    cy.get("#react-select-2-option-0").should("be.visible");
    cy.get("#react-select-2-option-1").should("be.visible");
    cy.get("#react-select-2-option-0").click();
    // cy.get("#react-select-2-option-1").click();
    cy.get(".sc-jEACwC").click();
    // popup should be visible
    cy.get(".sc-imWYAI").should("be.visible");
    cy.get(".sc-eqUAAy").click();
    cy.get(".sc-iGgWBj").click();
    cy.get(".sc-iGgWBj").click();
    // check close popup
    cy.get(".icon-close > img").click();
  });
});
