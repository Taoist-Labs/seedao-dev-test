/// <reference types="Cypress" />

describe("city hall member page", () => {
  beforeEach(() => {
    cy.visit("/newcomer");
  });
  it("get new comer details data", () => {
    cy.intercept(
      "GET",
      "https://deschool.app/goapiProduction/series/62f0adc68b90ee1aa913a965/detail",
      {
        fixture: "newComerDetails.json",
      }
    ).as("getNewComerDetails");
    cy.visit("/newcomer");
    cy.wait("@getNewComerDetails").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      const responseData = interception.response.body;
      cy.log(JSON.stringify(responseData));
    });
    cy.get(".sc-lkuliq > div").should("be.visible");
    cy.get(".bg-grey > .flex").should("be.visible").click();
  });
  it("all courses should be visible", () => {
    cy.get(".p-14px > .flex").each(($course, index) => {
      cy.wrap($course).within(() => {
        // cy.log($course);
        cy.get($course).should("be.visible");
      });
    });
  });
  it.only("content video should be visible", () => {
    cy.intercept(
      "GET",
      "https://deschool.app/goapiProduction/courses/62f0adc68b90ee1aa913a966/section/63a46ae99ce6e09dd4811471",
      {
        fixture: "courseVideo.json",
      }
    ).as("getCourseVideo");
    cy.visit("/newcomer");
    cy.wait("@getCourseVideo").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get("video").should("be.visible");
  });
});
