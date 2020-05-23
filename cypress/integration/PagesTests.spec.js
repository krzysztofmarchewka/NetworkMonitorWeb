describe('PagesTests', () => {

  it('Check tabs', () => {
    cy.viewport(1500, 900)
    cy.visit('/home');
    cy.get('.header-title').contains('Network Scan Monitor')
    cy.wait(100)
    cy.visit('/monitor');
    cy.get('.header-title').contains('Dashboard')
    cy.wait(100)
    cy.visit('/reversedns');
    cy.get('.header-title').contains('Check IP address')
  });



});
