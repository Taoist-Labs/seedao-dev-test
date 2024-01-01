/// <reference types="Cypress" />

describe("city hall member page", () => {
  beforeEach(() => {
    cy.visit("/online-event");
  });
  it("all event data should be visible", () => {
    cy.intercept(
      "GET",
      "https://content.googleapis.com/calendar/v3/calendars/seedao.tech%40gmail.com/events?maxResults=1000&key=AIzaSyDyZO-Xhx71aD0Rpv8EcwY2N5rsdBWG8hA"
    ).as("getOnlineEvents");
    cy.visit("/online-event");
    cy.wait("@getOnlineEvents").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(".calendar-body > .day-name").should("have.length", 7);
    cy.get(".calendar-body > .day").should("have.length", 42);
    cy.get(".calendar-body > .day").each(($day, index, $days) => {
      // cy.get($col).should("exist");
      // cy.log($col);
      cy.wrap($day).within(() => {
        cy.get(".day").should("be.visible");
      });
    });
  });
});
