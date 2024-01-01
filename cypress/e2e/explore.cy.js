/// <reference types="Cypress" />

describe("assets page", () => {
  beforeEach(() => {
    cy.visit("/explore");
  });
  it("get all projects and project data should be visible", () => {
    cy.get(".selected").should("have.text", "Projects");
    cy.get(".sc-ktPPKK > :nth-child(2)").should("be.visible");
    // get all projects
    cy.intercept(
      "GET",
      "https://test-api.seedao.tech/v1/projects/?show_special=false&status=open,pending_close&page=1&size=20&sort_order=desc&sort_field=create_ts",
      {
        fixture: "exploreProjects.json",
      }
    ).as("getExploreProjects");
    cy.visit("/explore");
    cy.wait("@getExploreProjects").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
  it("project data should be visible", () => {
    cy.get(".sc-stxIr > .sc-futREh > .sc-flBipw").each(
      ($project, index, $projects) => {
        cy.wrap($project).within(() => {
          cy.log($project);
        });
      }
    );
  });
  it("project info details", () => {
    cy.get(":nth-child(19) > .sc-fWOSwS").click();
    cy.wait(3000);
    // project details
    cy.intercept("GET", "https://test-api.seedao.tech/v1/projects/16", {
      fixture: "projectInfo.json",
    }).as("getProjectInfo");

    cy.visit("/project/info/16");
    cy.wait("@getProjectInfo").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(".sc-inyXkq").should("have.text", "TestProject");
    cy.get(".desc").should("be.visible");
    cy.get(".sc-kuVLHQ").should("be.visible");
    cy.get(".sc-gdfaqJ").should("be.visible");
    cy.get("p").should("be.visible");
    cy.get(".sc-ciQpPG > :nth-child(1) > :nth-child(3)")
      .should("be.visible")
      .click();
    // get user details
    cy.intercept(
      "GET",
      "https://test-api.seedao.tech/v1/user/users?wallets=0x183f09c3ce99c02118c570e03808476b22d63191&wallets=0xd85c413da833cebd8338138ccefa04979df70e8e&wallets=0xee3d9defdd97560c56402b3467869f293bfa35dc&wallets=0x8fe174b2fe54d2689382cfef5500552ffb5c3805&wallets=0x4564d5a8bb409272f1fb4ae4c8b45fc0eafd709d",
      {
        fixture: "userDetails.json",
      }
    ).as("getUserDetails");
    // cy.visit("/project/info/16");
    // cy.wait("@getUserDetails").then((interception) => {
    //   expect(interception.response.statusCode).to.equal(200);
    // });
    cy.get(".sc-edKZPI > .sc-bhqpjJ > .sc-iLLODe > .sc-fPrdXf > img").should(
      "be.visible"
    );
    cy.get(".userName").should("be.visible");
    cy.get(".btn-close-modal").should("be.visible").click();
  });
  it("get guild data, data should be visible", () => {
    // get guild data
    cy.intercept(
      "GET",
      "https://test-api.seedao.tech/v1/guilds/?page=1&size=20&sort_order=desc&sort_field=create_ts",
      {
        fixture: "guilds.json",
      }
    ).as("getGuildData");

    cy.visit("/explore");
    cy.get(".sc-ktPPKK > :nth-child(2)").should("be.visible").click();
    cy.wait("@getGuildData").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    // test all guilds should be visible
    cy.get(".sc-hpEguC > .sc-tNXst > .sc-flBipw").each(
      ($guild, index, $guilds) => {
        cy.wrap($guild).within(() => {
          cy.log($guild);
        });
      }
    );
  });
  //
  // click any guilds and details
  it.only("click any guilds and get details", () => {
    cy.get(".sc-ktPPKK > :nth-child(2)").should("be.visible").click();
    cy.get(":nth-child(15) > .sc-fWOSwS").click();
    // guild details
    cy.intercept("GET", "https://test-api.seedao.tech/v1/guilds/22", {
      fixture: "guildInfo.json",
    }).as("getGuildInfo");

    cy.visit("/guild/info/22");
    cy.wait("@getGuildInfo").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.intercept(
      "GET",
      "https://test-api.seedao.tech/v1/user/users?wallets=0xd85c413da833cebd8338138ccefa04979df70e8e&wallets=0x183f09c3ce99c02118c570e03808476b22d63191",
      {
        fixture: "guildUserInfo.json",
      }
    ).as("getGuildUserInfo");

    cy.visit("/guild/info/22");
    cy.wait("@getGuildUserInfo").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.get(".sc-dUOoGL > img").should("be.visible");
    cy.get(".sc-xwuxA").should("be.visible");
    cy.get(".desc").should("be.visible");
    cy.get(".desc").should("be.visible");
    // open member details popup
    cy.get(":nth-child(2) > .sc-iaJaUu").should("be.visible").click();
    cy.get(".sc-fPrdXf > img").should("be.visible");
    cy.get(".userName").should("have.text", "Wendy");
    cy.get(".sc-fPrdXf > img").should("be.visible");
    cy.get(".sc-boZgaH > :nth-child(1)").should("be.visible");
    cy.get(".btn-close-modal").click();
    cy.get(".sc-dkmUuB").click();
  });
});
