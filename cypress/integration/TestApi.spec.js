describe("Test Api connection", () => {
  it("Check requests from api", () => {
    cy.viewport(1500, 900);
    cy.visit("/monitor");
    cy.server();
    cy.route("POST", "api/dns");
    cy.route("POST", "/api/dns/check");
    cy.route("GET", "api/dns");
    cy.route("GET", "/api/scans");
    cy.route("GET", "/api/scans/summary");
    cy.request("https://localhost:44369/api/dns").then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    });
    cy.request("https://localhost:44369/api/scans").then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    });
    cy.request("https://localhost:44369/api/scans/summary").then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    });
  });
});
