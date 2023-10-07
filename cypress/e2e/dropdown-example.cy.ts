describe("Validation of Dropdown Options example", () => {
  beforeEach(() => {
    cy.visit("/sort-by");
  });

  it("Should validate each option and value in the 'Sort by' select", () => {
    const expectedOptions = [
      { text: "Recently published", value: "published" },
      { text: "Recently updated", value: "updated" },
      { text: "Most views", value: "views" },
      { text: "Most comments", value: "comments" },
    ];

    cy.get("#sort")
      .find("option")
      .should("have.length", expectedOptions.length)
      .each(($option, index) => {
        expect($option.text().trim()).to.equal(expectedOptions[index].text);
        expect($option.val()).to.equal(expectedOptions[index].value);
      });
  });

  it('Should select "Most views" and submit the form', () => {
    cy.get("#sort").select("Most views");

    cy.get('button[data-module="govuk-button"]').click();

    cy.url().should("match", /\/check-your-answers$/);

    cy.contains(".govuk-summary-list__value", "views").should("exist");
  });

  it("Should allow multiple selections from the 'Sort by' select", () => {
    cy.get("#sort").select("Most views");
    cy.get('button[data-module="govuk-button"]').click();

    cy.contains(".govuk-link", "Add").click();

    const expectedOptions = [
      { text: "Recently published", value: "published" },
      { text: "Recently updated", value: "updated" },
      { text: "Most comments", value: "comments" },
    ];

    cy.get("#sort")
      .find("option")
      .should("have.length", expectedOptions.length)
      .each(($option, index) => {
        expect($option.text().trim()).to.equal(expectedOptions[index].text);
        expect($option.val()).to.equal(expectedOptions[index].value);
      });

    const expectedMissingOptions = [{ text: "Most views", value: "views" }].map(
      ({ value }) => value,
    );

    cy.get("#sort")
      .find("option")
      .each(($option) => {
        expect($option.val()).not.to.be.oneOf(expectedMissingOptions);
      });

    cy.get("#sort").select("Most comments");

    cy.get('button[data-module="govuk-button"]').click();

    cy.contains(".govuk-summary-list__value", "views").should("exist");
    cy.contains(".govuk-summary-list__value", "comments").should("exist");
  });
});
