export function loginPublicUser(){
    cy.get("input[name='email']").type("CypressTest@email.com").should("have.value",
        "CypressTest@email.com")
    cy.get("input[name='password']").type("CypressTestPassword").should("have.value",
        "CypressTestPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('include', "/DashboardHome/editUser")
}

export function viewProfilePublicUser() {
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
}

export function loginRenter() {
    cy.get("input[name='email']").type("CypressRenter@email.com")
        .should("have.value", "CypressRenter@email.com")
    cy.get("input[name='password']").type("CypressRenterPassword")
        .should("have.value","CypressRenterPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('include', "/DashBoardHome")
}

export function viewProfileRenter() {
    cy.get(".dashboard__home").get(".patty__button").click()
    cy.get(".dashboard__home").get(".sidedrawer__open").get(".drawer__buttons")
        .get(".edit__profile").contains("button", "Edit Profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUser")
}

export function loginCompany() {
    cy.get("input[name='email']").type("CypressCompany@email.com")
        .should("have.value", "CypressCompany@email.com")
    cy.get("input[name='password']").type("CypressCompanyPassword")
        .should("have.value","CypressCompanyPassword")
    cy.get(".continue__button").click()
    cy.location("pathname").should('eq', "/DashboardHomeCMC")
}

export function viewProfileCompany() {
    cy.get(".dashboard__home").get(".patty__button").click()
    cy.get(".dashboard__home").get(".sidedrawer__open").get(".drawer__buttons")
        .get(".edit__profile").contains("button", "Edit Profile").click()
    cy.location("pathname").should('eq', "/DashboardHome/editUserCMC")
}

export function resetProfileCompany() {
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get(".container").get("form")
        .get("input[name='name']").clear()
        .type("CypressCompanyName").should("have.value", "CypressCompanyName")
        .get("input[name='email']").clear()
        .type("CypressCompany@email.com").should("have.value", "CypressCompany@email.com")
    cy.get("#root").get(".container").get("form").contains("button","Done").click()
}

export function resetProfileRenter() {
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get(".container").get("form")
        .get("input[name='firstName']").clear()
        .type("CypressRenterF").should("have.value", "CypressRenterF")
        .get("input[name='lastName']").clear()
        .type("CypressRenterL").should("have.value", "CypressRenterL")
        .get("input[name='email']").clear()
        .type("CypressRenter@email.com").should("have.value", "CypressRenter@email.com")
    cy.get("#root").get(".container").get("form").contains("button","Done").click()

}

export function resetProfilePublicUser() {
    cy.get("#root").get(".row").contains("button","Update Info").click()
    cy.get("#root").get(".container").get("form")
        .get("input[name='firstName']").clear()
    cy.get("#root").get(".container").get("form")
        .get("input[name='firstName']").type("CypressFirst").should("have.value", "CypressFirst")
    cy.get("#root").get(".container").get("form")
        .get("input[name='lastName']").clear()
    cy.get("#root").get(".container").get("form")
        .get("input[name='lastName']").type("CypressLast").should("have.value", "CypressLast")
    cy.get("#root").get(".container").get("form")
        .get("input[name='email']").clear()
    cy.get("#root").get(".container").get("form")
        .get("input[name='email']").type("Cypress@email.com").should("have.value", "Cypress@email.com")
    cy.get("#root").get(".container").get("form").contains("button","Done").click()

}
