describe("Home", () => {
  const BASE_API_URL = "https://contact.herokuapp.com/contact";
  const firstName= (Math.random() + 1)
    .toString(36)
    .substring(2)
    .replace(/[0-9]/g, "");

  it("should navigate to the home page", () => {
    cy.visit("http://localhost:3000/");

    cy.get("h6").contains("Contacts");
    cy.intercept("GET", BASE_API_URL).as("getContact");
    cy.wait("@getContact").its("response.statusCode").should("eq", 200);

    // test add contact
    cy.wait(3000);
    cy.get('button[id="add-button"]').click();
    cy.get("h3").contains("Add Contact");
    cy.wait(3000);
    cy.get("input[name=firstName]").type(`${firstName}`);
    cy.get("input[name=lastName]").type("Budi");
    cy.get("input[name=age]").type(25);
    cy.get("input[name=photo]").type(
      "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
    );
    cy.intercept("POST", BASE_API_URL).as(
      "addContact"
    );
    cy.get('button[id="submit-button"]').click();
    cy.wait("@addContact").its("response.statusCode").should("eq", 201);

    // test update contact
    cy.wait(3000);
    cy.get(`button[id^='edit-button-${firstName}']`).click();
    cy.get("h3").contains("Edit Contact");
    cy.wait(3000);
    cy.get("input[name=firstName]").type("Edit");
    cy.get("input[name=lastName]").type("Edit");
    cy.intercept("GET", BASE_API_URL).as("updateContact");
    cy.get('button[id="submit-button"]').click();
    cy.wait("@updateContact").its("response.statusCode").should("eq", 200);

    // test delete contact
    cy.wait(3000);
    cy.get(`button[id^='delete-button-${firstName}']`).click();
    cy.intercept("DELETE", BASE_API_URL).as("deleteContact");
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Are you sure you want to delete the data?");
        return true;
    });
    cy.wait("@deleteContact").its("response.statusCode").should("eq", 201);
  });
});
