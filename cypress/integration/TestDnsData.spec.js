describe("DNS loading Test", () => {
  it("Successfully loads", () => {
    cy.viewport(1500, 900);
    cy.visit("/reversedns");
  });

  it("Check if DNS data is loaded", () => {
    cy.server();
    cy.route("GET", "api/dns");
    cy.get("p-table");
    cy.get("th").contains("IP");
    cy.get("th").contains("Name");
    cy.get("#dns > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)").contains("172.217.23.102")
    cy.get("#dns > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").contains("fra16s45-in-f6.1e100.net")
  });

  ipInput = 'body > app-root > app-reversedns > div > div.d-flex.justify-content-center > span:nth-child(1) > input'
  dnsInput = 'body > app-root > app-reversedns > div > div.d-flex.justify-content-center > span:nth-child(3) > input'

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
    cy.get(ipInput).type("172.217.23.102");
    cy.get(".btn-danger").click();
    cy.wait(200);
    cy.get(dnsInput)
      .invoke("val")
      .then(() => {
        const firstDNS = "mil04s23-in-f102.1e100.net";
        cy.get(dnsInput).should("have.value",firstDNS)
        cy.log(firstDNS);
      });
    cy.get(ipInput).clear();
    cy.get(ipInput).type("172.217.16.168");
    cy.get(".btn-danger").click();
    cy.wait(200);
    cy.get(dnsInput)
      .invoke("val")
      .then(() => {
        const secondDNS = "fra15s11-in-f168.1e100.net";
        cy.get(dnsInput).should("have.value", secondDNS)
        cy.log(secondDNS);
      });
  });
  it("Tests proper error with not exisitng IP address", () => {
    cy.get(ipInput).clear();
    cy.get(ipInput).type("100.200.300.4");
    cy.get(".btn-danger").click();
    cy.wait(200);
    cy.get(dnsInput)
      .invoke("val")
      .then(() => {
        const error = "DNS not found";
        cy.get(dnsInput).should("have.value", error)
        cy.log(error);
      });
  });
});
