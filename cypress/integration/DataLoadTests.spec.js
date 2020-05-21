describe('DataLoadTest', () => {

  it('Check number values', () => {
    cy.viewport(1500, 900)
    cy.visit('/monitor');
    cy.wait(2000)
    cy.get('#bytes').should('not.to.be.empty')
    cy.get('#packets').should('not.to.be.empty')
    cy.get('#addresses').should('not.to.be.empty')
  });

  it('Check filters', () => {
    cy.viewport(1500, 900)
    cy.visit('/monitor');
    cy.wait(2000)
    cy.get('#sourceIpDropdown').click()
    cy.get('#sourceIpDropdown').should('not.to.be.empty')
    cy.get('#destinationIpDropdown').click()
    cy.get('#destinationIpDropdown').should('not.to.be.empty')
  });

  it('Check charts', () => {
    cy.viewport(1500, 900)
    cy.visit('/monitor');
    cy.wait(2000)
    cy.contains('Data flow analysis')
  });

});
