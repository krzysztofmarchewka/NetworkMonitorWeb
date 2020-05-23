describe("DNS loading Test", () => {
  it("Successfully loads", () => {
    cy.viewport(1500, 900);
    cy.visit("/reversedns");
  });

  it("Check if DNS data is loaded", () => {
    cy.server();
    cy.route("GET", "api/dns");
    cy.get(".table");
    cy.get("th").contains("#");
    cy.get("th").contains("IP");
    cy.get("th").contains("Name");
    cy.get("tbody>tr").eq(0);
    cy.get("th").should("contain", "0");
  });

  it("Check input and output", () => {
    cy.viewport(1500, 900);
    cy.visit("/reversedns");
    cy.get(".ip").contains("Type or copy IP address here");
    cy.wait(100);
    cy.get(".btn-danger").contains("Reverse ->");
    cy.wait(100);
    cy.get(".dns").contains("DNS");
  });

  it("Tests if existing DNS works", () => {
    cy.get(".ip-input").type("172.217.23.102");
    cy.get(".btn-danger").click();
    cy.wait(200);
    cy.get(".dns-input")
      .invoke("val")
      .then(() => {
        const firstDNS = "mil04s23-in-f102.1e100.net";
        cy.get(".dns-input").should("have.value",firstDNS)
        cy.log(firstDNS);
      });
    cy.get(".ip-input").clear();
    cy.get(".ip-input").type("172.217.16.168");
    cy.get(".btn-danger").click();
    cy.wait(200);
    cy.get(".dns-input")
      .invoke("val")
      .then(() => {
        const secondDNS = "fra15s11-in-f8.1e100.net";
        cy.get(".dns-input").should("have.value", secondDNS)
        cy.log(secondDNS);
      });
  });
  it("Tests proper error with not exisitng IP address", () => {
    cy.get(".ip-input").clear();
    cy.get(".ip-input").type("100.200.300.4");
    cy.get(".btn-danger").click();
    cy.wait(200);
    cy.get(".dns-input")
      .invoke("val")
      .then(() => {
        const error = "DNS not found";
        cy.get(".dns-input").should("have.value", error)
        cy.log(error);
      });
  });
});
