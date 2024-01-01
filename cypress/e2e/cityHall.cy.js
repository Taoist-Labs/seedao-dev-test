/// <reference types="Cypress" />

describe("city hall member page", () => {
  beforeEach(() => {
    cy.visit("/city-hall/members");
  });
  it("Governance rules list", () => {
    cy.get(":nth-child(1) > a > .boxAll").should("be.visible");
    cy.get(":nth-child(2) > a > .boxAll").should("be.visible");
    cy.get(":nth-child(3) > a > .boxAll").should("be.visible");
  });
  it("city hall information page", () => {
    cy.intercept("GET", "https://test-api.seedao.tech/v1/cityhall/info", {
      fixture: "cityHallInfo.json",
    }).as("getCityHallInfo");
    cy.visit("/city-hall/members");
    cy.wait("@getCityHallInfo").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("fetch city hall members and members should be visible", () => {
    cy.get(".selected").should("have.text", "S5 City Hall");
    cy.get(".sc-iowXnY > .sc-lmUcrn").should("have.text", "Governance Rules");
    cy.get(":nth-child(2) > .sc-lmUcrn").should(
      "have.text",
      "Governance Group"
    );
    // get member list using user id
    cy.intercept(
      "GET",
      "https://test-api.seedao.tech/v1/user/users?wallets=0x183f09c3ce99c02118c570e03808476b22d63191&wallets=0x45bb513eb653c7321878fe9642c651bd7564d113&wallets=0x4d4b78d37090ed3e1eae6779ba2c3d6728052915&wallets=0x82944b68bb92fa11764041aa61204b5fdc85f429&wallets=0x9d6b1a15d476bfbbdf4274ef6b405086cd7258f9&wallets=0x8fe174b2fe54d2689382cfef5500552ffb5c3805&wallets=0xf4f86bd6308ed8c37866cb9fc8891fb40f3b63e9&wallets=0x4c2201441fd71ebaccdfa0160fcf9853de5d1546",
      {
        fixture: "cityHallMember.json",
      }
    ).as("getCityHallMember");
    cy.visit("/city-hall/members");
    cy.wait("@getCityHallInfo").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    // check all member should be visible
    cy.get(".sc-gplwa-d > .row > .sc-bvgPty")
      .should("be.visible")
      .each(($cityHallMember, index) => {
        cy.wrap($cityHallMember).within(() => {
          // cy.log($cityHallMember);
          cy.get($cityHallMember).should("be.visible");
        });
      });
  });
  it.only("city hall member details popup", () => {
    // cy.get(
    //   ':nth-child(2) > .row > :nth-child(1) > .boxAll > .fst > :nth-child(2) > [style="display: flex; gap: 6px; margin-bottom: 8px;"] > :nth-child(2) > .sc-jnOGJG > svg'
    // ).click();
    // cy.wait(3000);
    cy.get(":nth-child(2) > .row > :nth-child(1) > .boxAll").click();
    cy.get(".sc-fPrdXf > img").should("be.visible");
    cy.get(".userName").should("exist");
    cy.get(".sc-jBeBSR").should("exist");
    cy.get(".sc-ezreuY > div").should("be.visible");
    cy.get(".sc-boZgaH > :nth-child(1)").should("be.visible");
    // cy.get(":nth-child(1) > .iconLft > a > img").should("be.visible").click();
    cy.get(":nth-child(3) > .sc-gtJxfw > .sc-izQBue").should("be.visible");
    cy.get(".sc-emIrwa > img").should("be.visible");
    cy.get(".sc-emIrwa > span").should("be.visible");
    cy.get(".sc-rPWID > .sc-gtJxfw > .sc-izQBue").should("be.visible");
    cy.get(".imgBox > img").should("be.visible");
    cy.get(":nth-child(1) > .name").should("be.visible");
    cy.get(".btn-close-modal").should("be.visible").click();
  });
});
