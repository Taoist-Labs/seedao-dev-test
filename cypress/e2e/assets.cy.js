/// <reference types="Cypress" />

describe("assets page", () => {
  beforeEach(() => {
    cy.visit("/assets");
  });
  it("assets section wallet value fetch and fiatTotal should be visible", () => {
    // https://test-api.seedao.tech/v1/public_data/safe_vault
    cy.contains("Total Assets").should("be.visible");
    cy.intercept(
      "GET",
      "https://test-api.seedao.tech/v1/public_data/safe_vault",
      {
        fixture: "safeVolt.json",
      }
    ).as("getSafeVoltData");
    cy.visit("/assets");
    cy.wait("@getSafeVoltData").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
  it("all safe_vault data should be visible", () => {
    cy.get(".title").should("be.visible");
    cy.get(".info-right > .balance").should("be.visible");
    cy.get(":nth-child(2) > .info-left > .balance > span").should("be.visible");
    cy.get(
      ":nth-child(1) > .info-left > .info > .address > .sc-jnOGJG > span"
    ).should("be.visible");
    cy.get(":nth-child(2) > .info-left > .balance > span").should("be.visible");
  });
  it("sent scr should be visible & get total supply", () => {
    cy.get(":nth-child(1) > .sc-hwdzOV > .sc-jaXxmE").should("be.visible");
    cy.intercept(
      "GET",
      "https://test-spp-indexer.seedao.tech/insight/erc721/total_supply/0x30093266E34a816a53e302bE3e59a93B52792FD4",
      { totalSupply: "561" }
    ).as("getSendSeed");
    cy.visit("/assets");
    cy.wait("@getSendSeed").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
  it("get treasure current data, should display s5 used USD & s5 sent scr", () => {
    cy.get(":nth-child(3) > .num").should("be.visible");
    cy.get(":nth-child(4) > .num").should("be.visible");
    cy.intercept("GET", "https://test-api.seedao.tech/v1/treasury/current", {
      fixture: "treasureCurrent.json",
    }).as("getTreasureCurrent");
    cy.visit("/assets");
    cy.wait("@getTreasureCurrent").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
  it.only("asset lists search and select item check", () => {
    cy.get(":nth-child(1) > .sc-ddjGPC > input")
      .type("0x2F297E9D4b7E2D762357BEfb9F34e19d10671A94")
      .type("{enter}");
    // cy.get(".react-select__control").click();
    cy.get("#react-select-3-placeholder").click();
    // intercept data using query
    cy.request(
      "GET",
      "https://test-api.seedao.tech/v1/applications/?page=1&size=10&sort_field=create_ts&sort_order=desc&type=new_reward&asset_name=SCR"
    );
  });
  it("assets season selection", () => {
    cy.intercept("GET", "https://test-api.seedao.tech/v1/seasons/", {
      fixture: "season.json",
    }).as("getSeason");
    cy.visit("/assets");
    cy.wait("@getSeason").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.get(
      ".sc-klVQfs > .table-responsive > .table > tbody > tr > :nth-child(3)"
    ).click();

    cy.request(
      "GET",
      "https://test-api.seedao.tech/v1/applications/?page=1&size=10&sort_field=create_ts&sort_order=desc&type=new_reward&season_id=2"
    );
  });
  it("sns right side input and state", () => {
    // sns serach input
    cy.get(":nth-child(6) > .sc-ddjGPC").type(
      "0x2F297E9D4b7E2D762357BEfb9F34e19d10671A94"
    );
    // state dropdown
    cy.get(
      ".sc-klVQfs > .table-responsive > .table > tbody > tr > :nth-child(7)"
    ).click();

    // export btn
    cy.get(".sc-gmPhUn").click();
  });
  it("check every asset list should be visible", () => {
    cy.get(".sc-klVQfs  > .table-responsive > .table > tbody > tr").each(
      ($col, index, $cols) => {
        // cy.get($col).should("exist");
        // cy.log($col);
        cy.wrap($col).within(() => {
          cy.get("td").should("be.visible");
        });
      }
    );
  });
  it("asset list table", () => {
    cy.get(".sc-bypJrT > .table-responsive > .table > tbody > tr").each(
      ($row, index, $rows) => {
        cy.wrap($row).within(() => {
          cy.get("td").each(($col, index, $cols) => {
            // cy.log($col);
            cy.get($col).should("be.visible");
          });
        });
      }
    );
    cy.get(":nth-child(1) > :nth-child(8) > .sc-fxwrCY").click();
  });
  // pagination test
  it("asset list table pagination test", () => {
    // for (let p = 1; p <= totalPages; p++) {
    //   if (totalPages > 1) {
    //     cy.log("Active page is " + p);
    //     // cy.get('.active > .page-link')
    //     // cy.get("ul[class='pagination']>li:nth-child(5)");
    //     cy.get(":nth-child(" + p + ") > .page-link");
    //   }
    // }
    cy.get(".sc-eBMEME > .pagination > .page-item").should("be.visible");
    cy.get(".sc-eBMEME > .pagination > .page-item:nth-child(3)").click();
    cy.wait(3000);
    cy.get(".sc-eBMEME > .pagination > .page-item:nth-child(4)").click();
  });

  // Ranking page test
  it("ranking scr section", () => {
    cy.get(".sc-iHbSHJ > :nth-child(3)").click();
    cy.intercept("GET", "https://test-api.seedao.tech/v1/data_srv/aggr_scr", {
      fixture: "scrRank.json",
    }).as("getScrRankData");
    cy.visit("/ranking");
    cy.wait("@getScrRankData").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
  it("scr table row and column should be visible", () => {
    cy.get(".sc-iHbSHJ > :nth-child(3)").click();
    cy.get("#body-table >tbody > tr").each(($row, index, $rows) => {
      if (index < 10) {
        cy.wrap($row).within(() => {
          cy.get("td").each(($col, index, $cols) => {
            cy.log($col.text());
            // cy.get($col).should("be.visible");
          });
        });
      }
    });
  });
});
