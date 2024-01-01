/// <reference types="Cypress" />

describe("assets page", () => {
  beforeEach(() => {
    cy.visit("/proposal");
  });
  it("should render all proposal", () => {
    // all category
    cy.intercept("GET", "https://forum.seedao.xyz/api/custom/group/info", {
      fixture: "proposal.json",
    }).as("getProposal");
    cy.visit("/proposal");
    cy.wait("@getProposal").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
  it("redirect proposal category details page and get data by category id", () => {
    cy.get(":nth-child(1) > .sc-eulNck").click();
    // get proposal by category
    cy.intercept(
      "GET",
      "https://forum.seedao.xyz/api/thread/list?filter=category&tag_id=0&group_name=seedao&page=1&per_page=10&category_index_id=62&sort=new",
      {
        fixture: "proposalByCategory.json",
      }
    ).as("getProposalByCategory");
    cy.visit("/proposal/category/62");
    cy.wait("@getProposalByCategory").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    // check the category is render
    cy.get(".sc-knuQbY > .sc-hHOBiw")
      .should("be.visible")
      .each(($proposal, index) => {
        cy.wrap($proposal).within(() => {
          // cy.log($proposal);
          cy.get($proposal).should("be.visible");
        });
      });

    // get proposal details
    cy.get(".sc-knuQbY > :nth-child(1)").click();
    cy.wait(3000);
    // https://forum.seedao.xyz/api/get_thread/39887?group_name=seedao
    cy.intercept(
      "GET",
      "https://forum.seedao.xyz/api/get_thread/39887?group_name=seedao",
      {
        fixture: "proposalDetails.json",
      }
    ).as("getProposalDetails");
    cy.visit("/proposal/thread/39887");
    cy.wait("@getProposalDetails").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(".sc-fsvrbR").should(
      "have.text",
      "SIP-9: 过渡期决策小组工作交接提议"
    );
    cy.get(".sc-kFWlue").should("be.visible");
    cy.get(".sc-kFWlue").should("be.visible");
    cy.get(".sc-kFWlue").should("be.visible");
    cy.get(".sc-kFWlue").should("be.visible");
    // vote section
    cy.get(".sc-kFWlue").should("be.visible");
    // export btn
    // cy.get('.sc-kMribo').click()
    // proposal votes
    cy.get(".sc-SrznA > :nth-child(1)").should("have.text", "Total Votes: 6");
    cy.get(":nth-child(2) > .sc-eoVZPG > .sc-lizKOf > .inner").should(
      "be.visible"
    );
    cy.get(":nth-child(2) > .sc-eoVZPG").should("be.visible");
    cy.get(".sc-fThUAz > :nth-child(1)").should("be.visible");
    cy.get(".sc-fThUAz > :nth-child(1)").should("be.visible");
    // back to category list
    cy.wait(3000);
    cy.get(":nth-child(2) > a > .sc-iapWAC").click();
  });
  it.only("sorting latest proposal", () => {
    // latest proposal
    cy.intercept(
      "GET",
      "https://forum.seedao.xyz/api/thread/list?filter=all&category_index_id=0&tag_id=0&sort=latest&group_name=seedao&page=2&per_page=10&sort=latest",
      {
        fixture: "latestProposal.json",
      }
    );
    cy.get(".sc-ktPPKK > :nth-child(2)").click();

    cy.get(".sc-eBHhsj > .sc-hHOBiw")
      .should("be.visible")
      .each(($proposal, index) => {
        cy.wrap($proposal).within(() => {
          // cy.log($proposal);
          cy.get($proposal).should("be.visible");
        });
      });

    // check all the latest category list
    cy.get(".sc-eBHhsj > .sc-hHOBiw").should("exist");

    // latest category details
    cy.intercept(
      "GET",
      "https://forum.seedao.xyz/api/get_thread/47814?group_name=seedao",
      {
        fixture: "latestProposalDetails.json",
      }
    );
    cy.get(".sc-eBHhsj > :nth-child(1)").should("be.visible").click();

    cy.get(".sc-fsvrbR").should("be.visible");
    cy.get(":nth-child(2) > a > .sc-iapWAC").should("be.visible").click();
    // cy.wait(3000);

    // test oldest category list
    // oldest proposal
    cy.intercept(
      "GET",
      "https://forum.seedao.xyz/api/thread/list?filter=all&category_index_id=0&tag_id=0&sort=latest&group_name=seedao&page=1&per_page=10&sort=old",
      {
        fixture: "oldestProposal.json",
      }
    );
    cy.get(".sc-bVHCgj > :nth-child(2)").click();
    // oldest proposal details

    cy.intercept(
      "GET",
      "https://forum.seedao.xyz/api/get_thread/37469?group_name=seedao",
      {
        fixture: "latestProposalDetails.json",
      }
    );

    cy.get(".sc-knuQbY > :nth-child(1)").click();
  });
});
