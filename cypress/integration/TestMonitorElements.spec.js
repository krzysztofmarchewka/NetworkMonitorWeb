sourceIpFilter =
  "#sourceIpDropdown > div > div.ui-dropdown-trigger.ui-state-default.ui-corner-right.ng-tns-c52-4 > span";
srcChoice =
  "#sourceIpDropdown > div > div.ng-trigger.ng-trigger-overlayAnimation.ng-tns-c52-4.ui-dropdown-panel.ui-widget.ui-widget-content.ui-corner-all.ui-shadow.ng-star-inserted > div.ui-dropdown-items-wrapper.ng-tns-c52-4 > ul > p-dropdownitem:nth-child(2) > li > span";
dstIpFilter =
  "#destinationIpDropdown > div > div.ui-dropdown-trigger.ui-state-default.ui-corner-right.ng-tns-c52-5 > span";
dstChoice =
  "#destinationIpDropdown > div > div.ng-trigger.ng-trigger-overlayAnimation.ng-tns-c52-5.ui-dropdown-panel.ui-widget.ui-widget-content.ui-corner-all.ui-shadow.ng-star-inserted > div.ui-dropdown-items-wrapper.ng-tns-c52-5 > ul > p-dropdownitem:nth-child(10) > li > span";
srcCalendar =
  "body > app-root > app-monitor > div > div.d-flex.flex-row.justify-content-center.ng-star-inserted > div:nth-child(3) > p-calendar > span";
startDate =
  "body > app-root > app-monitor > div > div.d-flex.flex-row.justify-content-center.ng-star-inserted > div:nth-child(3) > p-calendar > span > div > div.ui-datepicker-group.ui-widget-content.ng-tns-c73-6.ng-star-inserted > div.ui-datepicker-calendar-container.ng-tns-c73-6.ng-star-inserted > table > tbody > tr:nth-child(1) > td:nth-child(4) > a";
finishDate =
  "body > app-root > app-monitor > div > div.d-flex.flex-row.justify-content-center.ng-star-inserted > div:nth-child(4) > p-calendar > span > div > div.ui-datepicker-group.ui-widget-content.ng-tns-c73-7.ng-star-inserted > div.ui-datepicker-calendar-container.ng-tns-c73-7.ng-star-inserted > table > tbody > tr:nth-child(4) > td.ng-tns-c73-7.ui-datepicker-current-day.ng-star-inserted > a";
dstCalendar =
  "body > app-root > app-monitor > div > div.d-flex.flex-row.justify-content-center.ng-star-inserted > div:nth-child(4) > p-calendar > span";
arrow =
  "body > app-root > app-monitor > div > div.d-flex.flex-row.justify-content-center.ng-star-inserted > div:nth-child(3) > p-calendar > span > div > div.ui-datepicker-group.ui-widget-content.ng-tns-c73-6.ng-star-inserted > div.ui-datepicker-header.ui-widget-header.ui-helper-clearfix.ui-corner-all.ng-tns-c73-6 > a.ui-datepicker-prev.ui-corner-all.ng-tns-c73-6.ng-star-inserted > span";
dropdownButton = '#sourceIpDropdown > div > div.ui-dropdown-trigger.ui-state-default.ui-corner-right.ng-tns-c52-0 > span'
bar = '#sourceIpDropdown > div > div.ng-trigger.ng-trigger-overlayAnimation.ng-tns-c52-0.ui-dropdown-panel.ui-widget.ui-widget-content.ui-corner-all.ui-shadow.ng-star-inserted > div > ul > p-dropdownitem:nth-child(1) > li'
donut = '#sourceIpDropdown > div > div.ng-trigger.ng-trigger-overlayAnimation.ng-tns-c52-0.ui-dropdown-panel.ui-widget.ui-widget-content.ui-corner-all.ui-shadow.ng-star-inserted > div > ul > p-dropdownitem:nth-child(2) > li'
polarArea = '#sourceIpDropdown > div > div.ng-trigger.ng-trigger-overlayAnimation.ng-tns-c52-0.ui-dropdown-panel.ui-widget.ui-widget-content.ui-corner-all.ui-shadow.ng-star-inserted > div > ul > p-dropdownitem:nth-child(3) > li'
pie = '#sourceIpDropdown > div > div.ng-trigger.ng-trigger-overlayAnimation.ng-tns-c52-0.ui-dropdown-panel.ui-widget.ui-widget-content.ui-corner-all.ui-shadow.ng-star-inserted > div > ul > p-dropdownitem:nth-child(4) > li'
radar = '#sourceIpDropdown > div > div.ng-trigger.ng-trigger-overlayAnimation.ng-tns-c52-0.ui-dropdown-panel.ui-widget.ui-widget-content.ui-corner-all.ui-shadow.ng-star-inserted > div > ul > p-dropdownitem:nth-child(5) > li'
describe("Test Monitor Elements", () => {
    it("Checks charts", () => {
        cy.viewport(1500, 900);
        cy.visit("/monitor");
        cy.get(dropdownButton).click();
        cy.get(pie).click();
        cy.wait(100)
        cy.get(dropdownButton).click();
        cy.wait(100)
        cy.get(donut).click();
        cy.wait(100)
        cy.get(dropdownButton).click();
        cy.wait(100)
        cy.get(polarArea).click();
        cy.wait(100)
        cy.get(dropdownButton).click();
        cy.wait(100)
        cy.get(radar).click();
      });
  it("Checks filter in charts", () => {

    cy.get(sourceIpFilter).click();
    cy.get(srcChoice).click();
    cy.get(dstIpFilter).click();
    cy.get(dstChoice).click();
    cy.get(srcCalendar).click();
    cy.get(arrow).click();
    cy.get(startDate).click();
    cy.get(dstCalendar).click();
    cy.get(finishDate).click();
    cy.get(".btn-info").click();
  });
  it("Checks filter in list of servers", () => {
    ip = "54.171.46.32";
    dns = "ec2-54-171-46-32.eu-west-1.compute.amazonaws.com";
    ip2 = "54.201.223.179";
    dns2 = "ec2-54-201-223-179.us-west-2.compute.amazonaws.com";

    cy.get("#ipInput").type(ip);
    cy.wait(200);
    cy.get("td:nth-child(1)").should("contain", ip);
    cy.get("td:nth-child(2)").should("contain", dns);
    cy.get("#ipInput").clear();
    cy.get("#dnsInput").clear();

    cy.get("#dnsInput").type(dns2);
    cy.get("td:nth-child(2)").should("contain", dns2);
    cy.wait(200);
    cy.get("td:nth-child(1)").should("contain", ip2);
    cy.get("#dnsInput").clear();
  });

  it("Checks pagination", () => {
    if (cy.get(".ui-dropdown-label") === 10) {
      cy.get("td").should("have.value", 10);
    }

    if (cy.get(".ui-dropdown-label") === 25) {
      cy.get("td").should("have.value", 25);
    }

    if (cy.get(".ui-dropdown-label") === 50) {
      cy.get("td").should("have.value", 50);
    }
  });
});
