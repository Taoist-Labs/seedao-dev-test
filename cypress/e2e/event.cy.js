/// <reference types="Cypress" />

describe("Event page", () => {
  beforeEach(() => {
    cy.visit("/event");
  });
  it("render event page and get event data", () => {
    cy.get(".sc-fhzFiK").should("exist");
    cy.intercept(
      "GET",
      "https://seeu-network-backend.vercel.app/api/event/list?pageSize=20&currentPage=1",
      {
        fixture: "events.json",
      }
    ).as("getEventLists");
    cy.visit("/event");
    cy.wait("@getEventLists");
    cy.get(".row > :nth-child(1)").click();
  });
  it("redirect to event details page get data", () => {
    cy.intercept(
      "GET",
      "https://seeu-network-backend.vercel.app/api/event/detail/27",
      {
        fixture: "eventDetails.json",
      }
    ).as("getEventListDetails");
    cy.visit("/event/view?id=27");
    cy.wait("@getEventListDetails");
    cy.get(
      '[style="flex: 1 1 0%; width: 580px; min-width: 580px;"] > img'
    ).should("be.visible");
    cy.get(".eventDtail").should("be.visible");
    cy.get(".sc-dkmUuB").click();
  });
  it.only("every event should be visible", () => {
    cy.get(".sc-fhzFiK > .row").each(() => {
      cy.get(".col-xl-3").should("be.visible");
      cy.get(".col-xl-3 > a > .itemBox > .items-img").should("be.visible");
      cy.get(".col-xl-3 > a > .itemBox > .item-content > h6").should(
        "be.visible"
      );
      cy.get(".col-xl-3 > a > .itemBox > .item-content > .item-status").should(
        "be.visible"
      );
      cy.get(
        ".col-xl-3 > a > .itemBox > .item-content > .item-tags > :nth-child(1)"
      ).should("be.visible");
      cy.get(
        ".col-xl-3 > a > .itemBox > .item-content > .item-tags > :nth-child(2)"
      ).should("be.visible");
    });
  });
});
