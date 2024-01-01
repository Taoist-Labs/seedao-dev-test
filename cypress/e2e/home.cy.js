/// <reference types="Cypress" />

describe("header section", () => {
  beforeEach(() => {
    cy.visit("/home");
  });
  it("all the header sections should be visible", () => {
    cy.get(".sc-bXCLTC").should("be.visible");
  });
  it("should display home page seed holder", () => {
    cy.intercept(
      "GET",
      "https://test-spp-indexer.seedao.tech/insight/erc721/total_supply/0x30093266E34a816a53e302bE3e59a93B52792FD4"
    ).as("seedHolderRequest");
    // cy.wait("@seedHolderRequest");
    cy.get(":nth-child(1) > dd > .num").should("contain", "560");
  });
  it("should get data from the server", () => {
    cy.request(
      "GET",
      "https://test-spp-indexer.seedao.tech/insight/erc721/total_supply/0x30093266E34a816a53e302bE3e59a93B52792FD4"
    ).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
  it("should get govern node data from the server", () => {
    cy.request(
      "GET",
      "https://test-spp-indexer.seedao.tech/insight/erc1155/total_supply_of_tokenId/0x9d34D407D8586478b3e4c39BE633ED3D7be1c80C/4"
    ).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
  it("should get govern node data from the server", () => {
    cy.request(
      "GET",
      "https://test-spp-indexer.seedao.tech/insight/erc1155/total_supply_of_tokenId/0x9d34D407D8586478b3e4c39BE633ED3D7be1c80C/4"
    ).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
